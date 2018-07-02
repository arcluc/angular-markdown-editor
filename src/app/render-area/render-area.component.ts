import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { TextManipulationService } from '../text-manipulation.service';
import { HighlightCodeService } from '../highlight-code.service';

@Component({
  selector: 'app-render-area',
  templateUrl: './render-area.component.html',
  styleUrls: ['./render-area.component.scss']
})
export class RenderAreaComponent implements OnInit, OnChanges {

  constructor(private textManipulationService: TextManipulationService, private highlightCodeService: HighlightCodeService) { }

  textObservable = this.textManipulationService.textObservable;
  transformedText = this.textManipulationService.getText();
  @ViewChild('renderDiv') renderDiv: ElementRef;

  /**
   * // TODO: Check if there is a better way to use PrismJS for higlighting, because currently it is parsing the DOM and needs a timeout to render after Angular complete the render
   */
  ngOnInit() {
    this.textObservable.subscribe(((data: string) => {
      this.transformedText = this.textManipulationService.transformText();
      setTimeout(() => {
        this.highlightCodeService.highlightAll();
        // this.highlightCodeService.highlightAllUnder(this.renderDiv.nativeElement);
      }, 10);
    }));
  }

  ngOnChanges() {
    /*setTimeout(() => {
      this.highlightCodeService.highlightAllUnder(this.renderDiv.nativeElement);
    }, 0);*/
  }

}
