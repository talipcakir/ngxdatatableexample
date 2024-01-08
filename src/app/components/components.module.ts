import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatatableViewComponent} from "./datatable/datatable.component";
import {HeaderComponent} from "./header/header.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownTableComponent} from "./dropdown-table/dropdown-table.component";
import {CustomModule} from "../modules/custom.module";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    DatatableViewComponent,
    HeaderComponent,
    DropdownTableComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    CustomModule,
    NgxDatatableModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  exports: [
    DatatableViewComponent,
    HeaderComponent,
    DialogComponent
  ]
})
export class ComponentsModule {
}
