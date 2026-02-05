"use client";

import { Job } from "@/types/interfaces";
import { decodeHtml } from "@/utils/decode";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex flex-col bg-white p-6 gap-4 justify-between">
      <div className="flex items-start gap-4">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={`${job.companyName} logo`}
            className="h-12 w-12 rounded-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="flex items-center h-12 w-12 rounded-full bg-gray-300" />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">
            {decodeHtml(job.jobTitle)}
          </h3>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-x-4">
        <span className="text-xs font-bold  text-blue-800 bg-gray-100 p-3">
          {decodeHtml(job.jobType)}
        </span>
        <span className="text-xs font-bold text-gray-800  bg-gray-100 p-3">
          {decodeHtml(job.jobLevel)}
        </span>
      </div>
      <p className="text-sm text-gray-800">{decodeHtml(job.jobExcerpt)}</p>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="self-end flex text-sm font-medium text-blue-600"
      >
        Visit job
      </a>
    </div>
  );
}
