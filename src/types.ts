
/**
 * Expected Response from Virus Total.
 * Note, these are only the properties used by the CLI, the actual response might include additional properties.
 * @see https://developers.virustotal.com/reference/files
 */
export type FileCheckResponse = {
  data: {
    attributes: {
      last_analysis_results: AnalysisResults;
      last_analysis_stats: AnalysisStats;
    }
  };
}

export type AnalysisResults = Record<string, EngineResult>;
export type AnalysisStats = Record<AnalysisCategory, number>;

export type AnalysisCategory = 'harmless' | 'type-unsupported' | 'suspicious' |
  'confirmed-timeout' | 'timeout' | 'failure' | 'malicious' | 'undetected';

export type EngineResult = {
  category: AnalysisCategory,
  engine_name: string
}
