import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoutesModule} from '../routes/routes.module';

import {LayoutComponent} from './layout.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        RoutesModule,
        CommonModule
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {
}
