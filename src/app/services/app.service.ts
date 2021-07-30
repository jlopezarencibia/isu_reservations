import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor() {
    }

    path = new BehaviorSubject('');

    /**
     * Sets the current path
     *
     * @param pathSegment the path segment
     * */
    setPath(pathSegment: string) {
        this.path.next(pathSegment);
    }

    /**
     * Set the RTF Editor configuration
     * */
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
            // uploadUrl: 'http://localhost:8080/api/upload/file',
            // upload: (file: File) => {
            //     return this.uploadController.uploadFile({body: {file: file}}).pipe(
            //         map((input) => {
            //             console.log(input);
            //             a: HttpEventType<UploadResponse>
            //             return HttpEventType.Response
            //         })
            //     )
            // }
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

    /**
     * Convert the date in milliseconds to <code>NgbDateStruct</code>
     *
     * @param dateInMillis the date in millis
     * @return NgbDateStruct - the date
     * */
    getNgbDate(dateInMillis: string) {
        const date = moment(dateInMillis, 'x');
        const year: number = parseInt(date.format('YYYY'));
        const month: number = parseInt(date.format('MM'));
        const day: number = parseInt(date.format('DD'));
        return {year, month, day};
    }

    /**
     * Convert the <code>NgbDateStruct</code> date into milliseconds
     *
     * @param ngbDate the <code>NgbDateStruct</code> date
     * @return string -the date in milliseconds
     * */
    getDateInMilis(ngbDate: NgbDateStruct): string {
        return moment((ngbDate.year + '-' + ngbDate.month + '-' + ngbDate.day), 'YYYY-MM-DD').format('x');
    }

    /**
     * Convert the <code>NgbDateStruct</code> date and the <code>NgbTimeStruct</code> time into milliseconds
     *
     * @param date the <code>NgbDateStruct</code> date
     * @param time the <code>NgbTimeStruct</code> time
     * @return string -the date in milliseconds
     * */
    getDateTimeInMillis(date: NgbDateStruct, time: NgbTimeStruct): string {
        // console.log(date);
        // console.log(time);
        return moment((date.year + '-' + date.month + '-' + date.day + ' ' + time.hour + ':' + time.minute), 'YYYY-MM-DD HH:mm').format('x')
    }


    /**
     * Convert the date in milliseconds to <code>NgbTimeStruct</code>
     *
     * @param dateInMillis the date in millis
     * @return NgbTimeStruct - the time
     * */
    getNgbTime(dateInMillis: string): NgbTimeStruct {
        const date = moment(dateInMillis, 'x');
        const hour = parseInt(date.format('HH'));
        const minute = parseInt(date.format('mm'));
        const second = 0;
        return {hour, minute, second}
    }

}
