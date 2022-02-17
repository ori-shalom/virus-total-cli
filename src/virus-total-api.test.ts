import 'dotenv/config';
import { expect } from 'chai';
import { promises } from 'fs';
import { join } from 'path'
import { getVtApiKey } from './lib';
import { checkHash } from './virus-total-api';

/**
 * A helper function for testing consistency of APIs response with mock files.
 * It is also capable of overriding mock files when `writeToMock` option set to `true`.
 * @param {string} response
 * @param {string} mockFile
 * @param {{compareToMock: boolean, writeToMock: boolean}} options
 * @returns {Promise<void>}
 */
async function testApi(
  response: string,
  mockFile: string,
  options: { compareToMock: boolean, writeToMock: boolean }
) {
  const { compareToMock = true, writeToMock = false } = options;
  if (compareToMock) expect(response).to.be.equals(await promises.readFile(mockFile, 'utf-8'));
  if (writeToMock) await promises.writeFile(mockFile, response, 'utf-8');
}

/**
 * This test suite in an integration test with Virus Total.
 * It requires internet connectivity, access to Virus Total and a Virus Total API Key.
 * Normally skip this test case to preserve API quotas and avoid failing due to network issues.
 */
describe.skip('virus-total-api', function () {
  const apiKey = getVtApiKey();
  const compareToMock = true;
  const writeToMock = false;
  it('return proper response for Chrome hash', async function () {
    const response = JSON.stringify(await checkHash('a089308a259b8f3c8482a8ae4df155e8c6e46b12', apiKey));
    await testApi(response, join(__dirname, 'mock/chrome-response.json'), { compareToMock, writeToMock });
  });
  it('fail recognize malicious hash', async function () {
    const response = JSON.stringify(await checkHash('efa8eb64099989f2699eff82a7ff35dc750c027e', apiKey));
    await testApi(response, join(__dirname, 'mock/malware-response.json'), { compareToMock, writeToMock });
  });
});
