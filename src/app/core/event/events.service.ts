import {Injectable} from '@angular/core';
import {Subject, from} from 'rxjs';

/**
 * Send and receive events with the .on .broadcast syntax.
 */
@Injectable()
export class EventsService {

    private events: any;
    private eventsSubject: any;
    private listeners: any;

    constructor() {
        this.listeners = {};
        this.eventsSubject = new Subject();
        this.events = from(this.eventsSubject);
        this.events.subscribe(({name, args}: any) => {
            if (this.listeners[name]) {
                for (const listener of this.listeners[name]) {
                    listener(...args);
                }
            }
        });
    }

    on(name: string, listener: any): void {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    }

    broadcast(name: string, ...args: Array<any>): void {
        this.eventsSubject.next({
            name,
            args
        });
    }

    destroyListener(name: string, listener: any): void {
        if (this.listeners[name] && this.listeners[name].indexOf(listener) > -1) {
            this.listeners[name].splice(this.listeners[name].indexOf(listener), 1);
        }
    }
}
