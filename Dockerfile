FROM node:20.12.0-alpine AS deps

WORKDIR /opt/app

COPY yarn.lock package.json ./

# Install prod dependencies
RUN yarn install --production && \
    # Cache prod dependencies
    cp -R node_modules /prod_node_modules && \
    # Install dev dependencies
    yarn install --production=false

FROM node:20.12.0-alpine AS builder
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
COPY --from=deps /opt/app/.env ./.env
RUN yarn global add typescript

RUN tsc
RUN node ./node_modules/.bin/mikro-orm-esm cache:generate --combined 
RUN rm -rf node_modules

FROM node:20.12.0-alpine AS runner

WORKDIR /opt/app

COPY --from=deps /prod_node_modules ./node_modules
COPY --from=builder --chown=node /opt/app/dist ./dist

COPY --from=builder --chown=node /opt/app/package.json .
COPY --from=builder --chown=node /opt/app/example.env ./.env

CMD [ "yarn", "start" ]