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
  menuTimeOut: number = 500;
  sidebarMenuItems: MtSidebarMenuItem[] = [
    {
      text: 'Dashboard',
      active: false,
      command: () => {
        this.router.navigateByUrl('/dashboard');
      }
    },
    {
      text: 'Category',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/category');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Customer',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/customer');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Employee',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/employee');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Employee-Territory',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/employee-territory');
        }, this.menuTimeOut);
      }
    },
    // {
    //   text: 'Order',
    //   active: false,
    //   command: () => {
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/order');
    //     }, this.menuTimeOut);
    //   }
    // },
    // {
    //   text: 'Order-Detail',
    //   active: false,
    //   command: () => {
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/order-detail');
    //     }, this.menuTimeOut);
    //   }
    // },
    {
      text: 'Order-Master-Detail',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/order-master-detail');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Product',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/product');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Region',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/region');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Shipper',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/shipper');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Supplier',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/supplier');
        }, this.menuTimeOut);
      }
    },
    {
      text: 'Territory',
      active: false,
      command: () => {
        setTimeout(() => {
          this.router.navigateByUrl('/territory');
        }, this.menuTimeOut);
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
