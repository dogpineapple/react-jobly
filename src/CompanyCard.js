import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
  return (
    <div>
      <Link to={`/companies/${company.handle}`}><h4>{company.name}</h4></Link>
    </div>
  );
}

export default CompanyCard;