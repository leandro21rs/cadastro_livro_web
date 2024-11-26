import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public version: string;
  public date: string;

  constructor() { }

  ngOnInit() {
    this.version = environment.version;
    this.date = environment.date;
  }

}
