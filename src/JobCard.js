import React, { useContext } from "react";
import AppliedJobsContext from "./AppliedJobsContext";
import "./JobCard.css";


function JobCard({ job, applyJob }) {
  const { userJobs, applyForJob } = useContext(AppliedJobsContext);

  // foundJob lets us keep track if the job is Applied or not. 
  // try to find the current job in the array of
  // userJobs.

  let foundJob = userJobs.find((el) => el.id === job.id);


  const handleApply = () => {
    // method from our JobsList.js that pings the JoblyApi to apply for job.
    applyJob(job.id);
    // method from our App.js that updates the userData's jobs array.
    applyForJob(job);
  }

  return (
    <div className="JobCard">
      <div className="JobCard-container">
        <h5 className="JobCard-title">{job.title}</h5>
        <p className="JobCard-salary">Salary: ${job.salary}</p>
        <p className="JobCard-equity">Equity: {job.equity}</p>
        {foundJob !== undefined ? <button className="JobCard-applied" disabled>Applied</button> : <button className="JobCard-apply" onClick={handleApply}>Apply</button>}
      </div>
    </div>
  );
}

export default JobCard;