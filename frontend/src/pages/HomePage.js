import React, { Component } from 'react'

class HomePage extends Component {

  render() {
    return (
      <div className='col-4 result-controls'>
        <form>
        <label>Check-in Date:</label>
        <br/>
        <input type="date" id="start_date" name="start_date" onChange={this.props.handleInputChange} value={this.props.start_date}/>
        <br/>
        <label>Check-out Date:</label>
        <br/>
        <input type="date" id="end_date" name="end_date" onChange={this.props.handleInputChange} value={this.props.end_date}/>
        <br/>
        <br/>
        <label>Power and Water:</label>
        <br/>
        <select id="powerwater" value={this.props.powerwater} onChange={this.props.handleInputChange}>
          <option value=""> --</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br/>
        <label>Tent or Camper:</label>
        <br/>
        <select id="max_camper_length" value={this.props.max_camper_length} onChange={this.props.handleInputChange}>
          <option value=""> --</option>
          <option value="0">Tent</option>
          <option value="12">Camper under 12 ft</option>
          <option value="24">Camper 12-24 ft</option>
          <option value="38">Camper 24-38 ft</option>
        </select>
        <br/>
        <label>Access Type:</label>
        <br/>
        <select id="access" value={this.props.access} onChange={this.props.handleInputChange}>
          <option value=""> --</option>
          <option value="backin">Back-In</option>
          <option value="pullthrough">Pull-Through</option>
        </select>
        </form>
        <br/>
        { this.props.step === 1 ? <button className="btn btn-primary" onClick={() => this.props.toggleMap()}>{this.props.mapToggle ? 'Show List' : 'Show Map'}</button> : <div></div> }
      </div>
    )
  }
}

export default HomePage