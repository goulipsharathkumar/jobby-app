import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const locationsList = [
  {locationId: 'Hyderabad', label: 'Hyderabad'},
  {locationId: 'Bangalore', label: 'Bangalore'},
  {locationId: 'Chennai', label: 'Chennai'},
  {locationId: 'Delhi', label: 'Delhi'},
  {locationId: 'Mumbai', label: 'Mumbai'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeEmploymentTypes: [],
    activeSalaryRange: '',
    activeLocations: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profile = data.profile_details
      const profileData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {
      activeEmploymentTypes,
      activeSalaryRange,
      searchInput,
      activeLocations,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentType = activeEmploymentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      let jobsList = data.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        title: job.title,
        rating: job.rating,
        location: job.location,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
        jobDescription: job.job_description,
      }))

      // Client-side location filter
      if (activeLocations.length > 0) {
        jobsList = jobsList.filter(job =>
          activeLocations.includes(job.location),
        )
      }

      this.setState({jobsList, jobsApiStatus: apiStatusConstants.success})
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onChangeEmploymentType = event => {
    const {activeEmploymentTypes} = this.state
    const {value, checked} = event.target
    if (checked) {
      this.setState(
        {activeEmploymentTypes: [...activeEmploymentTypes, value]},
        this.getJobs,
      )
    } else {
      const filtered = activeEmploymentTypes.filter(type => type !== value)
      this.setState({activeEmploymentTypes: filtered}, this.getJobs)
    }
  }

  onChangeSalaryRange = event => {
    this.setState({activeSalaryRange: event.target.value}, this.getJobs)
  }

  onChangeLocation = event => {
    const {activeLocations} = this.state
    const {value, checked} = event.target
    if (checked) {
      this.setState(
        {activeLocations: [...activeLocations, value]},
        this.getJobs,
      )
    } else {
      const filtered = activeLocations.filter(loc => loc !== value)
      this.setState({activeLocations: filtered}, this.getJobs)
    }
  }

  renderProfile = () => {
    const {profileApiStatus, profileData} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="profile-card">
            <img
              src={profileData.profileImageUrl}
              alt="profile"
              className="profile-img"
            />
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-bio">{profileData.shortBio}</p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="profile-failure">
            <button
              type="button"
              className="retry-btn"
              onClick={this.getProfile}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderJobsList = () => {
    const {jobsApiStatus, jobsList} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        if (jobsList.length === 0) {
          return (
            <div className="no-jobs-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="no-jobs-img"
              />
              <h1 className="no-jobs-heading">No Jobs Found</h1>
              <p className="no-jobs-description">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          )
        }
        return (
          <ul className="jobs-list">
            {jobsList.map(job => (
              <JobCard key={job.id} jobDetails={job} />
            ))}
          </ul>
        )
      case apiStatusConstants.failure:
        return (
          <div className="jobs-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-img"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
              We cannot seem to find the page you are looking for.
            </p>
            <button type="button" className="retry-btn" onClick={this.getJobs}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {
      searchInput,
      activeEmploymentTypes,
      activeSalaryRange,
      activeLocations,
    } = this.state
    return (
      <div className="jobs-page">
        <Header />
        <div className="jobs-container">
          <div className="sidebar">
            {this.renderProfile()}
            <hr className="sidebar-divider" />
            <h2 className="filter-heading">Type of Employment</h2>
            <ul className="filter-list">
              {employmentTypesList.map(type => (
                <li key={type.employmentTypeId} className="filter-item">
                  <input
                    type="checkbox"
                    id={type.employmentTypeId}
                    value={type.employmentTypeId}
                    className="filter-checkbox"
                    checked={activeEmploymentTypes.includes(
                      type.employmentTypeId,
                    )}
                    onChange={this.onChangeEmploymentType}
                  />
                  <label
                    htmlFor={type.employmentTypeId}
                    className="filter-label"
                  >
                    {type.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="sidebar-divider" />
            <h2 className="filter-heading">Salary Range</h2>
            <ul className="filter-list">
              {salaryRangesList.map(range => (
                <li key={range.salaryRangeId} className="filter-item">
                  <input
                    type="radio"
                    id={range.salaryRangeId}
                    name="salaryRange"
                    value={range.salaryRangeId}
                    className="filter-radio"
                    checked={activeSalaryRange === range.salaryRangeId}
                    onChange={this.onChangeSalaryRange}
                  />
                  <label htmlFor={range.salaryRangeId} className="filter-label">
                    {range.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="sidebar-divider" />
            <h2 className="filter-heading">Location</h2>
            <ul className="filter-list">
              {locationsList.map(location => (
                <li key={location.locationId} className="filter-item">
                  <input
                    type="checkbox"
                    id={location.locationId}
                    value={location.locationId}
                    className="filter-checkbox"
                    checked={activeLocations.includes(location.locationId)}
                    onChange={this.onChangeLocation}
                  />
                  <label htmlFor={location.locationId} className="filter-label">
                    {location.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-main">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearch}
                onKeyDown={this.onKeyDownSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
