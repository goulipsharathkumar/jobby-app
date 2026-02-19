import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="similar-job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h2 className="similar-description-heading">Description</h2>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-footer">
        <div className="icon-text">
          <MdLocationOn className="job-icon" />
          <p className="job-text">{location}</p>
        </div>
        <div className="icon-text">
          <BsBriefcaseFill className="job-icon" />
          <p className="job-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
