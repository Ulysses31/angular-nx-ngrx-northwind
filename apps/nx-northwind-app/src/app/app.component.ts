import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-northwind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nx-northwind-app';

  constructor() { console.log('App Component...'); }

  ngOnInit() { console.log('App Component OnInit...'); }
}
