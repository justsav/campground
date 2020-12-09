import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '500px',
  height: '460px'
};

export class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    }
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
  
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log(this.state.selectedPlace.id)
    console.log(this.props)
    return (
        <Map className='google' google={this.props.google} zoom={17.5} 
        style={mapStyles}
          initialCenter={{ lat: 39.4338394, lng: -89.8962814 }} >
            {this.props.campsites.map(campsite => (
              <Marker
                onClick={this.onMarkerClick}
                id={campsite.id}
                position={{ lat: campsite.lat, lng: campsite.lng }}
                name={campsite.name}
                description={campsite.description}
              />
            ))}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
              <div>
                <strong><h3>{this.state.selectedPlace.name}</h3></strong>
                <p>{this.state.selectedPlace.description}</p>
                <strong><p>Please return to the list to choose and reserve this campsite.</p></strong>
              </div>
            </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);