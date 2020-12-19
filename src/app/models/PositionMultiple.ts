import {Coordinate} from 'ol/coordinate';
import Geolocation from 'ol/Geolocation';
import {fromLonLat} from 'ol/proj';


export class PositionMultiple {
  coordinates: Coordinate = null;
  altitude: number = null;

  constructor(geolocation?: Geolocation) {
    if (geolocation) {
      this.coordinates = geolocation.getPosition();
      this.altitude = geolocation.getAltitude() ;
    }
  }
  get longLat(): number[] {
    return  this.coordinates ? fromLonLat(this.coordinates,'EPSG:3857') : [null, null];
  }

}


