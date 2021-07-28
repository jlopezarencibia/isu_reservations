import { Component } from '@angular/core';
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "./services/app.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // ICONS
  icRight = faCaretRight;
  icLeft = faCaretLeft;

  path: Observable<string>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appService: AppService
  ) {
    this.path = appService.path;
  }
}

export enum ActionType {
    CREATE = 'create',
    EDIT = 'edit',
    CANCEL = 'cancel'
}
