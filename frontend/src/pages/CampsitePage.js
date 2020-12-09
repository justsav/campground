import React, { Component } from 'react'

class CampsitePage extends Component {

  render() {
    const campsite = this.props.campsite
    // console.log(this.props)
    return (
      <div className='campsite-detail'>
        <img 
        src={campsite['image_url']}
        alt="new"
        />
        <h3>{campsite['name']}</h3>
        <p> {campsite['description']}</p> 
        <br/>
        <p><strong>Cost Per Night: </strong> ${campsite['cost_per_night']}</p>
        <p><strong>Power & Water: </strong> { (campsite['powerwater'] === true) ? <span>Yes</span> : <span>None</span> }</p>
        <p><strong>Access: </strong> { (campsite['access'] === 'pullthrough') ? <span>Pull-Through (for Larger Vehicles)</span> : <span>Standard (Back-In Access)</span>}</p>
        { (campsite['max_camper_length'] > 0) ? <p><strong>Max Length for RV's and Trailers: </strong><span>{ campsite['max_camper_length'] } feet</span></p> : <div/> }
        <br/>
        <div className='res-button'>
        <button type="button" className="btn btn-secondary" onClick={() => this.props.setStep(1)}>
          Back to Search
        </button>
        <button type="button" className="btn btn-success" onClick={() => this.props.setStep(3)}>
          Make Reservation
        </button>
        </div>
      </div>
    )
  }
}

export default CampsitePage