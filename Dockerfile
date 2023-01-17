FROM node:16-slim

WORKDIR /home/node/app
COPY . .
RUN npm i

ENTRYPOINT [ "tail", "-f", "/dev/null" ]