/* tslint:disable */
/* eslint-disable */
import { ReservationEntity } from './reservation-entity';
export interface ClientEntity {
  birthDate?: string;
  description?: string;
  id?: number;
  name?: string;
  phone?: string;
  reservations?: Array<ReservationEntity>;
  type?: string;
}
