export interface Job {
  id: number;
  url: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string[];
  jobType: string;
  jobGeo: string;
  jobLevel: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
}

export interface JobsApiResponse {
  apiVersion: string;
  documentationUrl: string;
  friendlyNotice: string;
  jobCount: number;
  jobs: Job[];
}

export interface JobFilters {
  geo?: string;
  industry?: string;
}

export interface Location {
  geoID: number;
  geoName: string;
  geoSlug: string;
}

export interface Industry {
  industryID: number;
  industryName: string;
  industrySlug: string;
}

export interface LocationsResponse {
  locations: Location[];
}

export interface IndustriesResponse {
  industries: Industry[];
}
