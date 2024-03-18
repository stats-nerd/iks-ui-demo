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

# Run Jest tests with code coverage
RUN npm test -- --coverage


# Build the React application
RUN npm run build

# Stage 2: SonarQube analysis
FROM node:21 AS sonarqube

WORKDIR /app

# Copy the built application to the sonarqube image
COPY --from=build /app .

#run sonar analysis
RUN npx sonar-scanner \
    -Dsonar.host.url=http://34.125.47.19:9000 \
    -Dsonar.login=admin \
    -Dsonar.password=1234 \
    -Dsonar.projectKey=my_react_project
    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info



# Use Nginx image as base for serving static files
FROM nginx:alpine

# Copy built static files from previous stage to Nginx default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (default port used by Nginx)
EXPOSE 80
