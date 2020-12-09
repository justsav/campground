import React, { Component } from 'react'
import './App.css'
import HomePage from './pages/HomePage.js'
import CampsitePage from './pages/CampsitePage.js'
import ReservationForm from './components/ReservationForm/ReservationForm.js'
import ResultsTable from './components/ResultsTable/ResultsTable.js'
import MapContainer from './components/MapContainer/MapContainer.js'
import moment from 'moment'
import CampsiteAPI from './api/CampsiteAPI.js'

class App extends Component {
  constructor(props){
    super(props)
    this.mapContainer = React.createRef();
    this.state = {
      step: 0,
      campsites: [],
      filtered_campsites: [],
      access: "",
      powerwater: "",
      max_camper_size: "",
      start_date: "",
      end_date: "",
      res_dates: [],
      campsite: {},
      res_campsite: "",
      first_name: '',
      last_name: '',
      street_address: '',
      city: '',
      state: '',
      zipcode: '',
      email: '',
      lng: -89.896,
      lat: 39.433979,
      zoom: 16.5,
      mapToggle: false,
      avg_day_temp: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.filterCampsites = this.filterCampsites.bind(this);
    this.buildResDates = this.buildResDates.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chooseCampsite = this.chooseCampsite.bind(this);
    this.setStep = this.setStep.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    }
    
    buildResDates(start, stop) {
      var result = [];
      var currentDate = moment(start);
      var stopDate = moment(stop);
      while (currentDate <= stopDate) {
          result.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
      }
      this.setState({
        res_dates: result,
      });
      return result
    }
  
    filterCampsites() {
      let result = this.state.campsites
      if (this.state.access && this.state.start_date && this.state.end_date) {
        result = result.filter(element => element.access === this.state.access);
        if (this.state.step === 0) {
          this.setStep(1)
        }
      }
      if (this.state.powerwater && this.state.start_date && this.state.end_date) {      
        result = result.filter(element => element.powerwater === this.state.powerwater);
        if (this.state.step === 0) {
          this.setStep(1)
        }
      }
      if (this.state.max_camper_length && this.state.start_date && this.state.end_date) {      
        result = result.filter(element => element.max_camper_length >= this.state.max_camper_length);
        if (this.state.step === 0) {
          this.setStep(1)
        }
      }
      if (this.state.start_date && this.state.end_date) {
        let datesMatch = []
        if (this.state.step === 0) {
          this.setStep(1)
        }
        for (let j = 0; j < result.length; j++) {
          let resDates = this.buildResDates(this.state.start_date, this.state.end_date) // range of all chosen dates
          const campsite_dates = JSON.parse(result[j].availability) // an individual campsite's availability
          let campsite_available = true
          for (let i = 0; i < resDates.length - 1; i++) {
            if (campsite_dates[resDates[i]] === 0) { // for each desired user date in the range, is any availability date 'zero' for each campsite
              campsite_available = false // if so, availability for this campsite ('j' in the for loop), set to FALSE
            }
          }
          if (campsite_available === true) {
            datesMatch.push(result[j])
          }
        }
        result = datesMatch;
      }
      this.setState({
        filtered_campsites: result,
      });
    }
  
    handleInputChange(event) {
      // console.log(event)
      const target = event.target;
      let value = target.value;
      const name = target.id;
      this.setState({
        [name]: value,
      }, () => {
      this.filterCampsites()
      })
    }

    handleFormChange = (event) => {
      // console.log(event.target)
      const target = event.target;
      const name = target.id;
      const value = target.value;
      this.setState({
        [name]: value,
      })
    }
  
    chooseCampsite = (id) => {
      CampsiteAPI.fetchCampsiteByID(id)
      .then((target) => this.setState({
        campsite: target,
      }))
      this.setStep(2)
      // Uncomment this for demo
      this.weatherAPI()
      console.log('Chose Campsite!')
    }

    setStep = (step) => {
      let filter = this.state.start_date 
      this.setState({
        step: step,
        start_date: filter,
      })
    }

    toggleMap = () => {
      this.setState(state => ({
        mapToggle: !state.mapToggle
        // step: 1,
      }))
    }

    handleSubmit = async (event) => {
      event.preventDefault();
      let num_nights = this.state.res_dates.length - 1
      let c_total = num_nights * this.state.campsite.cost_per_night
      let data = {
        'campsite':this.state.campsite.id,
        'status':'pending',
        'start_date':this.state.start_date,
        'end_date':this.state.end_date,
        'date_range':this.state.res_dates,
        'cost_total':c_total,
        'first_name':this.state.first_name,
        'last_name':this.state.last_name,
        'street_address':this.state.street_address,
        'city':this.state.city,
        'state':this.state.state,
        'zipcode':this.state.zipcode,
        'email':this.state.email,
      }
      console.log(data)
      return fetch('http://localhost:8000/campground/reservations/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(this.setStep(4))
        // .then(() => this.updateCampsiteDates())
      }

    // updateCampsiteDates = () => {
    //   // function modifies chosen campsite's availability dates, and returns adjusted availability string for post
    //   let site = this.state.campsite
    //   console.log(site)
    //   let old_dates = JSON.parse(site.availability)
    //   console.log(old_dates)
    //   let res_dates = this.state.res_dates
    //   for (let i = 0; i < res_dates.length - 1; i++) {
    //       old_dates[res_dates[i]] = 0
    //   }
    //   let new_dates = old_dates
    //   console.log(new_dates)
    //   // New Availability Has Been Generated, Now Reconstruct the Edit Request
    //   let data = {
    //     'powerwater':site.powerwater,
    //     'access':site.access,
    //     'max_camper_length':site.max_camper_length,
    //     'availability':new_dates,
    //     'cost_per_night':site.cost_per_night,
    //     'image_url':site.image_url,
    //     'name':site.name,
    //     'description':site.description,
    //     'lat':site.lat,
    //     'lng':site.lng,
    //   }
    //   console.log(JSON.stringify(data))
    //   let url = 'http://localhost:8000/campground/campsites/' + site.id + '/edit'
    //   return fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Accept' : 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({test: 1, test_bravo: 2})
    //     }).then(res=>res.json())
    //     .then(res => console.log(res));
    //   }

      weatherAPI = () => {
        let key = process.env.REACT_APP_WEATHER_API_KEY
        let datestring = this.state.start_date
        let lastyear = parseInt(datestring.slice(0,4)) - 1
        let monthday = datestring.slice(4,10)
        let checkdate = lastyear.toString() + monthday
        let url = 'https://api.meteostat.net/v1/history/daily?station=72439&start=' + checkdate + '&end=' + checkdate + '&key=' + key
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((newdata) => {
            this.convertTemperature(newdata.data[0]['temperature'])
          });
      }

      convertTemperature = (data) => {
        let cTemp = data; 
        let cToFahr = cTemp * 9 / 5 + 32; 
        let avgDayTempF = Math.round(cToFahr) 
        this.setState({
          avg_day_temp: avgDayTempF,
        });
      }

      componentDidMount()   {
        CampsiteAPI.fetchCampsites()
          .then((apiResponseJSON) => {
            this.setState({
              campsites: apiResponseJSON.campsites,
              filtered_campsites: apiResponseJSON.campsites,
            })
          })
      }

  render() {
    const step = this.state.step;
    const mapToggle = this.state.mapToggle;
    return (
      <div>
         <div className="header">
          <div className='navbar-container'>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="http://localhost:3000/">
                  <strong>Otter Lake Overnight Camping Reservations</strong>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
        <div className="content-container">
          <div className="row content">
            {step === 0 || step === 1 ? (
              <HomePage
                buildResDates={this.buildResDates}
                filterCampsites={this.filterCampsites}
                handleInputChange={this.handleInputChange}
                toggleMap={this.toggleMap}
                step={this.state.step}
                mapToggle={this.state.mapToggle}
              />
            ) : step === 2 ? (
              <CampsitePage
                setStep={this.setStep}
                campsite={this.state.campsite}
              />
            ) : step === 3 ? (
              <div>
              <ReservationForm
                handleSubmit={this.handleSubmit}
                handleFormChange={this.handleFormChange}
                chooseCampsite={this.chooseCampsite}
                campsite={this.state.campsite}
                res_info={this.state}
                temp={this.state.avg_day_temp}
              />
              </div>
            ) : step === 4 ? (
              <div>
                <h1>Thanks for your Reservation</h1>
                <strong>Check your email for a reservation confirmation, and pay on arrival or by calling (217) 627-2416.</strong>
                <br/>
                <br/>
                <h3>We'll see you at Otter Lake on {this.state.start_date}</h3>
                <br/>
                <p><strong>SOME OVERNIGHT CAMPING RULES & REGULATIONS</strong></p>
                <ul>
                  <li>All campers must register in the park office prior to entering the campground area.</li>
                  <li>Check-In: after 2:00 pm - Check-Out: before 12:00 noon (A drivers license and signature will be required at me
of Check-in). Quiet Hours: 11:00 pm to 7:00 am.</li>
                  <li>All camping /reservaon fees must be paid in advance. No credit for early check-outs and no refunds or transfers
will be allowed.</li>
                  <li>Permit applicants must be at least 21 years of age. Idenficaon required. Permit holders are responsible for the
conduct and behavior of everyone at their campsite. Permit holders are also responsible for any damages incurred
by campsite occupants.</li>
                  <li>Maximum capacity per campsite: 8 persons with no more than 4 adults. (Adults - 18 years or older). One approved
camper and one addional unit (tent/pop-up) or two tents/pop-ups allowed. Maximum of two units per campsite.</li>
                  <li>No more than two motor vehicles may be parked at any site. Addional parking may be available with approval of
manager.</li>
                  <li>All pets must be leashed at all mes and never le? una!ended. Two pet maximum per campsite. Pet owners are
responsible for picking up a?er their pets.</li>
                </ul>
                <br/>
                <button className='btn btn-primary back-home' onClick={() => this.setStep(0)}>Return Home</button>
              </div>
            ) : (
              <div></div>
            )
            }
            {step === 0 ? (
              <div className="col-8 welcome">
                <h1>Welcome to Camping at Otter Lake</h1>
                <h4>ONLINE RESERVATION SYSTEM</h4>
                <p><strong>Begin searching for your ideal campsite with the menu to the left.</strong>  First, choose your desired camping dates and then choose amenities that meet your needs.  Reservations can also be made by calling the Otter Lake Park Office & Bait Shop at (217) 627-2416 between March 1st and November 30th.</p>
                <img src="https://i.imgur.com/kqoFAY0.jpg" alt="Lake at Sunset"></img>
              </div>
              ) : <div></div>
            }
            { mapToggle === true ? (
              <div id='map-container' className='col-8'>
                <MapContainer chooseCampsite={this.chooseCampsite} campsites={this.state.filtered_campsites} />
              </div>
              ) : <div></div>
            }
            { step === 1 && mapToggle === false ? (
              <div className="col-8 results-table">
                <ResultsTable
                  chooseCampsite={this.chooseCampsite}
                  filtered={this.state.filtered_campsites}
                />
              </div>
              ) : <div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App