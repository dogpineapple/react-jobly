import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyApi";
import { useHistory } from "react-router-dom";
import "./JobsList.css";
import JwPagination from 'jw-react-pagination';

function JobsList({ userData }) {
  // state for an array of jobs 
  const [listOfJobs, setListOfJobs] = useState([]);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [message, setMessage] = useState("");
  const history = useHistory();

  // searchJobs method to get a filtered list of jobs
  async function searchJobs(data) {
    const jobsFound = await JoblyApi.getJobs(data);
    setListOfJobs(jobsFound);
  }

  // applyJob makes a post to apply to a job, sets a message returned from api.
  async function applyJob(jobId) {
    const messageRes = await JoblyApi.applyToJob(jobId);
    setMessage(messageRes);
  }

  function onChangePage(pageOfItems) {
    // update local state with new page of items
    setPageOfItems(pageOfItems);
  }

  // use effect, use upon mount
  useEffect(function handleFetchJobs() {
    // make an axios request to get all jobs
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setListOfJobs(jobs);
      } catch (err) {
        return history.push("/login");
      }
    }
    fetchJobs();
  }, [history]);

  return (
    <div className="JobsList">
      <h2 className="JobsList-title">Job Listings</h2>
      {message !== "" ? <p style={{ color: "green" }}>{message}</p> : null}
      <SearchForm search={searchJobs} />
      {pageOfItems.map((job) => {
        return <JobCard key={job.id} job={job} applyJob={applyJob} />
      })}
      <br/>
      <JwPagination items={listOfJobs} onChangePage={onChangePage} />
    </div>
  );
}

export default JobsList;