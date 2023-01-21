// /* eslint-disable @typescript-eslint/no-inferrable-types */
// import { Component, Input, OnInit } from '@angular/core';
// import { MaterialBtnAlign } from '../enums/enums';
// import { MtDialogActionsContent } from '../interfaces/dialog-actions-content.interface';

// @Component({
//   selector: 'nx-northwind-mt-dialog',
//   template: `   <h2 mat-dialog-title>{{title}}</h2>
//        <mat-dialog-content class="mat-typography" *ngIf="content">
//          {{content}}
//        </mat-dialog-content>
//        <mat-dialog-actions align="end">
//          <button mat-button mat-dialog-close>OK</button>
//          <button mat-button mat-dialog-close cdkFocusInitial>
//          CANCEL
//          </button>
//        </mat-dialog-actions> `,
//   styleUrls: ['./mt-dialog.component.scss']
// })
// export class MtDialogComponent implements OnInit {
//   @Input() title: string = 'Install Angular';
//   @Input() content: string = 'Material dialog content';
//   @Input() dialogAction: MtDialogActionsContent = {
//     aling: MaterialBtnAlign.Start,
//     buttons: [
//       {
//         text: 'Cancel',
//       },
//       {
//         text: 'Install',
//       },
//     ],
//   };

//   constructor() {
//     console.log('nx-northwind-mt-dialog constructor...');
//   }

//   ngOnInit(): void {
//     console.log('nx-northwind-mt-dialog OnInit...');
//   }

//    openDialog(): void {
//      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//        width: '250px',
//       // data: {name: this.name, animal: this.animal},
//      });
//    }

//    onNoClick(): void {
//      this.dialogRef.close();
//    }
// }
