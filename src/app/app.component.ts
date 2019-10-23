import {Component} from '@angular/core';

import {EventsService} from './core/event/events.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // TOASTER
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right',
        showCloseButton: true,
        mouseoverTimerStop: true
    });

    constructor(private toasterService: ToasterService,
                private eventsService: EventsService) {
        eventsService.on('toaster', this.pop);
    }

    private pop = (obj: any) => {
        this.toasterService.pop(obj.type, obj.title, obj.message);
    }
}
