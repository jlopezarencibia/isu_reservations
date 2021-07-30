import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'itemDate'
})
export class ItemDatePipe implements PipeTransform {

    /**
     * Transforms the Date from milliseconds to the desired format
     *
     * <code>ex: Thursday Jul 29 at 11:00 pm </code>
     *
     * @return string - the Date in the desired format
     * */
    transform(value: string): string {
        const date = moment(value, 'x');
        return date.format('dddd MMM DD') + ' at ' + date.format('h:mm a');
    }

}
