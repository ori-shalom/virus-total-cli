import { AnalysisStats, FileCheckResponse } from './types';

/**
 * Try to retrieve thr Virus Total API Key from the environment variables.
 * Throws an error if not found.
 * @returns {string}
 */
export function getVtApiKey(): string {
  const key = process.env.VT_KEY;
  if (key) return key;
  throw Error('Unauthorized, please add VT_KEY environment variable with your VirusTotal API Key');
}

/**
 * Omit stats with value 0;
 * @returns {any}
 * @param fileCheckResponse
 * @param verbose
 */
export function formatResults(fileCheckResponse: FileCheckResponse, verbose = false): Partial<AnalysisStats> {
  const { last_analysis_results, last_analysis_stats } = fileCheckResponse?.data?.attributes;
  if (!verbose) return Object.fromEntries(Object.entries(last_analysis_stats).filter(([state,count]) => count));
  return Object.entries(last_analysis_results).reduce((aggregatedResults: Record<string, number>, [engine, {category}]) => {
    console.log('Processing:', engine);
    return { ...aggregatedResults, [category]: (aggregatedResults[category] ?? 0) + 1};
  }, {});
}

/**
 * Validate the response returned by the Virus Total API.
 * @returns {unknown}
 * @param response
 */
export function isValidResponse(response: unknown): response is FileCheckResponse {
  return response !== null &&
    typeof response === 'object' &&
    'data' in response &&
    typeof (response as any).data === 'object' &&
    'attributes' in (response as any).data &&
    typeof (response as any).data.attributes === 'object' &&
    'last_analysis_results' in (response as any).data.attributes &&
    'last_analysis_stats' in (response as any).data.attributes;
}


/**
 * https://developers.virustotal.com/reference/errors
 */
export function handleError(apiError: any) {
  // TODO: Add specific error handling to various API errors.
  console.error(apiError);
  process.exit(1);
}