# Media24 site specific screen capture

Run the image with

```
docker run -it -v /path/to/directory/with/screenshots:/usr/src/app/output --rm media24si/screencapture:latest https://google.com
```

Additional parameters can be passed to the container prior to the URL:

`--width`: Default `1920`
`--height`: Default `1080`
`--filename`: Default `screenshot`
`--format`: Default `png`


## Developing

Install dependencies

```
npm ci
```

Build the image with

```
docker build -t media24si/screencapture:latest .
```