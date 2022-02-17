import axios from 'axios';
import { FileCheckResponse } from './types';

/**
 * Call Virus Total API to check for file hash stats.
 *
 * @param {string} hash - The file hash to check
 * @param {string} apiKey - The Virus Total API Key
 * @returns {Promise<FileCheckResponse>}
 * @see https://developers.virustotal.com/reference/file-info
 */
export async function checkHash(hash: string, apiKey: string) {
  return (await axios.get<FileCheckResponse>(`https://www.virustotal.com/api/v3/files/${hash}`, {
    headers: { 'x-apikey': apiKey }
  })).data;
}
