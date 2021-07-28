import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list.component';
import {RouterModule} from "@angular/router";
import {ClientEditComponent} from "../client-edit/client-edit.component";



@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild([
          {
              path: '',
              component: ClientListComponent
          }
      ])
  ]
})
export class ClientListModule { }
