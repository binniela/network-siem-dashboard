'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">PCAP Visualizer</span>
          </Link>
          <Link 
            href="/analyze" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/analyze" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Analyze
          </Link>
          <Link 
            href="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            )}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation