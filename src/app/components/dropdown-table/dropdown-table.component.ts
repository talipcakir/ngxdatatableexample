import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {debounceTime, fromEvent, map} from "rxjs";

@Component({
  selector: 'app-dropdown-table',
  templateUrl: './dropdown-table.component.html',
  styleUrl: './dropdown-table.component.css'
})
export class DropdownTableComponent implements AfterViewInit {
  @Input() rows: any = [];
  @Input() columns: any[] = [
    {prop: 'id'},
    {name: 'Name'}
  ];
  @Output() selectedIl = new EventEmitter<string>();

  ColumnMode = ColumnMode;
  searchOnFocus: boolean = false;

  temp: any;
  selectedIlValue = '';

  @ViewChild('search', {static: false}) search: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.temp = this.rows;
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map((x: any) => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.rows = this.temp.filter((item: any) => {
      for (let i = 0; i < count; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          return true;
        }
      }
      return false;
    });
  }

  filterFunction(event: any) {
    let searchText = event.target.value;
    this.rows.filter((x: any) => x?.id?.indexOf(searchText) || x?.name?.indexOf(searchText))
  }

  focusIn() {
    this.searchOnFocus = true;
  }

  focusOut() {
    setTimeout(() => {
      this.searchOnFocus = false;
    }, 100)
  }

  onActivate($event: any) {
    if($event.type == 'click') {
      console.log($event.row);
      this.selectedIl.emit($event.row?.id);
      this.selectedIlValue = $event.row?.name;
    }
  }
}
