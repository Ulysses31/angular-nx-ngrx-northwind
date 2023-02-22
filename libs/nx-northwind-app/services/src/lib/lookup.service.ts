/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private dialogRef?: MatDialogRef<any>;

  constructor(private lookupDialog: MatDialog) {
    console.log('LookupService constructor...');
  }

  /**
   *
   * @param paramArgs arguments from call
   * @param component component to display in modal dialog
   * @param data data needed for the component
   * @returns MatDialogRef<any>
   */
  openLookup(
    paramArgs: any,
    component: any,
    data: any
  ): MatDialogRef<any> {
    if (!paramArgs) paramArgs = null;

    return this.lookupDialog.open(component, {
      disableClose: true,
      width: '70%',
      //height: '100%',
      data
    });
  }
}
