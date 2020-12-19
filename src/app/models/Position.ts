import Geolocation from 'ol/Geolocation';
import {Coordinate} from 'ol/coordinate';
import {transform} from 'ol/proj';


export class Position {
  coordinates: Coordinate = null;
  altitude: number = null;
  heading: number = null;
  speed: number = null;
  positionAccuracy: number = null;
  altitudeAccuracy: number = null;

  constructor(geolocation?: Geolocation) {
    if (geolocation) {
      this.coordinates = geolocation.getPosition();
      this.altitude = geolocation.getAltitude() ;
      this.heading = geolocation.getHeading();
      this.speed = geolocation.getSpeed();
      this.positionAccuracy = geolocation.getAccuracy();
      this.altitudeAccuracy = geolocation.getAltitudeAccuracy();
    }
  }

  get longLat(): number[] {
    return this.coordinates ? transform(this.coordinates, 'EPSG:3857', 'EPSG:4326') : [null, null];
  }
}
