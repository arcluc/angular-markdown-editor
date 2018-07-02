import { Injectable } from '@angular/core';
import { Observable ,  Observer } from 'rxjs';
import { TextManipulationService } from './text-manipulation.service';
import * as FileSaver from 'file-saver';

@Injectable()
export class FileManagementService {

  fileName: string;
  fileContent: string;
  importObserver: Observer<string>;
  importObservable = new Observable((observer: Observer<string>) => {
    this.importObserver = observer;
  });

  constructor(private textManipulationService: TextManipulationService) { }

  saveFile() {
    const fileName = this.fileName ? this.fileName : 'untitled';
    this.fileContent = this.textManipulationService.getText();
    const blob = new Blob([this.fileContent], {type: 'text/markdown;charset=utf-8'});
    FileSaver.saveAs(blob, `${fileName}.md`);
  }

  fileImported(content: string) {
    this.importObserver.next(content);
    this.textManipulationService.setText(content);
  }

  extractFileName(path: string) {
    const re = /(?:\.([^.]+))?$/;
    const splitted = path.split('\\');
    const fileName = splitted[splitted.length - 1];
    const fileExtension = re.exec(fileName)[1];

    if (fileExtension) {
      return fileName.replace('.' + fileExtension, '');
    }

    return fileName;
  }

}
