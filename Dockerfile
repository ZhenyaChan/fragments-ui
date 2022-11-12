# Building fragment-ui web app and serving it using nginx

# Stage 0: Install the base dependencies
FROM node:19.0.1-bullseye@sha256:6da4e30e3952e460fe4ad256e46a8b79acce46dd596bbe4ef882d5ec0d1ef6cb AS dependencies
# Defining metadata about the image
LABEL maintainer="Tran Quang Dung <qdtran3@myseneca.ca>" \
      description="Fragments-UI web app node.js microservice"

# Defining the working directory
WORKDIR /app
# Copy package.json and package-lock.json into the working directory
COPY package*.json ./
# Installing node depedencies defined by package files
RUN npm ci

##################################################################

# Stage 1: Build the the web app
FROM node:19.0.1-bullseye@sha256:6da4e30e3952e460fe4ad256e46a8b79acce46dd596bbe4ef882d5ec0d1ef6cb AS build

WORKDIR /app
# Copy the generated dependencies (node_modules/)
COPY --from=dependencies /app /app
# Copying source code into the image filesystem
COPY . .
# Building the site (dist/)
RUN npm run build

##################################################################

# Stage 2: Serve the built web app
FROM nginx:1.23.2-alpine@sha256:7f01646baf70c28a99fc1c78b827d1942ba097daf693f1991daaeecd3c3dcc83 AS deploy

# Copying the built site to the directory that nginx expects for static sites
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENV PORT=80

HEALTHCHECK --interval=15s --timeout=30s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:${PORT}/ || exit 1