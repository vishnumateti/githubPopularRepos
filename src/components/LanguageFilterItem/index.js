// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {dataDetails, updateLanguageItems, isActive} = props
  const {id, language} = dataDetails

  const changeLanguage = () => {
    updateLanguageItems(id)
  }

  const buttonClassName = isActive ? 'active-button' : 'buttons'

  return (
    <li className="list-container">
      <button
        className={buttonClassName}
        onClick={changeLanguage}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
