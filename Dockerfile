# next.js/examples/with-docker/Dockerfile
# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install --frozen-lockfile

# Stage 2: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY ./certificate.crt /usr/src/certs/certificate.crt
ENV NODE_EXTRA_CA_CERTS=/usr/src/certs/certificate.crt

RUN npm run build

# Stage 3: Run the application in standalone mode
FROM node:20-alpine AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./
# Copy public and static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

COPY ./certificate.crt /usr/src/certs/certificate.crt
ENV NODE_EXTRA_CA_CERTS=/usr/src/certs/certificate.crt

# Expose port 3000 and start the application
EXPOSE 3000
CMD ["node", "server.js"]