import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, BarChart } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-8">Welcome to My PCAP Visualizer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Upload PCAP</CardTitle>
            <CardDescription>Analyze your network traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <Upload className="w-12 h-12 mx-auto text-primary" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/analyze">Upload PCAP</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Explore Dashboard</CardTitle>
            <CardDescription>View sample analysis and features</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className="w-12 h-12 mx-auto text-primary" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/analyze">Explore</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}