import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Reservation} from "../api/model/reservation";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor() {

    }

    path = new BehaviorSubject('');

    setPath(pathSegment: string) {
        this.path.next(pathSegment);
    }

    generateDummyReservations(): Reservation[] {
        const reservations: Reservation[] = [];
        reservations.push(new Reservation('Second Dock', moment('May 17 2021 9:00 pm', 'MMM DD YYYY h:mm a').toString(), 4, true, '', 0));
        reservations.push(new Reservation('Primer Puerto', moment('May 18 2021 8:00 pm', 'MMM DD YYYY h:mm a').toString(), 3, false, '', 1));
        reservations.push(new Reservation('Stella', moment('May 20 2021 7:00 pm', 'MMM DD YYYY h:mm a').toString(), 2, false, '', 2));
        reservations.push(new Reservation('Island Creek', moment('May 21 2021 8:00 pm', 'MMM DD YYYY h:mm a').toString(), 2, false, '', 3));
        reservations.push(new Reservation('Fogo the Chao', moment('May 17 2021 9:00 pm', 'MMM DD YYYY h:mm a').toString(), 2, true, '', 4));
        reservations.push(new Reservation('Fontana', moment('May 23 2021 8:00 pm', 'MMM DD YYYY h:mm a').toString(), 2, false, '', 5));
        reservations.push(new Reservation('Island Creek', moment('May 24 2021 9:00 pm', 'MMM DD YYYY h:mm a').toString(), 1, true, '', 6));
        reservations.push(new Reservation('Fogo de Chao', moment('May 25 2021 8:00 pm', 'MMM DD YYYY h:mm a').toString(), 0, false, '', 7));
        return reservations;
    }

}
