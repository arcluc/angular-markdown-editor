import { Injectable } from '@angular/core';
import { Observable ,  Observer } from 'rxjs';

const showdown = require('showdown');

@Injectable()
export class TextManipulationService {
  text = '';
  textObserver: Observer<string>;
  textObservable = new Observable((observer: Observer<string>) => {
    this.textObserver = observer;
  });

  // Local option but as it is a common instance of the service, the instance of converter used will be the same
  // https://github.com/showdownjs/showdown
  converter = new showdown.Converter();

  constructor() {
    this.converter.setFlavor('github');
  }

  getText() {
    return this.text;
  }

  setText(newText) {
    this.text = newText;
    this.textObserver.next(this.text);
  }

  transformText() {
    return this.converter.makeHtml(this.text);
  }

  changeFlavor(flavor: string) {
    this.converter.setFlavor(flavor);
  }

}

enum Flavor {
  original = 'original', // - original markdown flavor as in John Gruber's spec
  vanilla = 'vanilla', // - showdown base flavor (as from v1.3.1)
  github = 'github' // - GFM (GitHub Flavored Markdown)
}
