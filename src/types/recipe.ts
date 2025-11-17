export type StepType = "page" | "reference";

export interface CodeSample {
  language: string;
  label: string;
  code: string;
}

export interface SaverResponse {
  from: string;
  to: string;
}

export interface ApiConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
  parameters: Array<string>;
  saveResponse: Array<SaverResponse>;
}

export interface CompletionCriteria {
  expectedStatus: number;
  expectedFields: string[];
}

interface BaseStep {
  id: string;
  title: string;
  description?: string;
  contentPath: string;
  requiresExecution: boolean;
}

export interface PageStep extends BaseStep {
  type: "page" | "simple" | "3-tier";
  requiresExecution: false;
  codeSamples?: never;
  apiConfig?: never;
  completionCriteria?: never;
  parameters?: never;
}

export interface ReferenceStep extends BaseStep {
  type: "reference";
  codeSamples: CodeSample[];
  apiConfig: ApiConfig;
}

export type RecipeStep = PageStep | ReferenceStep;

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  version: string;
  difficulty: string;
  estimatedTime: string;
  steps: RecipeStep[];
  createdAt: string;
  updatedAt: string;
}
