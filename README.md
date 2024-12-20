# SIEM Dashboard PCAP Analyzer

This project is a SIEM (Security Information and Event Management) Dashboard that includes a PCAP file analyzer. It's built using Next.js and requires tshark for PCAP analysis.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- tshark (command-line version of Wireshark)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/siem-dashboard.git
   cd siem-dashboard
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Install tshark:
   - On Ubuntu or Debian:
     ```
     sudo apt-get update
     sudo apt-get install tshark
     ```
   - On macOS (using Homebrew):
     ```
     brew install wireshark
     ```
   - On Windows, download and install Wireshark from the official website.

## Configuration

1. Create a `next.config.js` file in the root directory with the following content:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     experimental: {
       serverComponentsExternalPackages: ['child_process', 'fs', 'path', 'util'],
     },
   }

   module.exports = nextConfig
   ```

2. Ensure that the `app/api/analyze/route.ts` file exists and contains the provided code for PCAP analysis.

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Use the file upload form to select and analyze PCAP files.

## Important Notes

- The current implementation has a file size limit of 10MB. You can adjust this in the `route.ts` file.
- Ensure that tshark is properly installed and accessible from the command line.
- This implementation is basic and may need additional security measures for production use.

## Troubleshooting

- If you encounter permission issues with tshark, ensure that the user running the Next.js server has the necessary permissions to execute tshark.
- For any "command not found" errors related to tshark, make sure it's properly installed and added to your system's PATH.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.#   n e t w o r k - s i e m - d a s h b o a r d  
 