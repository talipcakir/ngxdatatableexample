import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IlceModel, IlModel } from '../../models/data-model';
import { JsonService } from '../../services/json.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableViewComponent implements OnInit, OnDestroy {

  @ViewChild('table') table: DatatableComponent | any;
  rows: any[] = [];
  isEditable: any = {};

  ilData: IlModel[] | any;
  ilceData: IlceModel[] | any;

  changeList: any = [];
  changeText: boolean = false;

  protected subscriptions$: Subject<boolean> = new Subject();

  constructor(
    private readonly jsonService: JsonService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    const ilPath = 'assets/iller.json';
    const ilcePath = 'assets/ilceler.json';

    this.jsonService.get(ilPath)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((iller) => {
        this.ilData = iller;
      });
    this.jsonService.get(ilcePath)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((ilceler) => {
        this.ilceData = ilceler;
        this.rows = ilceler;
      });
  }

  getIlName(id: string) {
    if (this.ilData) {
      let data = this.ilData.find((data: any) => data?.id === id);
      return data?.name;
    }
  }

  save(row: any, rowIndex: any) {
    this.openDialog('1ms', '1ms')
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((x: any) => {
        if (x) {
          this.isEditable[rowIndex] = !this.isEditable[rowIndex];
          this.rows[rowIndex].il_id = this.changeList.find((x: any) => x.rowId === rowIndex)?.id;
        } else {
          this.rows[rowIndex].il_id = this.ilceData[rowIndex].il_id;
        }
      });
  }

  delete(row: any, rowIndex: any) {
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
    this.rows[rowIndex].il_id = this.ilceData[rowIndex].il_id;
  }

  selectIlData($event: string, rowIndex: number) {
    this.changeList.push({ id: $event, rowId: rowIndex });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, detail?: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { detail, returnData: false }
    });
    return dialogRef.afterClosed();
  }


  ngOnDestroy() {
    this.subscriptions$.next(true);
    this.subscriptions$.complete();
  }

  saveAll() {
    this.openDialog('1ms', '1ms')
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((x: any) => {
        if (x) {
          this.changeList.map((x: any) => {
            this.rows[x.rowId].il_id = x.id;
          });
          this.isEditable = {};
        }
      });
  }

  editClick(row: any, rowIndex: any) {
    this.isEditable[rowIndex]=!this.isEditable[rowIndex];
    this.changeText = true;
  }
}
