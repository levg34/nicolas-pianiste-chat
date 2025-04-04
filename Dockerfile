FROM oven/bun:1.0-slim AS builder

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY client ./client
COPY server ./server

RUN bun build \
  --minify \
  --splitting \
  --public-path /assets/ \
  --outdir client/dist \
  client/src/index.tsx

FROM oven/bun:1.0-slim

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["bun", "run", "server/src/server.ts"]
