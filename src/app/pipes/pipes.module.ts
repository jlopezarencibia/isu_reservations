import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemDatePipe} from "./item-date.pipe";



@NgModule({
  declarations: [
      ItemDatePipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        ItemDatePipe
    ]
})
export class PipesModule { }
