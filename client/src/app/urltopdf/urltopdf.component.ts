import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PDFService } from '../pdf.service';
import {saveAs as importedSaveAs} from "file-saver";


@Component({
    selector: 'app-url2pdf',
    templateUrl: './urltopdf.component.html'
})
export class UrlToPdfComponent implements OnInit {
    
    url: string ='';
    pageFormat: string ='A4';
    marginLeft: number = 80;
    marginRight: number = 80;
    marginTop: number = 80;
    marginBottom: number = 80;
    emulateMedia: string = 'screen';
    pageOrientation: string = 'portrait';
    pageScale: number = 1;

    isGenerating: boolean = false;
    pdfName: string = btoa(Math.random().toString()).substring(0,24);

    constructor(private pdfService: PDFService) { }
    ngOnInit() { }
    onSubmit() {
        this.isGenerating = true;
        this.pdfService.generateUrlToPdf(this.url,this.pageFormat, this.marginLeft, this.marginRight, this.marginTop, this.marginBottom, this.emulateMedia, this.pageOrientation, this.pageScale).subscribe(
            data=> {
                let file = new Blob([data], {type: 'application/pdf'});
                //let url = URL.createObjectURL(file);
                //this.generatedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                importedSaveAs(file, this.pdfName + '.pdf');
                this.isGenerating = false;
            }
        )
    }
}