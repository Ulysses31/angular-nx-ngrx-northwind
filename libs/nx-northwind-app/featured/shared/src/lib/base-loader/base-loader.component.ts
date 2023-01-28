/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { Observable } from 'rxjs';
import { FunctionButtons } from '../interfaces/function-buttons.interface';
@Component({
  selector: 'nx-northwind-base-loader',
  templateUrl: './base-loader.component.html',
  styleUrls: ['./base-loader.component.scss']
})
export class BaseLoaderComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() title!: string;
  @Input() model$!: any;
  @Input() error!: Observable<any>;
  @Input() fnButtons: FunctionButtons[] = [];
  errorMessage!: string;

  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public isModelVisible?: boolean = false;

  constructor() {
    console.log('BaseLoaderComponent constructor...');
  }

  ngOnInit(): void {
    console.log('BaseBrowserComponent ngOnInit...');

    this.initFunctionButtons();

    this.error.subscribe((data) => {
      this.errorMessage = data ? data.error.message : '';
    });
  }

  ngAfterViewInit(): void {
    console.log('BaseBrowserComponent ngAfterViewInit...');
  }

  ngOnDestroy(): void {
    console.log('BaseBrowserComponent ngOnDestroy...');
  }

  private initFunctionButtons(): void {
    this.fnButtons.push({
      id: 'model',
      label: 'Model',
      toolTipMessage: 'Toggle view model state',
      disabled: false,
      icon: '',
      color: MaterialColor.Basic,
      command: () => (this.isModelVisible = !this.isModelVisible)
    });

    this.fnButtons.unshift({
      id: 'back',
      label: 'Back',
      toolTipMessage: 'Navigate back',
      disabled: false,
      icon: '',
      color: MaterialColor.Basic,
      command: () => history.back()
    });
  }
}
