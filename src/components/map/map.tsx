import React, { useEffect } from 'react';
import {Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {Offer, City} from '../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedPoint: Offer | undefined;
}

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedPoint} = props;
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude]);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.map((e) => e.city).forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude,
        });

        marker
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
