import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';

function Map() {
    const MapEl = useRef(null);

    useEffect(
        () => {
            let view;
            let track;

            loadModules(["esri/config", "esri/views/MapView", "esri/WebMap", "esri/widgets/Track", "esri/Graphic"], {
                css: true
            }).then(([esriConfig, MapView, WebMap, Track, Graphic]) => {
                esriConfig.apiKey = "AAPK646fc7baa89c4b608eb58b54dbbbe1066JR7fGrtnfyFPoTQnl4Z7yp0rUqUJMjQUrurVPBVnBAt75VOFZL-g-La4SwrdiZf";

                const map = new WebMap({
                    basemap: 'arcgis-topographic'
                })

                view = new MapView({
                    map: map,
                    center: [106.6182, -6.2567], // Longitude, latitude
                    zoom: 16, // Zoom level
                    container: "MapEl" // Div element
                });

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
            })
            return () => {
                //close the map view
                if (!!view) {
                    view.destroy()
                    view = null
                }
            }
        })
    return (
        <div style={{ height: 800 }} ref={MapEl}>

        </div>
    )
}

export default Map