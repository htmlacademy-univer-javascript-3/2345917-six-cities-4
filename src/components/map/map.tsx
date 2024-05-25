import React, { useEffect } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {Offer, City} from '../types/offer';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/index';

type MapProps = {
  city: City;
  offers: Offer[];
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
  const {city, offers} = props;
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude], city.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer: Offer) => {
        const marker = new Marker({
          lat: offer.city.latitude,
          lng: offer.city.longitude,
        });

        marker
          .setIcon(selectedPoint === offer.city ? activeIcon : defaultIcon)
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
