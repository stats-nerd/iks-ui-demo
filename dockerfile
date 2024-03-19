# Stage 1: Build the React application
FROM node:21 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .


# Install dependencies
RUN npm install

# Copy the rest of the application code
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
COPY sonar-project.properties .

# Execute Sonar Scanner for analysis
RUN npx sonar-scanner 
  

# Stage 3: Serve the built React application
FROM nginx:alpine

# Copy build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy default nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
