# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

ARG NEXT_API_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

ENV NEXT_API_URL=http://empresa-admin-api:8080/api
ENV NEXT_PUBLIC_API_URL=http://localhost:5082/api
ENV NEXTAUTH_SECRET=103dafd3e7aca046211434a4da2fe03f
ENV NEXTAUTH_URL=http://localhost:3000


# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
