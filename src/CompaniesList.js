import React, { useEffect, useState } from "react";
import JoblyApi from "./JoblyApi";
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import { useHistory } from "react-router-dom";
import "./CompaniesList.css";
import JwPagination from 'jw-react-pagination';

function CompaniesList({ isLoggedIn }) {
  const [listOfCompanies, setListOfCompanies] = useState([]);
  const [pageOfItems, setPageOfItems] = useState([]);
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


  function onChangePage(pageOfItems) {
    // update local state with new page of items
    setPageOfItems(pageOfItems);
  }

  return (
    <div className="CompaniesList">
      <h2 className="CompaniesList-title">Companies</h2>
      <SearchForm search={searchCompanies}/>
      <ul className="CompaniesList-list">
      {pageOfItems.map( company => <CompanyCard key={company.handle} company={company} /> )}
      </ul>
      <JwPagination items={listOfCompanies} onChangePage={onChangePage} />
    </div>
  );
}

export default CompaniesList;