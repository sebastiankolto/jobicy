import { useQuery } from "@tanstack/react-query";
import { fetchJobs, fetchLocations, fetchIndustries } from "@/utils/api";
import { JobFilters } from "@/types/interfaces";

export function useJobs(filters: JobFilters = {}) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useIndustries() {
  return useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
