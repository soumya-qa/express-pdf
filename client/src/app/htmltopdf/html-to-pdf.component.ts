import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PDFService } from '../pdf.service'
import { DomSanitizer } from '@angular/platform-browser';

import {saveAs as importedSaveAs} from "file-saver";


@Component({
    selector: 'app-htmlpdf',
    templateUrl: './html-to-pdf.component.html',
    styleUrls: []
})
export class HtmlToPdfComponent implements OnInit {
    html: string = '';
    generatedPdf: any = '';
    pageFormat: string ='A4';
    marginLeft: number = 80;
    marginRight: number = 80;
    marginTop: number = 80;
    marginBottom: number = 80;
    emulateMedia: string = 'screen';
    pageOrientation: string = 'portrait';
    pageScale: number = 1;
    pdfName: string = btoa(Math.random().toString()).substring(0,24);
    isGenerating: boolean = false;

    ngOnInit() {

    }
    constructor(private pdfService: PDFService, private sanitizer: DomSanitizer) {
    }

    onSubmit(form: NgForm) {
        this.isGenerating = true;
        this.pdfService.generateHtmlToPdf(this.html,this.pageFormat, this.marginLeft, this.marginRight, this.marginTop, this.marginBottom, this.emulateMedia, this.pageOrientation, this.pageScale).subscribe(
            (results) => {
                if(results != '') {
                    let file = new Blob([results], {type: 'application/pdf'});
                    let url = URL.createObjectURL(file);
                    this.generatedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    importedSaveAs(file, this.pdfName + '.pdf');
                    this.isGenerating = false;
                    //var file = new Blob([results], {type: 'application/pdf'});
                    //console.log(file);
                    //var fileURL = URL.createObjectURL(file);
                    //window.open(url);
                }
            }
        )
    }
}