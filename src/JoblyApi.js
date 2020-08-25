import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

class JoblyApi {
  static async request(endpoint, params = {}, verb = "get") {
    console.debug("API Call:", endpoint, params, verb);

    const _token = localStorage.getItem('_token');
    console.log("_token", _token);

    const data = (verb === "get")
      ? { params: { _token, ...params } } // GET
      : { _token, ...params };            // POST, PATCH


    const req = await axios[verb](`${BASE_URL}/${endpoint}`, data);

    try {
      return req.data;
    } catch (err) {
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Indiv API routes

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(query = {}) {
    let res = await this.request('companies', query);
    return res.companies;
  }

  static async getJobs(query = {}) {
    let res = await this.request('jobs', query);
    return res.jobs;
  }
  
  static async login(data) {
    let res = await this.request('login', data, 'post');
    return res.token;
  }

  static async signup(data) {
    let res = await this.request('users', data, 'post');
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, userdata) {
    let res = await this.request(`users/${username}`, userdata, 'patch');
    return res.user;
  }

  static async applyToJob(jobId) {
    let res = await this.request(`jobs/${jobId}/apply`, {} ,'post');
    return res.message;
  }

}

export default JoblyApi;