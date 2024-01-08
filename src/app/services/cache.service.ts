import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class CacheService {

  cacheDefaultKey = 'ngxDatatableData';
  constructor() {
  }

  getLocalCache(key?: string): any {
    return JSON.parse(localStorage.getItem(key || this.cacheDefaultKey) || '[]');
  }

  set(data: any, key?: string) {
    if (typeof data !== 'undefined') {
      localStorage.setItem(key || this.cacheDefaultKey, JSON.stringify(data));
    }
  }

  delete(key?: string) {
    localStorage.removeItem(key || this.cacheDefaultKey);
  }

  get(key?: string): Observable<any> {
    return new Observable(obs => {
      const parsedObject = this.getLocalCache(key || this.cacheDefaultKey);
      obs.next(parsedObject);
      obs.complete();
    });
  }

}
