// import { MapLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import { withLeaflet } from "react-leaflet";

// class Routing extends MapLayer {
//   createLeafletElement() {
//     let leafletElement = L.Routing.control({
//       waypoints: [L.latLng(53.9653947,14.7728556), L.latLng(52.2337172, 21.071432235636493)],
//     })
//     return leafletElement.getPlan();
//   }
// }
// export default withLeaflet(Routing);

import { useEffect } from "react";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import L from "leaflet";

const RoutingMachine = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      createMarker: function () {
        return null;
      },
      waypoints: [
        L.latLng(53.9653947, 14.7728556),
        L.latLng(52.2337172, 21.071432235636493),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
};

export default RoutingMachine;
