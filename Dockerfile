FROM node:current-slim AS base
RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get -y install --no-install-recommends openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS api
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter=api install --frozen-lockfile
ADD .env apps/api/.env
WORKDIR apps/api
RUN npx prisma generate 
RUN npx prisma migrate deploy
RUN pnpm --filter=api run build
CMD [ "pnpm", "start:prod" ]
