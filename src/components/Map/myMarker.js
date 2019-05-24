import React from 'react';
import PropTypes from 'prop-types';
import { Marker} from '@react-google-maps/api'
import { connect } from "react-redux";
import * as ACTIONS from "./../../actions/actionConstants";

function MyMarker(props) {
  const handleMouseOverMarker = (e, data) => {
    props.showInfoWindow(data)
  }

  const handleMouseExitMarker = () => {
    props.hideInfoWindow();
  }
  let { data, clusterer } = props;
  let loc = data.location.split(',');
  let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}
  let image ={
    url: "https://cdn0.iconfinder.com/data/icons/gloss-basic-icons-by-momentum/32/pin-red.png",
  }

  return (
    <Marker 
      className="App-marker"
      key={data._id}
      position={locObj}
      clusterer={clusterer}
      data={data}
      icon={image}
      title={`${data.hostname}-${data.username}`}
      customData={JSON.stringify(data)}
      onMouseOver={(m) => handleMouseOverMarker(m,data)}
      onMouseOut={() => handleMouseExitMarker()}
    />
  )
  
}

//Redux
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllWorkstations: () => dispatch({ type: ACTIONS.STATIONS_API_REQUEST }),
    showInfoWindow: (data) => dispatch({ type: ACTIONS.SHOW_INFOWINDOW, payload: data }),
    hideInfoWindow: () => dispatch({type: ACTIONS.SHOW_INFOWINDOW, payload: false})
  };
}

export default connect(
  null,
  mapDispatchToProps
)(MyMarker)