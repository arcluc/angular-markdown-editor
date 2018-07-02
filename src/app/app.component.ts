import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isResizing = false;
  separatorWidth = 10;
  leftAreaWidth: SafeStyle;
  rightAreaWidth: SafeStyle;
  middlePosition: number;
  leftOffset = 0;
  rightOffset = 0;
  isDarkMode = false;

  toggleDarkMode() {
    console.log('toggleDarkMode');
    this.isDarkMode = !this.isDarkMode;
  }

  constructor(private sanitizer: DomSanitizer) {
    this.leftAreaWidth = this.sanitizer.bypassSecurityTrustStyle(
      `calc(50% - ${this.separatorWidth / 2}px)`
    );
    this.rightAreaWidth = this.sanitizer.bypassSecurityTrustStyle(
      `calc(50% - ${this.separatorWidth / 2}px)`
    );
  }

  onSeparatorPress(event: MouseEvent) {
    this.isResizing = true;
    this.middlePosition = event.clientX;
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event: MouseEvent) {
    this.isResizing = false;
  }

  // TODO: Improve this part
  @HostListener('window:mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    if (!this.isResizing) {
      return;
    }
    const oldPosition = this.middlePosition;
    this.middlePosition = event.clientX;

    const difference = this.middlePosition - oldPosition;
    this.leftOffset += difference;
    this.rightOffset -= difference;

    this.leftAreaWidth = this.sanitizer.bypassSecurityTrustStyle(
      `calc(50% - ${this.separatorWidth / 2}px + ${this.leftOffset}px)`
    );
    this.rightAreaWidth = this.sanitizer.bypassSecurityTrustStyle(
      `calc(50% - ${this.separatorWidth / 2}px + ${this.rightOffset}px)`
    );
 }

}
