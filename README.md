# SIEM Dashboard PCAP Analyzer

![Dashboard Demo](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDl1OXZnZmxzYzBwaG5raHJvMnN5anV0YnduaGM2Mm12bGxwZzdtaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f4V2mqvv0wT9m/giphy.gif)

This project is a Security Information and Event Management (SIEM) Dashboard that includes a PCAP file analyzer. It is built using Next.js and relies on `tshark`, the command-line version of Wireshark, to parse PCAP files for analysis.

---

## Features

- Upload and analyze `.pcap` files directly from a browser  
- Simple dashboard interface  
- Uses `tshark` for fast and reliable packet capture analysis  
- Built with Next.js for modern performance and scalability  

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)  
- `npm` (comes with Node.js)  
- `tshark` (command-line version of Wireshark)  

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/siem-dashboard.git
cd siem-dashboard
2. Install Dependencies
bash
Copy
Edit
npm install
3. Install tshark
Ubuntu/Debian
bash
Copy
Edit
sudo apt-get update
sudo apt-get install tshark
macOS (Homebrew)
bash
Copy
Edit
brew install wireshark
Windows
Download and install Wireshark from the official website.
Make sure tshark is added to your system’s PATH during installation.

Configuration
Create a next.config.js file in the root directory of your project with the following content:

js
Copy
Edit
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['child_process', 'fs', 'path', 'util'],
  },
}

module.exports = nextConfig
Make sure the app/api/analyze/route.ts file exists and contains your PCAP analysis logic using tshark.

Usage
Start the development server:

bash
Copy
Edit
npm run dev
Then open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
Use the file upload form to analyze .pcap files.
