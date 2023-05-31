# Use the official Node.js v14.x image as the base image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Set the environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port on which the server will listen
EXPOSE $PORT

# Start the server
CMD ["npm", "start"]