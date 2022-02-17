# virus-total-cli

This CLI will allow you test a file hash with the Virus Total API.

## Usage

> Note, if downloading the sources you must build first the cli as described [here](#build-from-source).

```console
./dist/index.js [hash]
./dist/index.js -v [hash] 
./dist/index.js -k <api-key> [hash] 
```

To include your Virus Total API Key use the `-k`/`--apiKey` option or set the `VT_KEY` environment variable.

To print verbosely the result use the `-v`/`--verbose` flag.

## Build from Source

To build the project from source code pull the sources and run the following.
```console
npm install && npm run build
or 
yarn install && yarn build
```

To run the tests use:
```console
npm test
or
yarn test
```

The executable cli file is build to `dist/index.js` and your can rename it to whatever you like.

