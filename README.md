# PCAP Analyzer

![Dashboard Demo](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDl1OXZnZmxzYzBwaG5raHJvMnN5anV0YnduaGM2Mm12bGxwZzdtaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f4V2mqvv0wT9m/giphy.gif)

This project is a PCAP file analyzer. It is built using Next.js and relies on `tshark`, the command-line version of Wireshark, to parse PCAP files for analysis.

---

## Features

- Upload and analyze `.pcap` files directly from a browser  
- Simple dashboard interface  
- Uses `tshark` for fast and reliable packet capture analysis  
- Built with Next.js for modern performance and scalability
- API geolocation integration to display IP addresses on an interactive map   

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
```
## Installation & Setup (Terminal Commands)


# Clone the repo
```bash
git clone https://github.com/yourusername/siem-dashboard.git
cd siem-dashboard
```
# Install dependencies
```bash
npm install
```
# Install tshark
```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install tshark
```
# For macOS
```bash
brew install wireshark
```
# For Windows
```bash
# Download Wireshark from: https://www.wireshark.org/download.html
# Ensure tshark is added to your system's PATH during install
```
# Start the development server
```bash
npm run dev
```
