# virus-total-cli

This package can be used either as a NodeJS Library or as a CLI wrapper for the Virus Total API.

> **Note,**
> 
> This CLI currently support only testing of a file hash with the Virus Total API.
## Install

Install globally using npm:
```console
npm install -g @ori-sh/virus-total
```

Install globally using yarn:
```console
yarn global add @ori-sh/virus-total
```

Or use directly with `npx @ori-sh/virus-total`.

## Usage

After installing globally you can simply use the CLI with the `vt` command.

```console
vt [file hash]
vt -v [file hash] 
vt -k <api-key> [file hash] 
```

Example:
```console
vt a089308a259b8f3c8482a8ae4df155e8c6e46b12
// { 'type-unsupported': 13, undetected: 57 }
vt efa8eb64099989f2699eff82a7ff35dc750c027e
// { 'type-unsupported': 16, malicious: 31, undetected: 28 }
```

To include your Virus Total API Key use the `-k`/`--apiKey` option or set the `VT_KEY` environment variable.

To print verbosely the result use the `-v`/`--verbose` flag.

> **Note,**
>
> If pulling the sources from GitHub you must build first the CLI as described [bellow](#build-from-source).

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
