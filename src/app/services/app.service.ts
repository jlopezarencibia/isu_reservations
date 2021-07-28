import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";
import {Reservation} from "../api/models/reservation";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {parse} from "@fortawesome/fontawesome-svg-core";

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
        reservations.push({
            location: 'Second Dock',
            date: moment('May 17 2021 9:00 pm', 'MMM DD YYYY h:mm a').toString(),
            ranking: 4,
            favorite: true
        });
        return reservations;
    }

    getEditorConfig(): AngularEditorConfig {
        return {
            editable: true,
            spellcheck: true,
            height: 'auto',
            minHeight: '200px',
            maxHeight: 'auto',
            width: 'auto',
            minWidth: '0',
            translate: 'yes',
            enableToolbar: true,
            showToolbar: true,
            placeholder: 'Enter text here...',
            defaultParagraphSeparator: '',
            defaultFontName: '',
            defaultFontSize: '',
            fonts: [
                {class: 'arial', name: 'Arial'},
                {class: 'times-new-roman', name: 'Times New Roman'},
                {class: 'calibri', name: 'Calibri'},
                {class: 'comic-sans-ms', name: 'Comic Sans MS'}
            ],
            // customClasses: [
            //     {
            //         name: 'quote',
            //         class: 'quote',
            //     },
            //     {
            //         name: 'redText',
            //         class: 'redText'
            //     },
            //     {
            //         name: 'titleText',
            //         class: 'titleText',
            //         tag: 'h1',
            //     },
            // ],
            // uploadUrl: 'api/image',
            // upload: (file: File) => { ... }
            uploadWithCredentials: false,
            sanitize: true,
            toolbarPosition: 'top',
            toolbarHiddenButtons: [
                [
                    'heading',
                    // 'undo',
                    // 'redo',
                    // 'bold',
                    // 'italic',
                    // 'underline',
                    'strikeThrough',
                    'subscript',
                    'superscript',
                    // 'justifyLeft',
                    // 'justifyCenter',
                    // 'justifyRight',
                    // 'justifyFull',
                    'indent',
                    'outdent',
                    // 'insertUnorderedList',
                    // 'insertOrderedList',
                    'heading',
                    'fontName'
                ],
                [
                    'fontSize',
                    'textColor',
                    'backgroundColor',
                    'customClasses',
                    // 'link',
                    // 'unlink',
                    // 'insertImage',
                    'insertVideo',
                    // 'insertHorizontalRule',
                    'removeFormat',
                    // 'toggleEditorMode'
                ]
            ]
        }
    }

    getNgbDate(dateInMilis: string) {
        const date = moment(dateInMilis, 'x');
        const year: number = parseInt(date.format('YYYY'));
        const month: number = parseInt(date.format('MM'));
        const day: number = parseInt(date.format('DD'));
        return {year, month, day};
    }

    getDateInMilis(ngbDate: NgbDateStruct): string {
        return moment((ngbDate.year + '-' + ngbDate.month + '-' + ngbDate.day), 'YYYY-MM-DD').format('x');
    }

    getDateTimeInMilis(date: NgbDateStruct, time: NgbTimeStruct): string {
        console.log(date);
        console.log(time);
        return moment((date.year + '-' + date.month + '-' + date.day + ' ' + time.hour + ':' + time.minute), 'YYY-MM-DD HH:mm').format('x')
    }

    getNgbTime(dateInMilis: string): NgbTimeStruct {
        const date = moment(dateInMilis, 'xx');
        const hour = parseInt(date.format('HH'));
        const minute = parseInt(date.format('MM'));
        const second = 0;
        return {hour, minute, second}
    }

}
