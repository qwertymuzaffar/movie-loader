import {Routes} from '@angular/router';

import {LayoutComponent} from '../layout/layout.component';
// import {Error404Component} from './pages/error404/error404.component';
// import {Error500Component} from './pages/error500/error500.component';

export const appRoutes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'movies', loadChildren: './movies/movies.module#MoviesModule' },
        ]
    },

    // Not lazy-loaded routes
    // {path: '404', component: Error404Component},
    // {path: '500', component: Error500Component},

    // Not found
    {path: '**', redirectTo: '404'}

];
