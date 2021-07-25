import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReservationListComponent} from './reservation-list.component';
import {RouterModule} from "@angular/router";
import {ItemReservationModule} from "../../../components/item-reservation/item-reservation.module";
import {NgbDropdownModule, NgbPaginationModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    ReservationListComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
                {
                    path: '',
                    component: ReservationListComponent
                }
            ]
        ),
        ItemReservationModule,
        NgbPaginationModule,
        NgbDropdownModule,
        FontAwesomeModule,
        PipesModule,
        NgbRatingModule,
    ]
})
export class ReservationListModule {
}
