FROM alpine:3.17.2

# Installs latest Chromium package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy current directory to /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/output

ENTRYPOINT ["node", "index.js"]

