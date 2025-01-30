# Use Node.js base image
FROM node:22.12.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Create uploads directory
RUN mkdir -p upload

# Expose port
EXPOSE 7086

# Start the server
CMD ["node", "src/app.js"]
