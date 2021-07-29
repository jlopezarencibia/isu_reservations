/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Client } from '../models/client';
import { ClientEntity } from '../models/client-entity';
import { PageSort } from '../models/page-sort';
import { Reservation } from '../models/reservation';
import { ReservationEntity } from '../models/reservation-entity';

@Injectable({
  providedIn: 'root',
})
export class ClientControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation all1
   */
  static readonly All1Path = '/api/clients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `all1()` instead.
   *
   * This method doesn't expect any request body.
   */
  all1$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ClientEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.All1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClientEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `all1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  all1(params?: {
  }): Observable<Array<ClientEntity>> {

    return this.all1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClientEntity>>) => r.body as Array<ClientEntity>)
    );
  }

  /**
   * Path part for operation add
   */
  static readonly AddPath = '/api/clients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add$Response(params: {
    body: Client
  }): Observable<StrictHttpResponse<ClientEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.AddPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add(params: {
    body: Client
  }): Observable<ClientEntity> {

    return this.add$Response(params).pipe(
      map((r: StrictHttpResponse<ClientEntity>) => r.body as ClientEntity)
    );
  }

  /**
   * Path part for operation reserve
   */
  static readonly ReservePath = '/api/clients/reserve/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reserve()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  reserve$Response(params: {
    id: number;
    body: Reservation
  }): Observable<StrictHttpResponse<ReservationEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.ReservePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReservationEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `reserve$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  reserve(params: {
    id: number;
    body: Reservation
  }): Observable<ReservationEntity> {

    return this.reserve$Response(params).pipe(
      map((r: StrictHttpResponse<ReservationEntity>) => r.body as ReservationEntity)
    );
  }

  /**
   * Path part for operation findById1
   */
  static readonly FindById1Path = '/api/clients/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ClientEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.FindById1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: {
    id: number;
  }): Observable<ClientEntity> {

    return this.findById1$Response(params).pipe(
      map((r: StrictHttpResponse<ClientEntity>) => r.body as ClientEntity)
    );
  }

  /**
   * Path part for operation remove
   */
  static readonly RemovePath = '/api/clients/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remove()` instead.
   *
   * This method doesn't expect any request body.
   */
  remove$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ClientEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.RemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `remove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remove(params: {
    id: number;
  }): Observable<ClientEntity> {

    return this.remove$Response(params).pipe(
      map((r: StrictHttpResponse<ClientEntity>) => r.body as ClientEntity)
    );
  }

  /**
   * Path part for operation edit
   */
  static readonly EditPath = '/api/clients/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `edit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit$Response(params: {
    id: number;
    body: Client
  }): Observable<StrictHttpResponse<ClientEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.EditPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `edit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit(params: {
    id: number;
    body: Client
  }): Observable<ClientEntity> {

    return this.edit$Response(params).pipe(
      map((r: StrictHttpResponse<ClientEntity>) => r.body as ClientEntity)
    );
  }

  /**
   * Path part for operation getPaged
   */
  static readonly GetPagedPath = '/api/clients/paged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaged()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaged$Response(params: {
    options: PageSort;
  }): Observable<StrictHttpResponse<Array<ClientEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.GetPagedPath, 'get');
    if (params) {
      rb.query('options', params.options, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClientEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPaged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaged(params: {
    options: PageSort;
  }): Observable<Array<ClientEntity>> {

    return this.getPaged$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClientEntity>>) => r.body as Array<ClientEntity>)
    );
  }

  /**
   * Path part for operation findByName
   */
  static readonly FindByNamePath = '/api/clients/find/{term}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByName$Response(params: {
    term: string;
  }): Observable<StrictHttpResponse<Array<ClientEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.FindByNamePath, 'get');
    if (params) {
      rb.path('term', params.term, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClientEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByName(params: {
    term: string;
  }): Observable<Array<ClientEntity>> {

    return this.findByName$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClientEntity>>) => r.body as Array<ClientEntity>)
    );
  }

  /**
   * Path part for operation amount
   */
  static readonly AmountPath = '/api/clients/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `amount()` instead.
   *
   * This method doesn't expect any request body.
   */
  amount$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.AmountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `amount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  amount(params?: {
  }): Observable<number> {

    return this.amount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation removeById1
   */
  static readonly RemoveById1Path = '/api/clients/remove/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ClientEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.RemoveById1Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeById1(params: {
    id: number;
  }): Observable<ClientEntity> {

    return this.removeById1$Response(params).pipe(
      map((r: StrictHttpResponse<ClientEntity>) => r.body as ClientEntity)
    );
  }

}
