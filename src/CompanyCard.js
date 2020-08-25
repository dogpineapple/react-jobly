import React from 'react';
import { Link } from 'react-router-dom';
import "./CompanyCard.css";

function CompanyCard({ company }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${company.handle}`}><h4 className="CompanyCard-title">{company.name}</h4></Link>
    </div>
  );
}

export default CompanyCard;