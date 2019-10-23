import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';

import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {EventsService} from './core/event/events.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        LayoutModule,
        ToasterModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        RoutesModule,
    ],
    providers: [
        EventsService,
        ToasterService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
