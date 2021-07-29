import {Component, Input, OnInit} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-no-items',
    templateUrl: './no-items.component.html',
    styleUrls: ['./no-items.component.css']
})
export class NoItemsComponent implements OnInit {

    // ICONS
    icSad = faPlus;

    @Input() message = '';
    @Input() description = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
