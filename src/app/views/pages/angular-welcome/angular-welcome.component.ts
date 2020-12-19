import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlgoliaService} from '@app/services/algolia.service';
import {UploadService} from '@app/services/upload.service';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Position} from '@app/models/Position';
import {PositionMultiple} from '@app/models/PositionMultiple';
import {Overlay} from 'ol';
import {toStringHDMS} from 'ol/coordinate';
import {toLonLat, transform} from 'ol/proj';
import {TravelService} from '@app/services/travel.service';
import {Travel} from '@app/models/Travel';


@Component({
  selector: 'app-angular-welcome',
  templateUrl: './angular-welcome.component.html',
  styleUrls: ['./angular-welcome.component.scss']
})
export class AngularWelcomeComponent implements OnInit{

  title = 'ouisend-web-app';
  config ;
  city;
  test;
  map;
  view;
  img;
  travels;
  position = new Position();
  positions = new PositionMultiple();
  // set the fileUpload and files variables and inject UploadService
  //@ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files  = [];

  constructor(
    // private  algoliaService: AlgoliaService,
    // private uploadService: UploadService,
    private travelService: TravelService,
    // private autoLogoutService: AutoLogoutService
  ) { }

  ngOnInit(): void {
    // this.config = this.algoliaService.configCity;
    this.travels =this.travelService.getTravels() ;

      // .subscribe(
      // (travels : Travel[]) =>{
      //   this.travels= travels;
      //   console.log("travel-----", this.travels)
      // }
    // );
    // this.test = this.autoLogoutService.val;
    this.initializeMap();
  }

  // Initialisation de la map
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
    const geolocation = new Geolocation({
      tracking: true,
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: this.view.getProjection() // Important : Projection de la carte
    });

    // update the HTML page when the position changes.
    geolocation.on('change', () => {
      console.log('changed loc');
    });

    // handle geolocation error.
    geolocation.on('error', (error) => {
      console.error(error.message);
    });

    const accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', () => {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
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

    geolocation.on('change:position', () => {
      console.log('change:position');
      this.position = new Position(geolocation);
      const coordinates = this.position.coordinates;
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });

    const sourceVector = new VectorSource({
      features: [accuracyFeature, positionFeature],
    });

    const vector = new VectorLayer({
      map: this.map,
      source: sourceVector,
    });

    // Zoom sur l'emprise du vecteur
    sourceVector.once('change', (evt) => {
      // On vérifie que la source du vecteur sont chargés
      if (sourceVector.getState() === 'ready') {
        // On vérifie que le veteur contient au moins un objet géographique
        if (sourceVector.getFeatures().length > 0) {
          // On adapte la vue de la carte à l'emprise du vecteur
          this.map.getView().fit(sourceVector.getExtent(), this.map.getSize());
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

  // Methode permettant de uploader une image
  // uploadFile(file): void {
  //   // créé une instance FormData et ajouté le fichier à un champ nommé file .
  //   // Le nom de cette clé doit être l'endroit où votre serveur s'attend à trouver le fichier,
  //   // sinon le serveur ne pourra pas extraire le fichier.
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  //   file.inProgress = true;
  //   // envoie les données du formulaire au serveur en appelant la méthode Upload () de UploadService
  //   this.uploadService.upload(formData).pipe(
  //     map(event => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           file.progress = Math.round(event.loaded * 100 / event.total);
  //           break;
  //         case HttpEventType.Response:
  //           return event;
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       file.inProgress = false;
  //       return of(`${file.data.name} upload failed.`);
  //     })).subscribe((event: any) => {
  //     if (typeof (event) === 'object') {
  //       console.log(event.body);
  //     }
  //   });
  // }

  // méthode uploadFiles () qui peut être utilisée pour télécharger plusieurs fichiers image
  // private uploadFiles(): void {
  //   this.fileUpload.nativeElement.value = '';
  //   this.files.forEach(file => {
  //     this.uploadFile(file);
  //   });
  // }
  //
  // // Methode permettant d'envoyer limage au serveur
  // onClick(): void {
  //   const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
  //     for (const file of fileUpload.files) {
  //       this.files.push({ data: file, inProgress: false, progress: 0});
  //     }
  //     this.uploadFiles();
  //   };
  //   fileUpload.click();
  // }
  //
  // check(): void{
  //   console.log('clicked');
  // }

}
