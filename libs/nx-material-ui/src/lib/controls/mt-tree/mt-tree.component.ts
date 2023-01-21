/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nx-northwind-mt-tree',
  template: `
    <cdk-tree [dataSource]="matTreeDs" [treeControl]="treeControl">
      <!-- child nodes -->
      <cdk-tree-node
        *cdkTreeNodeDef="let node"
        cdkTreeNodePadding
        [style.display]="shouldRender(node) ? 'flex' : 'none'"
        style="cursor: pointer"
        class="example-tree-node"
        (click)="node.command()">
        <!-- use a disabled button to provide padding for tree leaf -->
        <button mat-icon-button disabled></button>
        {{ node.name }}
      </cdk-tree-node>

      <!-- master nodes -->
      <cdk-tree-node
        *cdkTreeNodeDef="let node; when: hasChild"
        cdkTreeNodePadding
        [style.display]="shouldRender(node) ? 'flex' : 'none'"
        class="example-tree-node">
        <button
          mat-icon-button
          cdkTreeNodeToggle
          [attr.aria-label]="'Toggle ' + node.name"
          (click)="node.isExpanded = !node.isExpanded"
          [style.visibility]="node.expandable ? 'visible' : 'hidden'">
          <mat-icon class="mat-icon-rtl-mirror">
            {{
              treeControl.isExpanded(node)
                ? 'expand_more'
                : 'chevron_right'
            }}
          </mat-icon>
        </button>
        {{ node.name }}
      </cdk-tree-node>
    </cdk-tree>
  `,
  styleUrls: ['./mt-tree.component.scss']
})
export class MtTreeComponent implements OnInit {
  @Input() dataSource: any[] = [];
  matTreeDs: any;

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  hasChild = (_: number, node: any) => node.expandable;

  constructor() {
    console.log('nx-northwind-mt-tree constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-tree OnInit...');
    this.matTreeDs = new ArrayDataSource(this.dataSource);
  }

  shouldRender(node: any) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  getParentNode(node: any) {
    const nodeIndex = this.dataSource.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.dataSource[i].level === node.level - 1) {
        return this.dataSource[i];
      }
    }

    return null;
  }

  test(): void {
    console.log('Clicked');
  }
}
