import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import * as maxmind from 'maxmind';

// Define interfaces for type safety
interface AnalysisResults {
  packetCount: number;
  protocols: { name: string; value: number }[];
  topSources: { name: string; value: number }[];
  errorFlags: { SYN: number; FIN: number; RST: number };
  geoData?: Array<{
    ip: string;
    lat: number;
    lon: number;
    city?: string;
    country?: string;
    value: number;
  }>;
}

// Correctly type the geolocation database reader
let geolite2: maxmind.Reader<maxmind.CityResponse> | null = null;

// Initialize the geolocation database
(async () => {
  try {
    const dbPath = path.resolve(process.cwd(), 'data', 'GeoLite2-City.mmdb');
    geolite2 = await maxmind.open<maxmind.CityResponse>(dbPath);
  } catch (error) {
    console.error('Failed to load GeoLite2 database:', error);
  }
})();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = generateTempFilePath();

    await fs.writeFile(tempFilePath, buffer);

    const tsharkOutput = await runTshark(tempFilePath);
    const results: AnalysisResults = parseTsharkOutput(tsharkOutput);

    if (results.topSources.length > 0) {
      results.geoData = await getGeolocationData(results.topSources);
    }

    await fs.unlink(tempFilePath);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }
}

function generateTempFilePath() {
  const tempDir = os.tmpdir();
  return path.join(tempDir, `upload-${Date.now()}-${Math.random().toString(36).substring(7)}.pcap`);
}

async function runTshark(filePath: string): Promise<string> {
  const tsharkPath = 'C:\\Program Files\\Wireshark\\tshark.exe';
  const tshark = spawn(tsharkPath, [
    '-r', filePath,
    '-q',
    '-z', 'conv,ip',
    '-z', 'io,phs',
    '-Y', 'ip.proto == 6',
  ]);

  let output = '';
  let errorOutput = '';

  tshark.stdout.on('data', (data) => (output += data));
  tshark.stderr.on('data', (data) => (errorOutput += data));

  const exitCode = await new Promise<number>((resolve) => {
    tshark.on('close', resolve);
  });

  if (exitCode !== 0) {
    console.error('Tshark error output:', errorOutput);
    throw new Error('Tshark processing failed');
  }

  return output;
}

function parseTsharkOutput(output: string): AnalysisResults {
  const lines = output.split('\n');
  const protocols: { name: string; value: number }[] = [];
  const topSources: { name: string; value: number }[] = [];
  const errorFlags = { SYN: 0, FIN: 0, RST: 0 };
  let packetCount = 0;

  let parsingProtocols = false;
  let parsingSources = false;

  for (const line of lines) {
    if (line.includes('Protocol Hierarchy Statistics')) {
      parsingProtocols = true;
      continue;
    }
    if (line.includes('IPv4 Conversations')) {
      parsingProtocols = false;
      parsingSources = true;
      continue;
    }

    if (parsingProtocols) {
      const match = line.match(/\s+([\w\d\-]+)\s+frames:(\d+)\s+bytes:(\d+)/);
      if (match) {
        protocols.push({ name: match[1], value: parseInt(match[2]) });
        packetCount += parseInt(match[2]);
      }
    }

    if (parsingSources) {
      const match = line.match(/(\d+\.\d+\.\d+\.\d+)\s+<->\s+\d+\.\d+\.\d+\.\d+\s+(\d+)/);
      if (match) {
        topSources.push({ name: match[1], value: parseInt(match[2]) });
      }

      const flagMatch = line.match(/Flags:\s*(\S+)/);
      if (flagMatch) {
        const flags = flagMatch[1];
        if (flags.includes('SYN')) errorFlags.SYN += 1;
        if (flags.includes('FIN')) errorFlags.FIN += 1;
        if (flags.includes('RST')) errorFlags.RST += 1;
      }
    }
  }

  topSources.sort((a, b) => b.value - a.value);
  topSources.splice(5);

  return { packetCount, protocols, topSources, errorFlags };
}

async function getGeolocationData(topSources: { name: string; value: number }[]) {
  if (!geolite2) {
    console.warn('Geolocation database is not available');
    return [];
  }

  return topSources
    .map((source) => {
      const lookup = geolite2!.get(source.name);
      if (lookup && lookup.location) {
        return {
          ip: source.name,
          lat: lookup.location.latitude,
          lon: lookup.location.longitude,
          city: lookup.city?.names.en,
          country: lookup.country?.names.en,
          value: source.value,
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{
      ip: string;
      lat: number;
      lon: number;
      city?: string;
      country?: string;
      value: number;
    }>;
}