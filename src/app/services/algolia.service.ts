import {Injectable} from '@angular/core';
import * as algoliasearch from 'algoliasearch';

const searchClient = algoliasearch(
  '5V0S51JAHZ',
  '6321d4ba46c2da1314cf5294c7995736'
);


@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {


  configCity = {
    indexName: 'demo_geo',
    searchClient
  };



}
