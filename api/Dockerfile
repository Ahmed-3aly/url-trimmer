
# using a prebuilt builder image with potentially needed native dependencies
FROM ahmedaly86/npm:builder as builder

# /ws work space directory
WORKDIR /ws

# copy build dependencies
COPY package.json .
COPY yarn.lock .

# install dependencies
RUN yarn install --silent

# move source
COPY . .

# build /dist
RUN npm run build

# production stage
FROM node:14.5-slim as hoster

WORKDIR /ws

COPY --from=builder /ws/node_modules /node_modules
COPY --from=builder /ws/dist /dist
COPY --from=builder /ws/*.json /

WORKDIR /

# Make port available to the world outside this container
EXPOSE 5000

CMD ["node", "."]
