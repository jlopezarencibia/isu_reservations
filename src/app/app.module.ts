import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {CustomDateParserFormatter} from "./services/CustomDateParserFormatter";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FontAwesomeModule,
    ],
    providers: [{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
