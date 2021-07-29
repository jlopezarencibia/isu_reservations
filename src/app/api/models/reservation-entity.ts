/* tslint:disable */
/* eslint-disable */
import { ClientEntity } from './client-entity';
export interface ReservationEntity {
  client?: ClientEntity;
  date?: string;
  favorite?: boolean;
  id?: number;
  image?: string;
  location?: string;
  ranking?: number;
}
