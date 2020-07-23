
# using a prebuilt builder image with potentially needed native dependencies
FROM ahmedaly86/npm:builder as builder

# /ws work space directory
WORKDIR /ws/

# copy build dependencies
COPY package.json .
COPY yarn.lock .

# install dependencies
RUN yarn install --silent

# build bundle
RUN npm run build --quiet

# production stage
FROM nginx:stable-alpine as hoster

COPY --from=builder /ws/build /usr/share/nginx/html
COPY --from=builder /ws/nginx.conf /etc/nginx/conf.d/default.conf

# Make port available to the world outside this container
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
