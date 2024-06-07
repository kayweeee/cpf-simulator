# Use the official Node.js 20.12.0 image
FROM node:20.12.0

WORKDIR /admin-dashboard

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3001

# Build the Next.js application
RUN npm run build


# Start the Next.js application
CMD ["npm", "start"]

