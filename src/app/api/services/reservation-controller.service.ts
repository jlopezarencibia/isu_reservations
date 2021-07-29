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

import { PageSort } from '../models/page-sort';
import { Reservation } from '../models/reservation';
import { ReservationEntity } from '../models/reservation-entity';

@Injectable({
  providedIn: 'root',
})
export class ReservationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation all
   */
  static readonly AllPath = '/api/reservations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `all()` instead.
   *
   * This method doesn't expect any request body.
   */
  all$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ReservationEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.AllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReservationEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `all$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  all(params?: {
  }): Observable<Array<ReservationEntity>> {

    return this.all$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReservationEntity>>) => r.body as Array<ReservationEntity>)
    );
  }

  /**
   * Path part for operation create
   */
  static readonly CreatePath = '/api/reservations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: {
    body?: Reservation
  }): Observable<StrictHttpResponse<ReservationEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.CreatePath, 'post');
    if (params) {
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
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: {
    body?: Reservation
  }): Observable<ReservationEntity> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<ReservationEntity>) => r.body as ReservationEntity)
    );
  }

  /**
   * Path part for operation findById
   */
  static readonly FindByIdPath = '/api/reservations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ReservationEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.FindByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: {
    id: number;
  }): Observable<ReservationEntity> {

    return this.findById$Response(params).pipe(
      map((r: StrictHttpResponse<ReservationEntity>) => r.body as ReservationEntity)
    );
  }

  /**
   * Path part for operation removeById
   */
  static readonly RemoveByIdPath = '/api/reservations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ReservationEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.RemoveByIdPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `removeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeById(params: {
    id: number;
  }): Observable<ReservationEntity> {

    return this.removeById$Response(params).pipe(
      map((r: StrictHttpResponse<ReservationEntity>) => r.body as ReservationEntity)
    );
  }

  /**
   * Path part for operation update
   */
  static readonly UpdatePath = '/api/reservations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: {
    id: number;
    body: ReservationEntity
  }): Observable<StrictHttpResponse<ReservationEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.UpdatePath, 'patch');
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
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: {
    id: number;
    body: ReservationEntity
  }): Observable<ReservationEntity> {

    return this.update$Response(params).pipe(
      map((r: StrictHttpResponse<ReservationEntity>) => r.body as ReservationEntity)
    );
  }

  /**
   * Path part for operation toggleFavorite
   */
  static readonly ToggleFavoritePath = '/api/reservations/favorite/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `toggleFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  toggleFavorite$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ReservationEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.ToggleFavoritePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `toggleFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  toggleFavorite(params: {
    id: number;
  }): Observable<ReservationEntity> {

    return this.toggleFavorite$Response(params).pipe(
      map((r: StrictHttpResponse<ReservationEntity>) => r.body as ReservationEntity)
    );
  }

  /**
   * Path part for operation paged
   */
  static readonly PagedPath = '/api/reservations/paged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `paged()` instead.
   *
   * This method doesn't expect any request body.
   */
  paged$Response(params: {
    options: PageSort;
  }): Observable<StrictHttpResponse<Array<ReservationEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.PagedPath, 'get');
    if (params) {
      rb.query('options', params.options, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReservationEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `paged$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  paged(params: {
    options: PageSort;
  }): Observable<Array<ReservationEntity>> {

    return this.paged$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReservationEntity>>) => r.body as Array<ReservationEntity>)
    );
  }

  /**
   * Path part for operation count
   */
  static readonly CountPath = '/api/reservations/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `count()` instead.
   *
   * This method doesn't expect any request body.
   */
  count$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, ReservationControllerService.CountPath, 'get');
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
   * To access the full response (for headers, for example), `count$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  count(params?: {
  }): Observable<number> {

    return this.count$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
