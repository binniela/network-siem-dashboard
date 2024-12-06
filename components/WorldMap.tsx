import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
(L.Icon.Default.prototype as any)._getIconUrl = null;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface GeoData {
  ip: string;
  lat: number;
  lon: number;
  city: string;
  country: string;
  value: number;
}

interface WorldMapProps {
  geoData: GeoData[];
}

function WorldMap({ geoData }: WorldMapProps) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoData.map((location) => (
        <Marker key={location.ip} position={[location.lat, location.lon]}>
          <Popup>
            IP: {location.ip}<br />
            City: {location.city}<br />
            Country: {location.country}<br />
            Value: {location.value}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default WorldMap;
