import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientListComponent} from './client-list.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {PageHeaderModule} from "../../../components/page-header/page-header.module";
import {NoItemsModule} from "../../../components/no-items/no-items.module";



@NgModule({
  declarations: [
    ClientListComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ClientListComponent
            }
        ]),
        FontAwesomeModule,
        FormsModule,
        NgbPaginationModule,
        PageHeaderModule,
        NoItemsModule
    ]
})
export class ClientListModule { }
