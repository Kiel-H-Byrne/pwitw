import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, MarkerClusterer,InfoWindow } from '@react-google-maps/api'
import { connect } from "react-redux";
import {distanceInWords} from "date-fns"
import m1 from "./images/m1.png";
import m2 from "./images/m2.png";
import m3 from "./images/m3.png";
import m4 from "./images/m4.png";
import m5 from "./images/m5.png";
import markerPin from "./images/pin-red.png";
import * as ACTIONS from "./../../actions/actionConstants";

import MyMarker from './myMarker'
import StatsList from './StatsList'
import CenterButton from './CenterButton'

// import { getAllWorkstations } from "./../../actions/actionConstants"
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const clusterStyles= [
  {
    url: m1,
    height: 53,
    width: 53,
    anchor: [26, 26],
    textColor: '#000',
    textSize: 11
  }, {
    url: m2,
    height: 56,
    width: 56,
    anchor: [28, 28],
    textColor: '#000',
    textSize: 11
  }, {
    url: m3,
    height: 66,
    width: 66,
    anchor: [33, 33],
    textColor: '#000',
    textSize: 11
  }, {
    url: m4,
    height: 78,
    width: 78,
    anchor: [39, 39],
    textColor: '#000',
    textSize: 11
  }, {
    url: m5,
    height: 90,
    width: 90,
    anchor: [45, 45],
    textColor: '#000',
    textSize: 11
  }
]
const StationWindow = (props) => {
  let {data, position, marker} = props;
  let loc = position.split(',');
  let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
  let isHome = (data.ip_local.split('.')[1] === "117")
  return ( 
    <InfoWindow
      position={locObj}
      options={{
        pixelOffset: {height:-30,width:0}
      }}
      >
      <div className="App-infowindow">
        <h3>{data.hostname}</h3>
        <p>{isHome ? '@Home' : data.ip_public}<br />
        Last Connection: {distanceInWords(new Date(data._changed), new Date())}</p>
      </div>
    </InfoWindow>
    )
  }

class FullMap extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    center: {
      "lat": 38.9065495,
      "lng": -77.0518192
    },
    zoom: 5,
    options: {
      clickableIcons: false,
      disableDefaultUI: false,
      fullscreenControl: false,  
      mapTypeControl: false,
      scaleControl: false,
      rotateControl: true,
      streetViewControl: false,
      gestureHandling: "cooperative",
      scrollwheel: true,
      // Map styles; snippets from 'Snazzy Maps'.
      styles: [
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 30
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000"
                  },
                  {
                      "lightness": 10
                  }
              ]
          },{
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#fff"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 25
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 50
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          }]
    }
  };

  componentDidMount() {
    //calls from db and stores in state.stations
    this.props.getAllWorkstations();
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.props.setBrowserLocation({
          lat: coords.latitude,
          lng: coords.longitude
        })
      })
    }
  }
  
  handleMouseOverCluster = (cluster) => {
    this.setState({
      showInfoWindows: true
    })
  }


  render() {
    let { center, zoom, options } = this.props
    const { getInfoWindow, mapLoaded, markerData, PCs, GMap, browserLoc } = this.props;
    const { handleMouseOverCluster} = this;
    return (
      // Important! Always set the container height explicitly
      //set via app-map classname
      <div>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCa7QqTqLMM66gRtaW9KPFPdfkXgFAG8pA"
        language="en"
        region="us" >
        <GoogleMap
          onLoad={map => {
            const bounds = new window.google.maps.LatLngBounds();
            mapLoaded(map)
          }}
          mapContainerClassName="App-map"
          center={browserLoc || center}
          zoom={zoom}
          options={options}
        >{
          PCs && (<div>
            {
              // showInfoWindow && markerData && (<StationWindow position={markerData.location} stations={[markerData]}/>)
          }
            <MarkerClusterer 
            imagePath={`localhost:3000/images/m`} 
            styles={clusterStyles}
            >{
              (clusterer) => PCs.map((ws) => {
                  return ws.location && <MyMarker key={ws._id} data={ws} clusterer={clusterer}/>
                  })
              }</MarkerClusterer>
              {markerData && (<StationWindow position={markerData.location} data={markerData}/>)}
              </div> )
            }</GoogleMap>
      </LoadScript>
      <StatsList data={PCs} />
      </div>
    );
  }
}

FullMap.propTypes = {
  // hoverKey: PropTypes.string
}
//Redux
function mapStateToProps(state) {
  return {
    state,
    PCs: state.stations.all,
    GMap: state.map.Gmap,
    browserLoc: state.map.browserLoc,
    markerData: state.map.showInfoWindow

  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST }),
    mapLoaded: (map) => dispatch({ type: ACTIONS.MAP_LOADED, payload: map }),
    setBrowserLocation: (loc) => dispatch({type:ACTIONS.SET_BROWSER_LOCATION, payload: loc}) 
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMap);
