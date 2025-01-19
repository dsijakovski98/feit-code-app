# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Set config
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn/v6

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package.json yarn.lock ./

# Install packages
RUN yarn install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN yarn build

# Use the Caddy image
FROM caddy

# Create and change to the app directory.
WORKDIR /app

# Copy Caddyfile to the container image.
COPY Caddyfile ./

# Copy local code to the container image.
RUN caddy fmt Caddyfile --overwrite

# Copy files to the container image.
COPY --from=build /app/dist ./dist

# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
