import React, { useEffect } from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import { MapClassify } from '../constants/classes';
import {Offer} from '../types/offer';
import 'leaflet/dist/leaflet.css';

const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  offers: Offer[];
  activeCard: number;
  isMainScreen: boolean;
}

function Map(props: MapProps): JSX.Element {
  const {offers, activeCard, isMainScreen} = props;
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, offers[0].city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer: Offer) => {
        const marker = new Marker({
          lat: offer.city.latitude,
          lng: offer.city.longitude,
        });

        marker
          .setIcon(
            activeCard !== undefined && offer.id === activeCard.toString()
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);

  return <section className={isMainScreen ? MapClassify.MainMapChapter : MapClassify.PropertyMapChapter} ref={mapRef}></section>;
}

export default Map;
