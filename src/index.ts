#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { formatResults, getVtApiKey, handleError, isValidResponse } from './lib';
import { checkHash } from './virus-total-api';

/**
 * Parse the command line arguments.
 */
const { verbose, apiKey, _ } = yargs(hideBin(process.argv))
.options({
  verbose: {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  },
  apiKey: {
    alias: 'k',
    type: 'string',
    description: 'A Virus Total API Key'
  }
})
.positional('hash', {
  describe: 'The file hash to be examined',
  type: 'string'
}).parseSync();


if (_.length < 1) {
  console.error('Missing File Hash input.');
  process.exit(1);
}
checkHash(_[0] as string, apiKey ?? getVtApiKey()).then(response => {
  if (!isValidResponse(response)) {
    console.error('Unexpected response form Virus Total.');
    console.error(JSON.stringify(response, null, 2));
    process.exit(1);
  }
  console.log(formatResults(response, verbose));
}).catch(handleError);
