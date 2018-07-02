import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextManipulationService } from '../text-manipulation.service';
import { FileManagementService } from '../file-management.service';

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
  styleUrls: ['./editor-area.component.scss']
})
export class EditorAreaComponent implements OnInit {

  constructor(private textManipulationService: TextManipulationService, private fileManagementService: FileManagementService) { }

  importObservable = this.fileManagementService.importObservable;
  text = this.textManipulationService.getText();
  @ViewChild('editorTextArea') textArea: ElementRef;

  onTextAreaChange(newText) {
    this.textManipulationService.setText(newText);
  }

  ngOnInit() {
    this.importObservable.subscribe(((fileContent: string) => {
      this.text = fileContent;
    }));
  }

  onTransformToolReturned(eventData) {
    this.text = eventData.value;
    this.textManipulationService.setText(this.text); // { value: string, startIndex: number, endIndex: number, newCursorPosition: number } // { value: string, cursorPosition: number }

    // @TODO: This is a fix, because the text change should be fired direct after the setSelectionRange, therefor the cursor is moved to the end
    setTimeout(() => {
      this.textArea.nativeElement.setSelectionRange(eventData.cursorPosition[0], eventData.cursorPosition[1]);
    }, 0);
  }


}
