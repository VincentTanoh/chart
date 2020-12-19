  import { Injectable } from '@angular/core';
  import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class UploadService {
    SERVER_URL: string = "https://file.io/";
    constructor(private httpClient: HttpClient) { }

    //method that simply calls the post () method of HttpClient to send an HTTP POST request with form data
    public upload(formData) {

      return this.httpClient.post<any>(this.SERVER_URL, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
  }
