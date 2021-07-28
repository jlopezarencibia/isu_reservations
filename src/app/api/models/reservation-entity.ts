/* tslint:disable */
/* eslint-disable */
import { ClientEntity } from './client-entity';
export interface ReservationEntity {
  client?: ClientEntity;
  date?: string;
  favorite?: boolean;
  id?: number;
  location?: string;
  ranking?: number;
}
