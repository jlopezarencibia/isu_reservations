import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationEditComponent } from './reservation-edit.component';
import {RouterModule} from "@angular/router";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    ReservationEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReservationEditComponent
      }
    ]),
    NgbDropdownModule,
    FontAwesomeModule
  ]
})
export class ReservationEditModule { }
