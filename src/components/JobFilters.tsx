"use client";

import { useLocations, useIndustries } from "@/hooks/useJobs";
import SearchDropdown from "./SearchDropdown";
import { decodeHtml } from "@/utils/decode";

interface JobFiltersProps {
  geo: string;
  industry: string;
  onGeoChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
}

export default function JobFilters({
  geo,
  industry,
  onGeoChange,
  onIndustryChange,
}: JobFiltersProps) {
  const { data: locationsData } = useLocations();
  const { data: industriesData } = useIndustries();

  const locationOptions =
    locationsData?.locations.map((location) => ({
      value: location.geoSlug,
      label: decodeHtml(location.geoName),
    })) || [];

  const industryOptions =
    industriesData?.industries.map((industry) => ({
      value: industry.industrySlug,
      label: decodeHtml(industry.industryName),
    })) || [];

  return (
    <div className="flex flex-wrap gap-4">
      <SearchDropdown
        id="geo"
        label="Region"
        options={locationOptions}
        value={geo}
        onChange={onGeoChange}
        placeholder="All Regions"
      />
      <SearchDropdown
        id="industry"
        label="Industry"
        options={industryOptions}
        value={industry}
        onChange={onIndustryChange}
        placeholder="All Industries"
      />
    </div>
  );
}
