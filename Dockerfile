# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --ignore-engines --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Install 'serve' globally to serve the app
RUN npm install -g serve

# Expose the port used by 'serve' (default: 3000)
EXPOSE 3000

# Set the default command to serve the app
CMD ["serve", "--single", "dist"]
