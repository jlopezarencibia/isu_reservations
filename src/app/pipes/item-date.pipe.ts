import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'itemDate'
})
export class ItemDatePipe implements PipeTransform {

  transform(value: string): string {
      const date = moment(value, 'x');
    return date.format('dddd MMM DD') + ' at ' + date.format('h:mm a');
  }

}
