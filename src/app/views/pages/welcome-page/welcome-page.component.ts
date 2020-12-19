import { Component, OnInit } from '@angular/core';
import {TravelService} from '@app/services/travel.service';
import {Position} from '@app/models/Position';
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Overlay} from 'ol';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {fromLonLat, transform} from 'ol/proj';
import {Travel} from '@app/models/Travel';
import {PositionMultiple} from '@app/models/PositionMultiple';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  travels;
  config ;
  city;
  test;
  map;
  view;
  img;
  vector;
  geolocation;
  positionFeature;
  accuracyFeature;
  sourceVector;
  autrePosition;
  position = new Position();
  positionMultiple = new PositionMultiple();
  constructor(private travelService: TravelService) { }

  ngOnInit(): void {
    this.travels = this.travelService.getTravels();
    // this.travels =this.travelService.getTravels().subscribe(
    // (travels : Travel[]) =>{
    //   this.travels=  travels;
    //   console.log("travelssssss-----", this.travels)
    // }
    // );
    this.initializeMap();
  }
  initializeMap(): void {
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.view = new View({
      center: [0 , 0],
      zoom: 2,
      maxZoom: 19,
    });

    this.map = new Map({
      overlays: [overlay],
      target: 'carte',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: this.view
    });
    // Geolocation
   this.geolocation = new Geolocation({
      tracking: true,
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: this.view.getProjection() // Important : Projection de la carte
    });

    // update the HTML page when the position changes.
    this.geolocation.on('change', () => {
      console.log('changed loc');
    });

    // handle geolocation error.
    this.geolocation.on('error', (error) => {
      console.error(error.message);
    });
    this.accuracyFeature = new Feature();
    this.geolocation.on('change:accuracyGeometry', () => {
      this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
    });

    this.positionFeature = new Feature();
    this.positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
        // image: new Icon({
        //   anchor: [0.5, 0.96],
        //   crossOrigin: 'anonymous',
        //   src: '.',
        //   img: img,
        //   imgSize: img ? [img.width, img.height] : undefined,
        // }),
      })
    );

    this.geolocation.on('change:position', () => {
      console.log('change:position');
      this.position = new Position(this.geolocation);
      // console.log("-------geo",this.geolocation.getPosition());
      const coordinates = this.position.coordinates;
      this.positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });

    this.sourceVector = new VectorSource({
      features: [this.accuracyFeature, this.positionFeature],
    });

    this.vector = new VectorLayer({
      map: this.map,
      source: this.sourceVector,
    });
    // Zoom sur l'emprise du vecteur
    this.sourceVector.once('change', (evt) => {
      // On vérifie que la source du vecteur sont chargés
      if (this.sourceVector.getState() === 'ready') {
        // On vérifie que le veteur contient au moins un objet géographique
        if (this.sourceVector.getFeatures().length > 0) {
          // On adapte la vue de la carte à l'emprise du vecteur
          this.map.getView().fit(this.sourceVector.getExtent(), this.map.getSize());
        }
      }
    });

    // pointermove
    this.map.on('singleclick', function (evt: any) {
      const coordinate = evt.coordinate;
      const hdms = transform(coordinate, 'EPSG:3857', 'EPSG:4326');
      content.innerHTML = '<p> Les coordonnées actuelles sont :</p><code>' + hdms +
        '</code>';
      overlay.setPosition(coordinate);
    });
    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

  }

  onSelect(e){
    this.sourceVector.clear();
    this.positionMultiple = e.target.value.split("#", 2);
    const lon : number = this.positionMultiple[0];
    const lat : number = this.positionMultiple[1];
    this.autrePosition = new Feature({

      geometry: new Point(fromLonLat([lon, lat])),
    });
    this.autrePosition.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),

      })
    );
    this.sourceVector = new VectorSource({
      features: [this.accuracyFeature, this.positionFeature, this.autrePosition],
    });

    this.vector = new VectorLayer({
      map: this.map,
      source: this.sourceVector,
    });
  console.log("travel ", e.target.value);

  }
}
