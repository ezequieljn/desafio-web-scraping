FROM node:16

RUN apt-get update \
    && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium


WORKDIR /home/node/app
COPY . .
RUN npm i

EXPOSE 3030
ENTRYPOINT [ "tail", "-f", "/dev/null" ]