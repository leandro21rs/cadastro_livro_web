import { Component, OnInit, Renderer2 } from '@angular/core';
import { NodeService } from './node.service';
import { TreeNode } from 'primeng/api';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent extends SuperComponent {
  files1: TreeNode[];

  files2: TreeNode[];

  cols: any[];

  constructor(
    private nodeService: NodeService,
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.nodeService.getFilesystem().then(files => this.files1 = files);
    this.nodeService.getFilesystem().then(files => this.files2 = files);

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];

    this.renderer.addClass(document.body, 'table-tree');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-tree');
  }
}
