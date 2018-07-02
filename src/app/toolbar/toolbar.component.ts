import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileManagementService } from '../file-management.service';
import { TextManipulationService } from '../text-manipulation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSwitch: EventEmitter<any> = new EventEmitter();
  title: string;

  constructor(private fileManagementService: FileManagementService, private textManipulationService: TextManipulationService) { }

  ngOnInit() {
  }

  saveFile() {
    this.fileManagementService.saveFile();
  }

  onTitleInputChange(title) {
    this.fileManagementService.fileName = title;
  }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    reader.onload = () => {
      const extractedTitle = this.fileManagementService.extractFileName(event.srcElement.value);
      this.fileManagementService.fileImported(reader.result);
      this.title = extractedTitle;
    };
  }
}
