import React, { useEffect, useState } from "react";
import JoblyApi from "./JoblyApi";
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import { useHistory } from "react-router-dom";

function CompaniesList({ isLoggedIn }) {
  const [listOfCompanies, setListOfCompanies] = useState([]);
  const history = useHistory();

  async function searchCompanies(data) {
    const companiesFound = await JoblyApi.getCompanies(data);
    setListOfCompanies(companiesFound);
  }

  useEffect(function handleFetchCompanies() {
    async function fetchCompanies () {
      try {
        const companies = await JoblyApi.getCompanies();
        setListOfCompanies(companies);
      } catch (err) {
        return history.push("/login");
      }
    }
    fetchCompanies();
  }, [history]);


  return (
    <div>
      CompaniesList
      <SearchForm search={searchCompanies}/>
      <ul>
      {listOfCompanies.map( company => <CompanyCard key={company.handle} company={company} /> )}
      </ul>
    </div>
  );
}

export default CompaniesList;