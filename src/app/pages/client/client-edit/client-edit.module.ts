import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientEditComponent } from './client-edit.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbAlertModule, NgbDatepickerModule, NgbDropdownModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../../components/page-header/page-header.module";



@NgModule({
  declarations: [
    ClientEditComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ClientEditComponent
            }
        ]),
        FontAwesomeModule,
        NgbDropdownModule,
        AngularEditorModule,
        FormsModule,
        NgbDatepickerModule,
        NgbTypeaheadModule,
        NgbAlertModule,
        PageHeaderModule,
    ]
})
export class ClientEditModule { }
