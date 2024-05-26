import React, { useEffect } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City} from '../types/offer';
import { Point } from '../../components/types/point';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/index';

type MapProps = {
  city: City;
  points: Point[];
}

const defaultIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [30, 30]
});

const activeIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [30, 30]
});

function Map(props: MapProps): JSX.Element {
  const selectedPoint = useAppSelector((state) => state.selectedPoint);
  const {city, points} = props;
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);
  const currentUrl = window.location.href;

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(selectedPoint === point ? activeIcon : defaultIcon)
          .addTo(markerLayer);
      });
      if (currentUrl.includes('offer')) {
        const offerMarker = new Marker({
          lat: points.slice(-1)[0].latitude,
          lng: points.slice(-1)[0].longitude
        });
        offerMarker
          .setIcon(activeIcon)
          .addTo(markerLayer);
      }
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, currentUrl]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
