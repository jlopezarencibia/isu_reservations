import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationEditComponent } from './reservation-edit.component';
import {RouterModule} from "@angular/router";
import {NgbDatepickerModule, NgbDropdownModule, NgbRatingModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";



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
        FontAwesomeModule,
        FormsModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        NgbRatingModule
    ]
})
export class ReservationEditModule { }
