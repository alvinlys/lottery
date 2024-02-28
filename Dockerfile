FROM node:current-slim AS base
RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get -y install --no-install-recommends openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build-api
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter=api install --frozen-lockfile
RUN cd ./apps/api && npx prisma generate
RUN pnpm --filter=api run build
RUN pnpm deploy --filter=api --prod /api

FROM base AS api
COPY --from=build-api /api /api
WORKDIR /api
RUN npx prisma generate
CMD [ "pnpm", "start:prod" ]
