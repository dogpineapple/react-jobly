import React, { useEffect, useState } from "react";
import JoblyApi from './JoblyApi';
import { useParams, useHistory } from 'react-router-dom';
import JobCard from "./JobCard";

function CompanyDetails() {
  const { handle } = useParams();
  const [companyData, setCompanyData] = useState({});
  const history = useHistory();

  async function applyJob(jobId) {
    const message = await JoblyApi.applyToJob(jobId);
  }

  // axios call to getCompany()
  useEffect(function handleGetCompany() {
    async function getCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompanyData(company);
      } catch (err) {
        //TODO: add an alert to tell user they are unauthorized to access. 
        return history.push("/login");
      }
    }
    getCompany();
  }, [handle, history]);

  return (
    <div>
      <h3>{companyData.name}</h3>
      <p>{companyData.description}</p>
      {companyData.jobs ? companyData.jobs.map(job => <JobCard key={job.id} job={job} applyJob={applyJob}/>) : null}
    </div>
  );
}

export default CompanyDetails;