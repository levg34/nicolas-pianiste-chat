FROM oven/bun:1 AS builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY server ./server
COPY client ./client

RUN cd client && bun run build

FROM oven/bun:1

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["bun", "run", "server/src/server.ts"]
