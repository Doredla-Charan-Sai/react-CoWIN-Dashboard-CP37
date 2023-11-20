// Write your code here
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, graphList: {}}

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      console.log(formattedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        graphList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  renderSuccess = () => {
    const {graphList} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = graphList
    console.log(vaccinationByAge, vaccinationByGender)
    return (
      <>
        <VaccinationCoverage details={last7DaysVaccination} />
        <VaccinationByGender details={vaccinationByGender} />
        <VaccinationByAge details={vaccinationByAge} />
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-cont">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-txt">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <div className="bg-cont">
        <div className="logo-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </div>
        {apiStatus !== apiStatusConstants.failure && (
          <div>
            <h1 className="main-head">CoWIN Vaccination in India</h1>
          </div>
        )}
        {this.renderCases()}
      </div>
    )
  }
}

export default CowinDashboard
