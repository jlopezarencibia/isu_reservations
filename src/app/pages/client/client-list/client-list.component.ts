import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientControllerService} from "../../../api/services/client-controller.service";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {ClientEntity} from "../../../api/models/client-entity";
import {mapTo, mergeAll, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {ClientsSortType} from "../../../app.component";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

@AutoUnsubscribe()
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

    // PAGE INFO
    pageTitle = '';
    pageDescription = '';
    pagePath = '';

    // FLAGS
    pageSize = 10;
    page = 1;
    sortBy = 'name';
    sortDirection = 'ASC';
    sortOption = ClientsSortType.NAME_ASC;

    // ASYNC
    clients$?: Observable<ClientEntity[]>;
    clientsSubject$ = new BehaviorSubject(this.sortOption);
    loading$?: Observable<boolean>;
    count$?: Observable<number>;

    // ICON
    icAsc = faChevronUp;
    icDesc = faChevronDown;

  constructor(
      private readonly clientController: ClientControllerService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly appService: AppService,
  ) {
      this.clients$ = clientController.all1();
      this.pageTitle = activatedRoute.snapshot.data.name;
      this.pageDescription = activatedRoute.snapshot.data.description;
      this.pagePath = activatedRoute.snapshot.data.path;
      this.appService.setPath(this.pagePath)
  }

    ngOnDestroy(): void {
    }

  ngOnInit(): void {
      const clientsStream = this.clientsSubject$.pipe(
          switchMap((input) => {
              this.sortOption = input;
              this.setSortOptions(input);
              // console.log(this.sortOption);
              // console.log('Getting reservations...');
              this.clients$ = this.clientController.getPaged({
                  options: {
                      page: this.page - 1,
                      pageSize: this.pageSize,
                      sortBy: this.sortBy,
                      sortDirection: this.sortDirection
                  }
              }).pipe(
                  tap((v) => console.log(v))
              )
              return of(false);
          }),
      )

      this.loading$ = from([clientsStream, this.clientsSubject$.pipe(mapTo(false))]).pipe(mergeAll());
      this.count$ = this.clientController.amount();
  }

    setSortOptions(option: ClientsSortType) {
        console.log('setSortOptions -> ', option);
        switch (option) {
            case ClientsSortType.NAME_ASC: {
                this.sortBy = 'name';
                this.sortDirection = 'ASC';
                break;
            }
            case ClientsSortType.NAME_DESC: {
                this.sortBy = 'name';
                this.sortDirection = 'DESC';
                break;
            }
            case ClientsSortType.DATE_ASC: {
                this.sortBy = 'birthDate';
                this.sortDirection = 'ASC';
                break;
            }
            case ClientsSortType.DATE_DESC: {
                this.sortBy = 'birthDate';
                this.sortDirection = 'DESC';
                break;
            }
            case ClientsSortType.TYPE_ASC: {
                this.sortBy = 'type';
                this.sortDirection = 'ASC';
                break;
            }
            case ClientsSortType.TYPE_DESC: {
                this.sortBy = 'type';
                this.sortDirection = 'DESC';
                break;
            }
        }
        console.log('Sort by: ', this.sortBy);
        console.log('Sort dir: ', this.sortDirection);
    }

    loadList(sortOption: ClientsSortType) {
        console.log('loadList -> ', sortOption)
        this.clientsSubject$.next(sortOption);
    }

    // onSort(sortEvent: SortEvent) {
    //     console.log('onSort -> ', sortEvent)
    //     const sortType:ClientsSortType = (sortEvent.column+sortEvent.direction) as ClientsSortType;
    //     this.setSortOptions(sortType);
    //     this.sortOption = sortType;
    //     console.log('onSort -> T: ', sortType)
    //     this.loadList(sortType);
    // }

    doSort(sortBy: string) {
      const sDir = this.sortDirection == 'ASC' ? '_desc' : '_asc';
      const opt = sortBy+sDir as ClientsSortType;
      this.loadList(opt);
    }
}

