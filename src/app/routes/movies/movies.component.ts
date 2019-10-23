import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MoviesService} from './movies.service';
import {MoviesResponse, Genre} from './movies.interface';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

    movies: MoviesResponse;
    genres: Genre[];

    private destroy$ = new Subject();
    constructor(private moviesService: MoviesService) {
    }

    ngOnInit() {
        this.getMovies(null);
        this.getGenres();
    }

    onGenreChange(e) {
        const value = Number(e.target.value);

        this.getMovies(value);
    }

    private getMovies(genreId: number) {
        this.moviesService.getMovies(genreId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                if (x) {
                    this.movies = x;
                }
            });
    }

    private getGenres() {
        this.moviesService.getGenres()
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                if (x) {
                    this.genres = x.genres;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
