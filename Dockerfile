FROM node:22-alpine AS base

WORKDIR /app


FROM base AS dependencies

RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./

RUN npm ci


FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV SKIP_ENV_VALIDATION=1

RUN npm run build


FROM base AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["server.js"]
