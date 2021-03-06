import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit {
  @Input() textArea;

  // return { value: string, startIndex: number, endIndex: number, newCursorPosition: number } // { value: string, cursorPosition: number }
  @Output() transformToolReturned: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  bold(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) { // Meaning no text selected
      insertString = '****';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, start + 2]
      });
    } else { // Meaning text is selected
      selectedText = value.substring(start, end);
      insertString = `**${selectedText}**`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 4, end + 4]
      });
    }
    this.textArea.nativeElement.focus();
  }

  italic(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '**';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 1, start + 1]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `*${selectedText}*`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 2, end + 2]
      });
    }
    this.textArea.nativeElement.focus();
  }

  strikethrough(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '~~~~';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, start + 2]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `~~${selectedText}~~`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 4, end + 4]
      });
    }
    this.textArea.nativeElement.focus();
  }

  uList(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '- ul';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, start + 4]
      });
    } else { // TODO improve selected list
      selectedText = value.substring(start, end);
      insertString = `- ${selectedText}`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 2, end + 2]
      });
    }
    this.textArea.nativeElement.focus();
  }

  oList(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '1. ol';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 3, start + 5]
      });
    } else { // TODO improve selected list
      selectedText = value.substring(start, end);
      insertString = `1. ${selectedText}`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 3, end + 3]
      });
    }
    this.textArea.nativeElement.focus();
  }

  /**
   * @TODO: Improve heading with different sub heading levels
   * @param event
   */
  heading(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '# Heading';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, start + 9]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `# ${selectedText}`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 2, end + 2]
      });
    }
    this.textArea.nativeElement.focus();
  }

  blockquotes(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '> ';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, start + 2]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `> ${selectedText}`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 2, end + 2]
      });
    }
    this.textArea.nativeElement.focus();
  }

  inlineCode(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = `    `;
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 4, start + 4]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `    ${selectedText}`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 4, end + 4]
      });
    }
    this.textArea.nativeElement.focus();
  }

  insertLink(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = `[enter link description here](https://)`;
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 1, start + 28]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `[${selectedText}](https://)`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 3, end + 11]
      });
    }
    this.textArea.nativeElement.focus();
  }

  insertImage(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = `![Alt Text](url)`;
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 12, start + 15]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `![${selectedText}](url)`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [end + 4, end + 7]
      });
    }
    this.textArea.nativeElement.focus();
  }

  /**
   * @TODO: Improve table by pre selecting number of cell, like the google sheet selector
   * @param event
   */
  insertTable(event: Event) {
    const start = this.textArea.nativeElement.selectionStart;
    const end = this.textArea.nativeElement.selectionEnd;
    let value = this.textArea.nativeElement.value;
    let selectedText = '';
    let insertString = '';

    if (start === end) {
      insertString = '|  |  |\n|--|--|\n|  |  |';
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, start + 2]
      });
    } else {
      selectedText = value.substring(start, end);
      insertString = `| ${selectedText} |  |\n|--|--|\n|  |  |`;
      value = value.slice(0, start) + value.slice(end);
      value = this.insertStringAtIndex(value, insertString, start);
      this.transformToolReturned.emit({
        value,
        cursorPosition: [start + 2, end + 2]
      });
    }
    this.textArea.nativeElement.focus();
  }

  // TODO: Move to an 'Util' file
  insertStringAtIndex(baseString: string, insertString: string, at: number) {
    if (!at) { at = 0; }

    return baseString.slice(0, at) + insertString + baseString.slice(at);
  }

}
