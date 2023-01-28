import { OnDestroy } from '@angular/core';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MtSidebarMenuItem,
  MtStyleManager
} from '@nx-northwind/nx-material-ui';

@Component({
  selector: 'nx-northwind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MtStyleManager]
})
export class AppComponent implements OnInit, OnDestroy {
  opened!: boolean;
  @Output() isOn: EventEmitter<boolean> = new EventEmitter<boolean>();
  sidebarMenuItems: MtSidebarMenuItem[] = [
    {
      text: 'Dashboard',
      active: false,
      command: () => {
        this.router.navigateByUrl('/');
      }
    },
    {
      text: 'Category',
      active: false,
      command: () => {
        this.router.navigateByUrl('/category');
      }
    },
    {
      text: 'Customer',
      active: false,
      command: () => {
        this.router.navigateByUrl('/customer');
      }
    },
    {
      text: 'Employee',
      active: false,
      command: () => {
        this.router.navigateByUrl('/employee');
      }
    },
    {
      text: 'Employee-Territory',
      active: false,
      command: () => {
        this.router.navigateByUrl('/employee-territory');
      }
    },
    {
      text: 'Order',
      active: false,
      command: () => {
        this.router.navigateByUrl('/order');
      }
    },
    {
      text: 'Order-Detail',
      active: false,
      command: () => {
        this.router.navigateByUrl('/order-detail');
      }
    },
    {
      text: 'Product',
      active: false,
      command: () => {
        this.router.navigateByUrl('/product');
      }
    },
    {
      text: 'Region',
      active: false,
      command: () => {
        this.router.navigateByUrl('/region');
      }
    },
    {
      text: 'Shipper',
      active: false,
      command: () => {
        this.router.navigateByUrl('/shipper');
      }
    },
    {
      text: 'Territory',
      active: false,
      command: () => {
        this.router.navigateByUrl('/territory');
      }
    }
  ];

  title = 'nx-northwind-app';

  constructor(
    private router: Router,
    private styleManager: MtStyleManager
  ) {
    console.log('App Component...');

    const theme = localStorage.getItem('theme');
    if (theme) {
      styleManager.setStyle('', theme);
    } else {
      this.styleManager.setStyle(
        '',
        'https://material2-docs-dev.firebaseapp.com/deeppurple-amber.css'
      );
      localStorage.setItem(
        'theme',
        'https://material2-docs-dev.firebaseapp.com/deeppurple-amber.css'
      );
      localStorage.setItem('themeSelected', '1');
    }

    this.isOn.subscribe((data) => {
      this.opened = data;
    });
  }

  ngOnDestroy(): void {
    this.isOn.complete();
    this.isOn.unsubscribe();
  }

  ngOnInit() {
    console.log('App Component OnInit...');
  }

  openChanged(ev: boolean): void {
    this.isOn.emit(ev);
  }
}
