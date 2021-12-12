import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';


function Map1() {
  const viewDiv = useRef(null);

  useEffect(
    () => {
      let view;
      loadModules(["esri/config", "esri/Map", "esri/views/SceneView", "esri/layers/ElevationLayer", "esri/layers/BaseElevationLayer", "esri/Basemap", "esri/layers/TileLayer"], {
        css: true
      }).then(([esriConfig, Map, SceneView, ElevationLayer, BaseElevationLayer, Basemap, TileLayer]) => {
        esriConfig.apiKey = "AAPK646fc7baa89c4b608eb58b54dbbbe1066JR7fGrtnfyFPoTQnl4Z7yp0rUqUJMjQUrurVPBVnBAt75VOFZL-g-La4SwrdiZf";

        const basemap = new Basemap({
          baseLayers: [
            new TileLayer({
              url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/terrain_with_heavy_bathymetry/MapServer",
              copyright: "Bathymetry, topography and satellite imagery from <a href=\"https://visibleearth.nasa.gov/view_cat.php?categoryID=1484\" target=\"_blank\">NASA Visible Earth</a> | <a href=\"http://www.aag.org/global_ecosystems\" target=\"_blank\">World Ecological Land Units, AAG</a> | Oceans, glaciers and water bodies from <a href=\"https://www.naturalearthdata.com/\" target=\"_blank\">Natural Earth</a>"
            })
          ]
        });


        const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({

          properties: {
            exaggeration: null
          },

          // The load() method is called when the layer is added to the map
          // prior to it being rendered in the view.
          load: function () {
            this._elevation = new ElevationLayer({
              url:
                "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/TopoBathy3D/ImageServer"
            });

            // wait for the elevation layer to load before resolving load()
            this.addResolvingPromise(this._elevation.load());
          },

          // Fetches the tile(s) visible in the view
          fetchTile: function (level, row, col, options) {
            // calls fetchTile() on the elevationlayer for the tiles
            // visible in the view
            return this._elevation.fetchTile(level, row, col, options).then(
              function (data) {
                var exaggeration = this.exaggeration;
                // `data` is an object that contains the
                // the width and the height of the tile in pixels,
                // and the values of each pixel
                for (var i = 0; i < data.values.length; i++) {
                  // Multiply the given pixel value
                  // by the exaggeration value
                  data.values[i] = data.values[i] * exaggeration;
                }

                return data;
              }.bind(this)
            );
          }
        });

        const elevationLayer = new ExaggeratedElevationLayer({ exaggeration: 70 });

        const map = new Map({
          basemap: basemap,
          ground: {
            layers: [elevationLayer]
          }
        });


        view = new SceneView({
          container: "viewDiv",
          map: map,
          alphaCompositingEnabled: true,
          qualityProfile: "high",
          camera: {
            position: [-55.03975781, 14.94826384, 19921223.30821],
            heading: 2.03,
            tilt: 0.13
          },
          environment: {
            background: {
              type: "color",
              color: [255, 252, 244, 0]
            },
            starsEnabled: false,
            atmosphereEnabled: false,
            lighting: {
              directShadowsEnabled: false,
              date: "Sun Jun 23 2019 19:19:18 GMT+0200 (Central European Summer Time)"
            }
          },
          constraints: {
            altitude: {
              min: 10000000,
              max: 25000000
            }
          },
          popup: {
            dockEnabled: true,
            dockOptions: {
              position: "top-right",
              breakpoint: false,
              buttonEnabled: false
            },
            collapseEnabled: false
          },
          highlightOptions: {
            color: [255, 255, 255],
            haloOpacity: 0.5
          }
        });

        let exaggerated = true;

        document.getElementById("exaggerate").addEventListener("click", function () {
          if (exaggerated) {
            map.ground = "world-elevation";
            this.innerHTML = "Enable exaggeration";
            exaggerated = false;
          } else {
            map.ground = {
              layers: [elevationLayer]
            };
            this.innerHTML = "Disable exaggeration";
            exaggerated = true;
          }
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
    <div className="App">
      <div id="viewDiv">
        <div style={{ height: 543 }} ref={viewDiv}></div>
      </div>
      <div class="buttons">
        <button id="exaggerate" class="esri-button">
          Disable exaggeration
        </button>
      </div>
    </div>
  )
}
export default Map1;