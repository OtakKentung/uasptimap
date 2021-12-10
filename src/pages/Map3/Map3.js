import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';

function Map3() {
    const MapEl = useRef(null);

    useEffect(
        () => {
            let view;
            let track;

            loadModules(["esri/config", "esri/views/MapView", "esri/WebMap", "esri/widgets/Track", "esri/Graphic", "esri/rest/locator"], {
                css: true
            }).then(([esriConfig, MapView, WebMap, Track, Graphic, locator]) => {
                esriConfig.apiKey = "AAPK646fc7baa89c4b608eb58b54dbbbe1066JR7fGrtnfyFPoTQnl4Z7yp0rUqUJMjQUrurVPBVnBAt75VOFZL-g-La4SwrdiZf";

                const map = new WebMap({
                    basemap: 'arcgis-imagery'
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

                const places = ["Choose a place type...", "Parks and Outdoors", "Coffee shop", "Gas station", "Food", "Hotel"];
                const select = document.createElement("select", "");
                select.setAttribute("class", "esri-widget esri-select");
                select.setAttribute("style", "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em");

                places.forEach(function (p) {
                    const option = document.createElement("option");
                    option.value = p;
                    option.innerHTML = p;
                    select.appendChild(option);
                });

                view.ui.add(select, "top-right");

                const locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
                function findPlaces(category, pt) {
                    locator.addressToLocations(locatorUrl, {
                        location: pt,
                        categories: [category],
                        maxLocations: 25,
                        outFields: ["Place_addr", "PlaceName"]
                    })

                        .then(function (results) {
                            view.popup.close();
                            view.graphics.removeAll();

                            results.forEach(function (result) {
                                view.graphics.add(
                                    new Graphic({
                                        attributes: result.attributes,  // Data attributes returned
                                        geometry: result.location, // Point returned
                                        symbol: {
                                            type: "simple-marker",
                                            color: "#000000",
                                            size: "12px",
                                            outline: {
                                                color: "#ffffff",
                                                width: "2px"
                                            }
                                        },

                                        popupTemplate: {
                                            title: "{PlaceName}", // Data attribute names
                                            content: "{Place_addr}"
                                        }
                                    }));
                            });

                        });

                }
                view.watch("stationary", function (val) {
                    if (val) {
                        findPlaces(select.value, view.center);
                    }
                });

                select.addEventListener('change', function (event) {
                    findPlaces(event.target.value, view.center);
                });
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
        <div className="App" id="MapEl">
            <div style={{ height: 578.5 }} ref={MapEl}></div>
        </div>
    )
}
export default Map3;