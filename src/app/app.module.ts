import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RenderAreaComponent } from './render-area/render-area.component';
import { EditorAreaComponent } from './editor-area/editor-area.component';
import { TextManipulationService } from './text-manipulation.service';
import { HighlightCodeService } from './highlight-code.service';
import { EditorToolbarComponent } from './editor-area/editor-toolbar/editor-toolbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FileManagementService } from './file-management.service';

import { fontAwesomeLoader } from './fontAwesomeLoader';

fontAwesomeLoader.libraryLoader();

@NgModule({
  declarations: [
    AppComponent,
    RenderAreaComponent,
    EditorAreaComponent,
    EditorToolbarComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule.forRoot()
  ],
  providers: [
    TextManipulationService,
    HighlightCodeService,
    FileManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
