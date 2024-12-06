import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Globe } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>About the Creator</CardTitle>
          <CardDescription>Learn more about the person behind this PCAP Visualizer</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/1707367325428.jpg"
            alt="Creator's profile picture"
            width={200}
            height={200}
            className="rounded-full"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Vincent La</h2>
            <p className="text-muted-foreground">
              I&apos;m a passionate cybersecurity professional specializing in network security and SIEM systems. 
              With years of experience in the field, I&apos;ve developed this SIEM Dashboard to help 
              organizations better understand and analyze their network traffic.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="https://github.com/binniela" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://www.linkedin.com/in/vincent-la-a10003280/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://main.dhylww98kqg39.amplifyapp.com/" target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-4 w-4" /> Website
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}