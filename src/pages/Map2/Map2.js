import React, { useRef, useEffect } from 'react';
// import 'https://js.arcgis.com/4.21/';
// import 'https://js.arcgis.com/4.21/esri/themes/light/main.css';
import './Map2.css';
import { loadModules } from 'esri-loader';

function Map2() {
  const viewDiv = useRef(null);
  loadModules(["esri/Map",
    "esri/views/MapView",
    "esri/widgets/Directions",
    "esri/config",
    "esri/widgets/Track", "esri/Graphic"], {
    css: true
  }).then(([Map, MapView, Directions, esriConfig, Track, Graphic]) => {
    esriConfig.apiKey = "AAPK646fc7baa89c4b608eb58b54dbbbe1066JR7fGrtnfyFPoTQnl4Z7yp0rUqUJMjQUrurVPBVnBAt75VOFZL-g-La4SwrdiZf";

    const map = new Map({
      basemap: "arcgis-topographic"
    });

    const view = new MapView({
      zoom: 16,
      center: [106.6182, -6.2567],
      container: "viewDiv",
      map: map
    });

    let directionsWidget = new Directions({
      view: view
    });

    view.ui.add(directionsWidget, {
      position: "top-right"
    });

    const
      track = new Track({
        view: view,
        graphic: new Graphic({
          symbol: {
            type: "simple-marker",
            size: "12px",
            color: "green",
            outline: {
              color: "#efefef",
              width: "1.5px"
            }
          }
        }),
        useHeadingEnabled: false
      });

    view.ui.add(track, "top-left");
  });
  return (
    <div style={{ height: 800 }} ref={viewDiv}></div>
  );
}
export default Map2;