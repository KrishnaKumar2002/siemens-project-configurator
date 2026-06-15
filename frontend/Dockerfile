# Stage 1: Build the Angular application
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first (for better Docker caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application files and compile
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve the application using Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
