
import React from "react";
import { MapPin, Bookmark, Briefcase } from "lucide-react";

function JobCard({ job, saved, onSave, onDetails }) {
  return (
    <div className="job-card">
      <div className="job-top">
        <div className="company-logo">
          {job.logo}
        </div>

        <button
          className="save-btn"
          onClick={() => onSave(job.id)}
          aria-label="Save job"
        >
          <Bookmark
            size={20}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>

      <div className="job-info">
        <span><MapPin size={15}/> {job.location}</span>
        <span><Briefcase size={15}/> {job.type}</span>
      </div>

      <div className="job-bottom">
        <strong>{job.salary}</strong>

        <button onClick={() => onDetails(job)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
