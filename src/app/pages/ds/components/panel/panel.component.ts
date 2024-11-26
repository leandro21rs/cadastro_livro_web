import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'panel');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'panel');
  }
}
