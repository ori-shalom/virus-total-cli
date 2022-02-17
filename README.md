# virus-total-cli

This package can be used either as a NodeJS Library or as a CLI wrapper for the Virus Total API.

> **Note,**
> 
> This CLI currently support only testing of a file hash with the Virus Total API.

## Usage

```console
vt [hash]
vt -v [hash] 
vt -k <api-key> [hash] 
```

To include your Virus Total API Key use the `-k`/`--apiKey` option or set the `VT_KEY` environment variable.

To print verbosely the result use the `-v`/`--verbose` flag.

> **Note,**
>
> If downloading the pulling the sources from GitHub you must build first the CLI as described [here](#build-from-source).

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


