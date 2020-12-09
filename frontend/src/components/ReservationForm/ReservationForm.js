import React, { Component } from 'react';
// import Autocomplete from '../Autocomplete/Autocomplete'
class ReservationForm extends Component {

  render() {
    const site = this.props.campsite
    const res = this.props.res_info
    const num_nights = res.res_dates.length - 1
    const cost_total = num_nights * site.cost_per_night
    const temp = this.props.temp
    return (
      <div className='res-form'>
      <h2>Reservation Request Form</h2>
      { (site.name) ? <p><strong>{site.name}:</strong> {site.description}</p> : <div/> }
      { (res.start_date && res.end_date) ? <p><strong>Checking in</strong> {res.start_date} and <strong>checking out</strong> {res.end_date}</p> : <div/> }
      { (num_nights > 0) ? <p><strong>{num_nights} night(s)</strong> at ${site.cost_per_night} = <strong>${cost_total} Total</strong></p> : <div/> }
      { (temp) ? <p><strong>FYI:</strong> Average temperature is {temp} for these dates last year.</p> : <div/> }
      <br/>
      <p><strong>Complete the following form to finalize your reservation.</strong></p>
      <p>Online payment will be available soon. For now, pay upon arrival or by calling our offices at (217) 627-2416.</p>
      <p>A confrimation will be sent to the email you provide below.</p>
      <br/>
        <form method="POST" onSubmit={this.props.handleSubmit}>
          <label>First Name</label>
          <input id='first_name' type='text' value={res.first_name} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
          <label>Last Name</label>
          <input id='last_name' type='text' value={res.last_name} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
          <label>Street Address</label>
          <input id='street_address' type='text' value={res.street_address} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
          <label>City</label>
          <input id='city' type='text' value={res.city} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
          <label>State</label>
          <input id='state' type='text' value={res.state} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
          <label>Zip Code</label>
          <input id='zipcode' type='text' value={res.zipcode} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
          <label>Email</label>
          <input id='email' type='text' value={res.email} onChange={this.props.handleFormChange}/>
          <br/>
          <br/>
        <button className='btn btn-success finalize-btn' type='submit' onSubmit={() => this.props.handleSubmit()}>Finalize Reservation</button>
        </form>
      </div>
    );
  } 
}

export default ReservationForm;