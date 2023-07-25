// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {imgUrl, name, starsCount, forksCount, issuesCount} = itemDetails
  return (
    <li className="repo-list-container">
      <img className="image-logo" alt={name} src={imgUrl} />
      <h1 className="name">{name}</h1>
      <div className="stars-container">
        <img
          className="logo-icon"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
        />
        <p className="stars-text">{starsCount} stars</p>
      </div>
      <div className="stars-container">
        <img
          className="logo-icon"
          alt="forks"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
        />
        <p className="stars-text">{forksCount} forks</p>
      </div>
      <div className="stars-container">
        <img
          className="logo-icon"
          alt="open issues"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
        />
        <p className="stars-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
