"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useJobs } from "@/hooks/useJobs";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const geo = searchParams.get("geo") || "";
  const industry = searchParams.get("industry") || "";

  const { data, isLoading, error } = useJobs({ geo, industry });

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gray-200 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <JobFilters
            geo={geo}
            industry={industry}
            onGeoChange={(value) => updateParams("geo", value)}
            onIndustryChange={(value) => updateParams("industry", value)}
          />
        </div>
        {isLoading && <p className="text-gray-500">Loading</p>}
        {error && (
          <p className="text-red-500">Error loading jobs: {error.message}</p>
        )}
        {data?.jobs && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
        {data?.jobs && data.jobs.length === 0 && (
          <p className="text-gray-500">No jobs with current filters</p>
        )}
      </div>
    </main>
  );
}
