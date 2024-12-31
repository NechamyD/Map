import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
// import { useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // optional shadow for the icon
    shadowSize: [41, 41], // size of the shadow
});
export const Map = () => {
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })
        return position === null ? null : (
            <Marker position={position} icon={markerIcon}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    return (
        <MapContainer
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    )

    // return (<MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
    //     <TileLayer
    //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    //     <Marker position={position} icon={markerIcon}>
    //         <Popup>
    //             {/* A pretty CSS3 popup. <br /> Easily customizable. */}
    //         </Popup>
    //     </Marker>
    // </MapContainer>)
}
