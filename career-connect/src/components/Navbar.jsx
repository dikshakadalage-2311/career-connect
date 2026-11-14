
import React from "react";
import { BriefcaseBusiness } from "lucide-react";

function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <BriefcaseBusiness size={26} />
        <span>CareerConnect</span>
      </div>

      <div className="nav-links">
        <button onClick={() => setPage("home")}>
          Home
        </button>

        <button onClick={() => setPage("jobs")}>
          Find Jobs
        </button>

        <button onClick={() => setPage("saved")}>
          Saved Jobs
        </button>

        <button onClick={() => setPage("applications")}>
          My Applications
        </button>
      </div>

      <button
        className="nav-btn"
        onClick={() => setPage("jobs")}
      >
        Explore Jobs
      </button>
    </nav>
  );
}

export default Navbar;
