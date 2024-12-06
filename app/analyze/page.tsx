'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from 'lucide-react'
import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)
    setError(null)
    setResults(null)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze file')
      }

      console.log('Received data:', data)
      setResults(data)
    } catch (error) {
      console.error('Error analyzing file:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while analyzing the file. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">PCAP Analyzer</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <Moon className="h-4 w-4" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PCAP File</CardTitle>
          <CardDescription>Select a PCAP file to analyze network traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pcap">PCAP File</Label>
            <Input id="pcap" type="file" accept=".pcap,.pcapng" onChange={handleFileChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={!file || analyzing}>
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Card>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Overview of the analyzed network traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="protocols">Protocols</TabsTrigger>
                <TabsTrigger value="sources">Top Sources</TabsTrigger>
                <TabsTrigger value="errorFlags">Error Flags</TabsTrigger>
                <TabsTrigger value="packetLoss">Packet Loss</TabsTrigger>
                <TabsTrigger value="geoMap">Geo Map</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p>Total Packets: {results.packetCount}</p>
              </TabsContent>
              <TabsContent value="protocols">
                {results.protocols && results.protocols.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.protocols}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p>No protocol data available</p>
                )}
              </TabsContent>
              <TabsContent value="sources">
                {results.topSources && results.topSources.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.topSources}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p>No top sources data available</p>
                )}
              </TabsContent>
              <TabsContent value="errorFlags">
                <h3 className="text-lg font-semibold mb-2">TCP Flags</h3>
                <ul>
                  <li>SYN: {results.errorFlags.SYN}</li>
                  <li>FIN: {results.errorFlags.FIN}</li>
                  <li>RST: {results.errorFlags.RST}</li>
                </ul>
              </TabsContent>
              <TabsContent value="packetLoss">
                <h3 className="text-lg font-semibold mb-2">Packet Loss Analysis</h3>
                <p>Total Packets: {results.packetCount}</p>
                <p>Retransmissions: {results.retransmissions || 'N/A'}</p>
                <p>Estimated Packet Loss: {results.packetLoss || 'N/A'}%</p>
              </TabsContent>
              <TabsContent value="geoMap">
                <div className="h-[400px] w-full">
                  {results.geoData && results.geoData.length > 0 ? (
                    <WorldMap geoData={results.geoData} />
                  ) : (
                    <p>No geolocation data available</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}