import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

/* components */
import {MoviesComponent} from './movies.component';

/* services */
import {MoviesService} from './movies.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
    {path: '', component: MoviesComponent},
    {path: 'detail/:movieId', component: MovieDetailComponent}
];

@NgModule({
    declarations: [
        MoviesComponent,
        MovieDetailComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        MoviesService
    ]
})
export class MoviesModule {
}
