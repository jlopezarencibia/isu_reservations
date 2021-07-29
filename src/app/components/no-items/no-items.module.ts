import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoItemsComponent } from './no-items.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
    declarations: [
        NoItemsComponent
    ],
    exports: [
        NoItemsComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class NoItemsModule { }
