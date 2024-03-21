# Use node image as base
FROM node:21 AS build

# Set working directory
WORKDIR /app


# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy all files from current directory to work directory
COPY . .

RUN npx jest --coverage

#run sonar analysis
RUN npm install -g sonarqube-scanner
RUN npx sonar-scanner 
  

# Build React app
RUN npm run build

# Use Nginx image as base for serving static files
FROM nginx:alpine

# Copy built static files from previous stage to Nginx default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (default port used by Nginx)
EXPOSE 80