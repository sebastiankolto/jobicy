import { JobsApiResponse, JobFilters, LocationsResponse, IndustriesResponse } from "@/types/interfaces";

const API_BASE_URL = "https://jobicy.com/api/v2/remote-jobs";

export async function fetchJobs(filters: JobFilters = {}): Promise<JobsApiResponse> {
  const params = new URLSearchParams();

  if (filters.geo) {
    params.append("geo", filters.geo);
  }
  if (filters.industry) {
    params.append("industry", filters.industry);
  }

  const url = params.toString()
    ? `${API_BASE_URL}?${params.toString()}`
    : API_BASE_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`);
  }

  return response.json();
}

export async function fetchLocations(): Promise<LocationsResponse> {
  const response = await fetch(`${API_BASE_URL}?get=locations`);
  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.status}`);
  }
  return response.json();
}

export async function fetchIndustries(): Promise<IndustriesResponse> {
  const response = await fetch(`${API_BASE_URL}?get=industries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch industries: ${response.status}`);
  }
  return response.json();
}
