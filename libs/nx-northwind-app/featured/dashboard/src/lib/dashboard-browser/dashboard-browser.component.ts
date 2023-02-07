/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CustomersCountOrdersPerYearDto,
  CustomersCountPerYearDto,
  EmployeesTotalSalesPerYearDto,
  SalesTotalAmountPerYearDto,
  SalesTotalPerCategoryDto,
  SalesTotalPerYearDto
} from '@nx-northwind/nx-northwind-app/entities';
import { DashboardService } from '@nx-northwind/nx-northwind-app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-northwind-dashboard-browser',
  templateUrl: './dashboard-browser.component.html',
  styleUrls: ['./dashboard-browser.component.scss']
})
export class DashboardBrowserComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private snackDuration: number = 3000; //ms -> 3sec

  chartSalesTotalPerYear: any;
  chartSalesTotalAmountPerYear: any;
  chartCustomersCountPerYear: any;
  chartCustomersCountOrdersPerYearFirst: any;
  chartCustomersCountOrdersPerYearSecond: any;
  chartCustomersCountOrdersPerYearThird: any;
  chartEmployeesTotalperYearFirst: any;
  chartEmployeesTotalperYearSecond: any;
  chartEmployeesTotalperYearThird: any;

  dataPointsSalesTotalPerYear: { label: string; y: string }[] = [];
  dataPointssalesTotalAmountPerYear: { label: string; y: string }[] =
    [];
  dataPointsCustomersCountPerYear: { label: string; y: string }[] =
    [];
  dataPointsCustomersCountOrdersPerYearFirst: {
    label: string;
    y: string;
  }[] = [];
  dataPointsCustomersCountOrdersPerYearSecond: {
    label: string;
    y: string;
  }[] = [];
  dataPointsCustomersCountOrdersPerYearThird: {
    label: string;
    y: string;
  }[] = [];
  dataPointsChartEmployeesTotalperYearFirst: {
    label: string;
    y: string;
  }[] = [];
  dataPointsChartEmployeesTotalperYearSecond: {
    label: string;
    y: string;
  }[] = [];
  dataPointsChartEmployeesTotalperYearThird: {
    label: string;
    y: string;
  }[] = [];

  salesTotalPerYear$!: Observable<SalesTotalPerYearDto[]>;
  salesTotalAmountPerYear$!: Observable<SalesTotalAmountPerYearDto[]>;
  customersCountPerYear$!: Observable<CustomersCountPerYearDto[]>;

  salesTotalperCategoryFirst$!: Observable<
    SalesTotalPerCategoryDto[]
  >;
  salesTotalperCategorySecond$!: Observable<
    SalesTotalPerCategoryDto[]
  >;
  salesTotalperCategoryThird$!: Observable<
    SalesTotalPerCategoryDto[]
  >;

  employeesTotalperYearFirst$!: Observable<
    EmployeesTotalSalesPerYearDto[]
  >;
  employeesTotalperYearSecond$!: Observable<
    EmployeesTotalSalesPerYearDto[]
  >;
  employeesTotalperYearThird$!: Observable<
    EmployeesTotalSalesPerYearDto[]
  >;

  customersCountOrdersPerYearFirst$!: Observable<
    CustomersCountOrdersPerYearDto[]
  >;
  customersCountOrdersPerYearSecond$!: Observable<
    CustomersCountOrdersPerYearDto[]
  >;
  customersCountOrdersPerYearThird$!: Observable<
    CustomersCountOrdersPerYearDto[]
  >;

  chartOptionsSalesTotalPerYear = {
    title: {
      text: 'Sales per year'
    },
    animationEnabled: true,
    axisX: {
      title: 'Years',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Number of Orders',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'bar', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Orders',
        dataPoints: this.dataPointsSalesTotalPerYear
      }
    ]
  };

  chartOptionsSalesTotalAmountPerYear = {
    title: {
      text: 'Sales amount per year'
    },
    animationEnabled: true,
    axisX: {
      title: 'Years',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Amount',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'column', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Amount',
        dataPoints: this.dataPointssalesTotalAmountPerYear
      }
    ]
  };

  chartOptionsCustomersCountPerYear = {
    title: {
      text: 'Customers per year'
    },
    animationEnabled: true,
    axisX: {
      title: 'Years',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Customers',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'area', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Customers',
        dataPoints: this.dataPointsCustomersCountPerYear
      }
    ]
  };

  chartOptionsCustomersCountOrdersPerYearFirst = {
    title: {
      text: 'Customer orders in 1996'
    },
    animationEnabled: true,
    axisX: {
      title: 'Customers',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Orders',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'column', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Orders',
        dataPoints: this.dataPointsCustomersCountOrdersPerYearFirst
      }
    ]
  };

  chartOptionsCustomersCountOrdersPerYearSecond = {
    title: {
      text: 'Customer orders in 1997'
    },
    animationEnabled: true,
    axisX: {
      title: 'Customers',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Orders',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'column', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Orders',
        dataPoints: this.dataPointsCustomersCountOrdersPerYearSecond
      }
    ]
  };

  chartOptionsCustomersCountOrdersPerYearThird = {
    title: {
      text: 'Customer orders in 1998'
    },
    animationEnabled: true,
    axisX: {
      title: 'Customers',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Orders',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'column', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Orders',
        dataPoints: this.dataPointsCustomersCountOrdersPerYearThird
      }
    ]
  };

  chartOptionsEmployeesTotalperYearFirst = {
    title: {
      text: 'Employees total sales in 1996'
    },
    animationEnabled: true,
    axisX: {
      title: 'Employees',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Sales',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'bar', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Sales',
        dataPoints: this.dataPointsChartEmployeesTotalperYearFirst
      }
    ]
  };

  chartOptionsEmployeesTotalperYearSecond = {
    title: {
      text: 'Employees total sales in 1997'
    },
    animationEnabled: true,
    axisX: {
      title: 'Employees',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Sales',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'bar', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Sales',
        dataPoints: this.dataPointsChartEmployeesTotalperYearSecond
      }
    ]
  };

  chartOptionsEmployeesTotalperYearThird = {
    title: {
      text: 'Employees total sales in 1998'
    },
    animationEnabled: true,
    axisX: {
      title: 'Employees',
      gridThickness: 1,
      tickLength: 10
    },
    axisY: {
      title: 'Sales',
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer'
    },
    data: [
      {
        type: 'bar', //change type to column, bar, line, area, pie, etc
        indexLabel: '{y}', //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        showInLegend: false,
        name: 'Sales',
        dataPoints: this.dataPointsChartEmployeesTotalperYearThird
      }
    ]
  };

  constructor(
    private _snackBar: MatSnackBar,
    private dashboardService: DashboardService
  ) {
    console.log('DashboardBrowserComponent constructor...');
  }

  ngOnInit(): void {
    console.log('DashboardBrowserComponent onInit...');

    this.salesTotalPerYear$ =
      this.dashboardService.browseSalesTotalPerYear();
    this.salesTotalAmountPerYear$ =
      this.dashboardService.browseSalesTotalAmountPerYear();
    this.customersCountPerYear$ =
      this.dashboardService.browseCustomersCountPerYear();

    this.salesTotalperCategoryFirst$ =
      this.dashboardService.loadSalesTotalPerCategory('1996');
    this.salesTotalperCategorySecond$ =
      this.dashboardService.loadSalesTotalPerCategory('1997');
    this.salesTotalperCategoryThird$ =
      this.dashboardService.loadSalesTotalPerCategory('1998');

    this.employeesTotalperYearFirst$ =
      this.dashboardService.loadEmployeesTotalSalesPerYear('1996');
    this.employeesTotalperYearSecond$ =
      this.dashboardService.loadEmployeesTotalSalesPerYear('1997');
    this.employeesTotalperYearThird$ =
      this.dashboardService.loadEmployeesTotalSalesPerYear('1998');

    this.customersCountOrdersPerYearFirst$ =
      this.dashboardService.loadCustomersCountOrdersPerYear('1996');
    this.customersCountOrdersPerYearSecond$ =
      this.dashboardService.loadCustomersCountOrdersPerYear('1997');
    this.customersCountOrdersPerYearThird$ =
      this.dashboardService.loadCustomersCountOrdersPerYear('1998');
  }

  ngAfterViewInit(): void {
    console.log('DashboardBrowserComponent onAfterViewInit...');

    this.salesTotalPerYear$.subscribe({
      next: (data: any) => {
        const items: any[] = data.sales;
        items.map((item) => {
          this.dataPointsSalesTotalPerYear.push({
            label: item.YEAR,
            y: item.TotalOrders
          });
        });
        this.chartSalesTotalPerYear.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.salesTotalAmountPerYear$.subscribe({
      next: (data: any) => {
        const items: any[] = data.sales;
        items.map((item) => {
          this.dataPointssalesTotalAmountPerYear.push({
            label: item.Year,
            y: item.TotalAmount
          });
        });
        this.chartSalesTotalAmountPerYear.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.customersCountPerYear$.subscribe({
      next: (data: any) => {
        const items: any[] = data.customers;
        items.map((item: any) => {
          this.dataPointsCustomersCountPerYear.push({
            label: item.YEAR,
            y: item.Customers
          });
        });
        this.chartCustomersCountPerYear.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    // this.salesTotalperCategoryFirst$.subscribe((data) => console.log(data));
    // this.salesTotalperCategorySecond$.subscribe((data) => console.log(data));
    // this.salesTotalperCategoryThird$.subscribe((data) => console.log(data));

    this.employeesTotalperYearFirst$.subscribe({
      next: (data: any) => {
        const items: any[] = data.employees;
        items.map((item: any) => {
          this.dataPointsChartEmployeesTotalperYearFirst.push({
            label: item.Employee,
            y: item.Total
          });
        });
        this.chartEmployeesTotalperYearFirst.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.employeesTotalperYearSecond$.subscribe({
      next: (data: any) => {
        const items: any[] = data.employees;
        items.map((item: any) => {
          this.dataPointsChartEmployeesTotalperYearSecond.push({
            label: item.Employee,
            y: item.Total
          });
        });
        this.chartEmployeesTotalperYearSecond.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.employeesTotalperYearThird$.subscribe({
      next: (data: any) => {
        const items: any[] = data.employees;
        items.map((item: any) => {
          this.dataPointsChartEmployeesTotalperYearThird.push({
            label: item.Employee,
            y: item.Total
          });
        });
        this.chartEmployeesTotalperYearThird.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.customersCountOrdersPerYearFirst$.subscribe({
      next: (data: any) => {
        const items: any[] = data.employees;
        items.map((item: any) => {
          this.dataPointsCustomersCountOrdersPerYearFirst.push({
            label: item.Customer,
            y: item.Total
          });
        });
        this.chartCustomersCountOrdersPerYearFirst.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.customersCountOrdersPerYearSecond$.subscribe({
      next: (data: any) => {
        const items: any[] = data.employees;
        items.map((item: any) => {
          this.dataPointsCustomersCountOrdersPerYearSecond.push({
            label: item.Customer,
            y: item.Total
          });
        });
        this.chartCustomersCountOrdersPerYearSecond.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });

    this.customersCountOrdersPerYearThird$.subscribe({
      next: (data: any) => {
        const items: any[] = data.employees;
        items.map((item: any) => {
          this.dataPointsCustomersCountOrdersPerYearThird.push({
            label: item.Customer,
            y: item.Total
          });
        });
        this.chartCustomersCountOrdersPerYearThird.render();
      },
      error: (err) => {
        this._snackBar.open(err.message, 'Close', {
          duration: this.snackDuration
        });
      }
    });
  }

  ngOnDestroy(): void {
    console.log('DashboardBrowserComponent onDestroy...');
  }

  getChartInstanceSalesTotalPerYear(chart: object) {
    this.chartSalesTotalPerYear = chart;
  }

  getChartInstanceSalesTotalAmountPerYear(chart: object) {
    this.chartSalesTotalAmountPerYear = chart;
  }

  getChartInstanceCustomersCountPerYear(chart: object) {
    this.chartCustomersCountPerYear = chart;
  }

  getChartInstanceCustomersCountOrdersPerYearFirst(chart: object) {
    this.chartCustomersCountOrdersPerYearFirst = chart;
  }

  getChartInstanceCustomersCountOrdersPerYearSecond(chart: object) {
    this.chartCustomersCountOrdersPerYearSecond = chart;
  }

  getChartInstanceCustomersCountOrdersPerYearThird(chart: object) {
    this.chartCustomersCountOrdersPerYearThird = chart;
  }

  getChartInstanceemployeesTotalperYearFirst(chart: object) {
    this.chartEmployeesTotalperYearFirst = chart;
  }

  getChartInstanceemployeesTotalperYearSecond(chart: object) {
    this.chartEmployeesTotalperYearSecond = chart;
  }

  getChartInstanceemployeesTotalperYearThird(chart: object) {
    this.chartEmployeesTotalperYearThird = chart;
  }
}
