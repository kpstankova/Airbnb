import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
// import "mapbox-gl.css"
import getCenter from 'geolib/es/getCenter';
import { MapComponentProps, MapCoordinates } from './map.types';
import { HousingItem } from '../../pages/search/searchPage.types';

const MapComponent: React.FC<MapComponentProps> = ({ ...props }) => {
    const { searchResults } = props;

    const coordinates: MapCoordinates[] = searchResults.map((item: any) => ({
        longitude: item.long,
        latitude: item.lat
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        // longitude: center.longitude ? center.longitude : false,
        // latitude: center.latitude,
        zoom: 11

    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/kpstankova/ckztqqe0x002q14q6nlybgxn6"
            mapboxAccessToken="pk.eyJ1Ijoia3BzdGFua292YSIsImEiOiJja3p0cndodHcwazhnMndsNmZsdTl5MW9uIn0.699we1QmiUaqYGIhGYeMQQ"
            {...viewport}
            // updateTransitions={(nextViewport: any) => setViewport(nextViewport)}
            scrollZoom={true}
        >

        </ReactMapGL>
    )
}

export default MapComponent;