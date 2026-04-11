# escape=`
# Use Windows Server Core base image
FROM mcr.microsoft.com/windows/servercore:ltsc2019

# Set working directory
WORKDIR /app

USER ContainerAdministrator
WORKDIR c:\build

# Download and extract Node.js
RUN curl.exe -sS -L -o node.zip https://nodejs.org/dist/v22.16.0/node-v22.16.0-win-x64.zip
RUN tar.exe -xf node.zip -C C:\
RUN move C:\node-v22.16.0-win-x64 c:\node
RUN del node.zip

# Set environment variables
ENV PATH="C:\node;%PATH%"
ENV NODE_PATH="C:\node"

# Verify Node.js installation
RUN C:\node\node.exe --version
RUN C:\node\npm.cmd --version

# Expose the port that the MCP server runs on
EXPOSE 3001

# Start the MCP server using full path
CMD ["C:\\node\\npx.cmd", "@antonytm/mcp-sitecore-server@1.3.12"]
