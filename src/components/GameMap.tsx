import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGameStore } from '../store/gameStore';
import { europeCountries } from '../data/europeCountries';
import './GameMap.css';

export const GameMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  
  const { claimedCountries, availableBorders, status } = useGameStore();

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map centered on Europe
    const map = L.map(mapRef.current, {
      center: [54, 15],
      zoom: 4,
      minZoom: 3,
      maxZoom: 7,
      zoomControl: true,
    });

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Create layer group for markers
    markersRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when game state changes
  useEffect(() => {
    if (!markersRef.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Add markers for all countries
    europeCountries.forEach(country => {
      const isClaimed = claimedCountries.includes(country.id);
      const isAvailable = availableBorders.includes(country.id);
      
      let markerClass = 'marker-neutral';
      if (isClaimed) {
        markerClass = 'marker-claimed';
      } else if (isAvailable && status === 'playing') {
        markerClass = 'marker-available';
      }

      const icon = L.divIcon({
        className: `country-marker ${markerClass}`,
        html: `<div class="marker-dot"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker(country.coordinates, { icon })
        .bindTooltip(country.name, {
          permanent: false,
          direction: 'top',
          className: 'country-tooltip'
        });

      markersRef.current?.addLayer(marker);
    });
  }, [claimedCountries, availableBorders, status]);

  return (
    <div className="game-map-container">
      <div ref={mapRef} className="game-map" />
      
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot claimed"></span>
          <span>Claimed</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot available"></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot neutral"></span>
          <span>Unclaimed</span>
        </div>
      </div>
    </div>
  );
};
