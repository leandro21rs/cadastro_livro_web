import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(
    private http: HttpClient
  ) { }

  getComponents(): Observable<{data: any[]}> {
    return this.http.get<{data: any[]}>('assets/data/components.json')
      .pipe(
        // tap(console.log)
      )
  }

  getComponentsHomeBasic(): Observable<{data: any[]}> {
    return this.http.get<{data: any[]}>('assets/data/components-homebasic.json')
    .pipe(
      // tap(console.log)
    )
  }
}
