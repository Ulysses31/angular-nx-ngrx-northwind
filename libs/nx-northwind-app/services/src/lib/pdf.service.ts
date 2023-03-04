/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as download from 'downloadjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiServiceUrl = 'http://localhost:3333/pdf';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'application/pdf'
  };

  constructor(public http: HttpClient) {
    console.log('PdfService constructor...');
  }

  getApiUrl(): string {
    return this.apiServiceUrl;
  }

  setApiUrl(url: string): void {
    if (url) this.apiServiceUrl = url;
  }

  pdfWindow(data: any): void {
    this.http
      .post(
        `${this.apiServiceUrl}`,
        { data },
        {
          headers: this.httpOptions.headers,
          responseType: 'text'
        }
      )
      .subscribe((result: any) => {
        const pdfWindow = window.open('');
        pdfWindow &&
          pdfWindow.document.write(
            `<html>
              <head></head>
              <body style='margin: -2px; padding: 0'>
                <iframe width='100%' height='100%' src='${encodeURI(
                  result
                )}'></iframe>
              </body>
            </html>
            `
          );
      });
  }

  pdfFile(data: any): void {
    this.http
      .post(
        `${this.apiServiceUrl}`,
        data,
        {
          headers: this.httpOptions.headers,
          responseType: 'text'
        }
      )
      .subscribe((result: any) => {
        download(
          result,
          `${new Date().toLocaleDateString()}.pdf`,
          'application/pdf'
        );
      });
  }
}
