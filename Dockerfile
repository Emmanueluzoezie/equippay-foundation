FROM node:18

WORKDIR /app

# Copy package.json files and other necessary files
COPY package.json lerna.json ./
COPY packages ./packages
COPY database ./database

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate --schema=/app/database/prisma/schema.prisma

# Verify npm installation
RUN which npm || echo "npm not found"

# Build the application
RUN npm run build

# Copy start-services.js and ensure it has correct permissions
COPY start-services.js .
RUN chmod +x start-services.js

# Expose the ports your apps run on
EXPOSE 3005 3006 3007 3008

# Start the application
CMD ["node", "start-services.js"]