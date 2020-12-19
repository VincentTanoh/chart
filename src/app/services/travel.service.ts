import {Travel} from '../models/Travel';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import * as faker from 'faker';

export const TRAVELS: Travel[] = [
  {
    travelName: faker.commerce.productName(),
    esternatedPrice : faker.random.number(),
    departureDate : new Date(),
    departurePosition:{lon:2.6,lat: 54.5}
  },
  {
    travelName:"cocody",
    esternatedPrice : faker.random.number(),
    departureDate : new Date(),
    departurePosition:{lon:-3.9844686,lat: 5.3461834}
  },
  {
    travelName: "bonoua",
    esternatedPrice : faker.random.number(),
    departureDate : new Date(),
    departurePosition:{lon:-3.6009837,lat: 5.2734648}
  },
  {
    travelName: faker.commerce.productName(),
    esternatedPrice : faker.random.number(),
    departureDate : new Date(),
    departurePosition:{lon:122.9,lat: -0.7}
  },
  {
    travelName: faker.commerce.productName(),
    esternatedPrice : faker.random.number(),
    departureDate : new Date(),
    departurePosition:{lon:138.1,lat: 84.5}
  },
  {
    travelName: faker.commerce.productName(),
    esternatedPrice : faker.random.number(),
    departureDate : new Date(),
    departurePosition:{lon:-64.7,lat: 57.4}
  },

];

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private httpClient: HttpClient) { }

  // getTravels():Observable<Travel[]>{
  //   return of(TRAVELS);
  // }
  getTravels(): Travel[]{
    return TRAVELS;
  }

}
