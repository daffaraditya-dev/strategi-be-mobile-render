FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port (adjust if necessary)
EXPOSE 3000

# Define the command to run the application in production
CMD ["node", "dist/rest/server.js"]