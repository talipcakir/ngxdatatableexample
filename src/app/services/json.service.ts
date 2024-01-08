import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  constructor(
    private http: HttpClient
  ) {
  }

  get(path: string): Observable<any> {
    return this.http.get(path)
  }
}
