
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import JobCard from "./components/JobCard";
import jobs from "./data/jobs";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const toggleSave = (id) => {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const applyJob = (job) => {
    if (!applications.some((item) => item.id === job.id)) {
      setApplications((previous) => [...previous, job]);
    }
    setSelectedJob(null);
    setPage("applications");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesType =
      jobType === "All" || job.type === jobType;

    return matchesSearch && matchesLocation && matchesType;
  });

  const visibleJobs =
    page === "saved"
      ? filteredJobs.filter((job) => savedJobs.includes(job.id))
      : page === "applications"
      ? applications
      : filteredJobs;

  return (
    <div>
      <Navbar page={page} setPage={setPage} />

      {page === "home" && (
        <section className="hero">
          <span className="hero-tag">YOUR CAREER STARTS HERE</span>

          <h1>
            Find Your <span>Dream Job</span>
            <br /> And Build Your Future
          </h1>

          <p>
            Discover thousands of opportunities and
            take the next step in your career.
          </p>

          <button
            className="primary-btn"
            onClick={() => setPage("jobs")}
          >
            Explore Opportunities
          </button>

          <div className="hero-stats">
            <div><strong>500+</strong><span>Jobs</span></div>
            <div><strong>100+</strong><span>Companies</span></div>
            <div><strong>50+</strong><span>Categories</span></div>
          </div>
        </section>
      )}

      <main className="main-content">
        <h2>
          {page === "saved"
            ? "Saved Jobs"
            : page === "applications"
            ? "My Applications"
            : page === "jobs"
            ? "Explore Jobs"
            : "Latest Opportunities"}
        </h2>

        <div className="search-bar">
          <input
            placeholder="Search job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="job-grid">
          {visibleJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={savedJobs.includes(job.id)}
              onSave={toggleSave}
              onDetails={setSelectedJob}
            />
          ))}
        </div>

        {visibleJobs.length === 0 && (
          <p className="empty">
            No jobs found. Try another search.
          </p>
        )}
      </main>

      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>

            <h2>{selectedJob.title}</h2>
            <h3>{selectedJob.company}</h3>

            <p>{selectedJob.description}</p>

            <h4>Required Skills</h4>
            <div className="skills">
              {selectedJob.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <p>Location: {selectedJob.location}</p>
            <p>Salary: {selectedJob.salary}</p>

            <button
              className="primary-btn"
              onClick={() => applyJob(selectedJob)}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
