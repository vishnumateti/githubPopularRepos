import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'IN_PROGRESS',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    itemsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  updateLanguageItems = id => {
    this.setState({activeId: id}, this.getData)
  }

  renderSpinner = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoriesSuccessView = () => {
    const {itemsList} = this.state

    return (
      <ul className="repo-items-container">
        {itemsList.map(eachItem => (
          <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderRepositoriesFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="went-wrong-text">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesSuccessView()
      case apiStatusConstants.failure:
        return this.renderRepositoriesFailureView()
      case apiStatusConstants.loading:
        return this.renderSpinner()
      default:
        return null
    }
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {activeId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        imgUrl: each.avatar_url,
        name: each.name,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({
        itemsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular-head">Popular</h1>
        <ul className="tabs-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              key={eachData.id}
              dataDetails={eachData}
              updateLanguageItems={this.updateLanguageItems}
              isActive={eachData.id === activeId}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
