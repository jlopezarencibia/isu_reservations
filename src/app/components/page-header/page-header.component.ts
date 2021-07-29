import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

    @Input() pageTitle = '';
    @Input() pageDescription = '';
    @Input() buttonText = '';
    @Input() buttonLink = '';
    @Input() buttonShow = true;

    constructor(private readonly router: Router) {

    }

    ngOnInit(): void {
    }

    doNavigate = () => this.router.navigate([this.buttonLink]);

}
