import { Component, OnInit } from '@angular/core';
import {ClientControllerService} from "../../../api/services/client-controller.service";
import {Observable} from "rxjs";
import {ClientEntity} from "../../../api/models/client-entity";
import {tap} from "rxjs/operators";
import {Client} from "../../../api/models/client";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

    clients$: Observable<ClientEntity[]>;
  constructor(
      private readonly clientController: ClientControllerService,
  ) {
      this.clients$ = clientController.all1().pipe(tap(value => console.log(value)));
  }

  ngOnInit(): void {
  }

}
