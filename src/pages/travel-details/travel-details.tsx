// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   Polyline,
// } from "react-leaflet";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// const TravelDetails = () => {
//   const startingPointCoordinates = useSelector(
//     (state: RootState) => state.coordinates.startingPointCoordinates
//   );
//   const destinationPointCoordinates = useSelector(
//     (state: RootState) => state.coordinates.destinationPointCoordinates
//   );
//   const polyline = [startingPointCoordinates, destinationPointCoordinates];
//   console.log(startingPointCoordinates, destinationPointCoordinates);
//   const fillBlueOptions = { fillColor: "blue" };
//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
//       <Polyline
//         pathOptions={fillBlueOptions}
//         positions={[
//           [53.9653947, 14.7728556],
//           [52.2337172, 21.071432235636493],
//         ]}
//       />
//     </MapContainer>
//   );
// };

// export default TravelDetails;

// import React, { Component } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import RoutingMachine from "../../hoc/routing-machine";

const TravelDetails = () => {
  // const position = [this.state.lat, this.state.lng];
  //   const [map, setMap] = useState(false);

  // center={[51.505, -0.09]}
  return (
    <MapContainer zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={[53.9653947, 14.7728556]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <RoutingMachine />
    </MapContainer>
  );
};

export default TravelDetails;
