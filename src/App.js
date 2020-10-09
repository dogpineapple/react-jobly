import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Homepage from './Homepage';
import CompanyDetail from './CompanyDetail';
import JobsList from './JobsList';
import CompaniesList from './CompaniesList';
import UserProfile from './UserProfile';
import LoginSignUp from './LoginSignUp';
import JoblyApi from './JoblyApi';
import AppliedJobsContext from './AppliedJobsContext';
import "./App.css";

// apply for job fxn that setUserData( old jobs + new applied job) 
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  // useEffect to check if the token is still in localStorage (the user hasnt been logged out).
  useEffect(function checkIfTokenExists() {
    // Validate the token by making API request to '/:username' and to get userData as well.
    // if 401 (Unauthorized) err response, it will go to `catch` block at line 38. 
    // otherwise, continue to line 37 to `setLoggedIn(true)`
    async function tokenValidation() {
      const _token = localStorage.getItem("_token");

      // if _token doesn't exist in localStorage, then setLoggedIn to false.
      if (_token === null) {
        setLoggedIn(false);
      }

      try {
        // obtain the username from the token 
        let splitToken = _token.split('.');
        let decodedToken = JSON.parse(atob(splitToken[1]));
        let username = decodedToken.username;

        const userResp = await JoblyApi.getUser(`/${username}`);
        setUserData(userResp);
        setLoggedIn(true);
      } catch (err) {
        setLoggedIn(false);
      }
    }
    tokenValidation();
  }, [isLoggedIn]);

  // logOutUser: clears the token from localStorage, setLoggedIn to false, 
  const logOutUser = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const applyForJob = (newJob) => {
    setUserData((currData) => {
      let newJobsArray = [...currData.jobs, newJob];
      return { ...currData, jobs: newJobsArray };
    })
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} logOutUser={logOutUser} />
        <AppliedJobsContext.Provider value={{ userJobs: userData.jobs || [], applyForJob }}>
          <Switch>
            <Route exact path="/companies/:handle"><CompanyDetail userData={userData} changeUserData={setUserData} /></Route>
            <Route exact path="/jobs"><JobsList isLoggedIn={isLoggedIn} changeUserData={setUserData} /></Route>
            <Route exact path="/companies"><CompaniesList isLoggedIn={isLoggedIn} /></Route>
            <Route exact path="/profile"><UserProfile userData={userData} changeUserData={setUserData} isLoggedIn={isLoggedIn} /></Route>
            <Route exact path="/login"><LoginSignUp isLoggedIn={isLoggedIn} logIn={setLoggedIn} /></Route>
            <Route exact path="/"><Homepage isLoggedIn={isLoggedIn} /></Route>
          </Switch>
        </AppliedJobsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
