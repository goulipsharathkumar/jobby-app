import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const job = data.job_details
      const jobDetails = {
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
        lifeAtCompany: {
          description: job.life_at_company.description,
          imageUrl: job.life_at_company.image_url,
        },
        skills: job.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
      }
      const similarJobs = data.similar_jobs.map(sJob => ({
        id: sJob.id,
        companyLogoUrl: sJob.company_logo_url,
        employmentType: sJob.employment_type,
        jobDescription: sJob.job_description,
        location: sJob.location,
        rating: sJob.rating,
        title: sJob.title,
      }))
      this.setState({
        jobDetails,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails

    return (
      <div className="job-details-content">
        <div className="job-details-card">
          <div className="jd-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jd-company-logo"
            />
            <div>
              <h1 className="jd-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jd-meta">
            <div className="jd-location-type">
              <div className="icon-text">
                <MdLocationOn className="job-icon" />
                <p className="job-text">{location}</p>
              </div>
              <div className="icon-text">
                <BsBriefcaseFill className="job-icon" />
                <p className="job-text">{employmentType}</p>
              </div>
            </div>
            <p className="jd-package">{packagePerAnnum}</p>
          </div>
          <hr className="jd-divider" />
          <div className="jd-description-header">
            <h2 className="jd-section-heading">Description</h2>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit <BiLinkExternal />
            </a>
          </div>
          <p className="jd-description">{jobDescription}</p>
          <h2 className="jd-section-heading">Skills</h2>
          <ul className="skills-list">
            {skills &&
              skills.map(skill => (
                <li key={skill.name} className="skill-item">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-img"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
          </ul>
          <h2 className="jd-section-heading">Life at Company</h2>
          <div className="life-at-company">
            <p className="lac-description">
              {lifeAtCompany && lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany && lifeAtCompany.imageUrl}
              alt="life at company"
              className="lac-img"
            />
          </div>
        </div>
        <h2 className="similar-jobs-heading">Similar Jobs</h2>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <SimilarJobItem key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jd-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <div className="jd-page">
        <Header />
        <div className="jd-container">
          {apiStatus === apiStatusConstants.inProgress && (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )}
          {apiStatus === apiStatusConstants.success && this.renderJobDetails()}
          {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
