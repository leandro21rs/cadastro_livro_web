import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageUrlService {
  previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  previousUrl$: Observable<string> = this.previousUrl.asObservable();

  constructor() { }

  setPreviousUrl(url: string) {
    this.previousUrl.next(url)
  }

}
