import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfComponent } from './pdf/pdf.component';
import { HtmlToPdfComponent } from './htmltopdf/html-to-pdf.component';
import { UrlToPdfComponent } from './urltopdf/urltopdf.component';

import { PDFService } from './pdf.service';

@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    HtmlToPdfComponent,
    UrlToPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ PDFService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
