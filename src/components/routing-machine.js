import { useEffect } from "react";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

const RoutingMachine = () => {
  const startingPointCoordinates = useSelector(
    (state) => state.coordinates.startingPointCoordinates
  );
  const destinationPointCoordinates = useSelector(
    (state) => state.coordinates.destinationPointCoordinates
  );
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      createMarker: function () {
        return null;
      },
      waypoints: [
        L.latLng(startingPointCoordinates[0], startingPointCoordinates[1]),
        L.latLng(
          destinationPointCoordinates[0],
          destinationPointCoordinates[1]
        ),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, startingPointCoordinates, destinationPointCoordinates]);

  return null;
};

export default RoutingMachine;
