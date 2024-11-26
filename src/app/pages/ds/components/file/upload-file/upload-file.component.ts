import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  uploadedFiles: any[] = [];
  acceptedFiles: String = ".pdf, .jpg, .png, .doc, .docx, .xls, .xlsx, .csv";

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    
  }

  onUpload(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }

  onBasicUpload(event) {
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
  }

  onBasicUploadAuto(event) {
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
  }

}
