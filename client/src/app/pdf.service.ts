import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';


@Injectable()
export class PDFService {

    serviceUrl: string = 'http://localhost:5000/api/';
    //httpOptions = {
        
        headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        });
        
    //};

    constructor( private http: HttpClient) { }

    generateHtmlToPdf(htmlContent: string, pageFormat: string, marginLeft: number, marginRight: number, marginTop: number, marginBottom: number, emulateMedia: string, pageOrientation: string, pageScale: number): Observable<any> {
        if(htmlContent) {
            return this.http.post(this.serviceUrl + 'html2pdf', {html: decodeURIComponent(htmlContent), pageFormat: pageFormat, marginLeft: marginLeft, marginRight: marginRight, marginTop: marginTop, marginBottom: marginBottom, emulateMedia: emulateMedia, landscape: pageOrientation, scale: pageScale }, {headers: this.headers, responseType: 'blob' as 'json' } ).pipe( tap(
                data => console.log('PDF data received.'),
                error => console.log("Error",error)
            ), catchError(this.handleError));
        }
    }

    generateUrlToPdf(remoteUrl: string, pageFormat: string, marginLeft: number, marginRight: number, marginTop: number, marginBottom: number, emulateMedia: string, pageOrientation: string, pageScale: number): Observable<any> {
        if(remoteUrl) {
            return this.http.post(this.serviceUrl + 'url2pdf', {url: remoteUrl, pageFormat: pageFormat, marginLeft: marginLeft, marginRight: marginRight, marginTop: marginTop, marginBottom: marginBottom, emulateMedia: emulateMedia, landscape: pageOrientation, scale: pageScale}, {headers: this.headers, responseType: 'blob' as 'json'}).pipe(
                tap(
                    data => console.log('Pdf generated successfully'),
                    error => console.log(error)
                ),
                catchError(this.handleError)
            )
        }
    }

    private handleError(error?: HttpErrorResponse) {
        console.log(error);
        return throwError('Something went wrong. Please try again later.'); 
    }
    
}