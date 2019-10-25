import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MoviesService} from '../movies.service';

import {Movie, TrailersResponse} from '../movies.interface';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    movieId: number;
    movie: Movie;
    trailers: TrailersResponse;

    private destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private moviesService: MoviesService,
        private sanitizer: DomSanitizer) {
        this.movieId = +this.route.snapshot.params.movieId;
    }

    ngOnInit() {
        this.getMovie(this.movieId);
        this.getVideos(this.movieId);
    }

    private getMovie(movieId: number) {
        this.moviesService.getMovie(movieId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((movie: Movie) => {
                this.movie = movie;
            });
    }

    private getVideos(movieId: number) {
        this.moviesService.getVideos(movieId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((trailers: TrailersResponse) => {
                if (trailers && trailers.results.length) {
                    this.setTrailersURL(trailers);
                    this.trailers = trailers;
                }
            });
    }

    private setTrailersURL(trailers) {
        for (const trailer of trailers.results) {
            if (trailer.site === 'YouTube') {
                trailer.url = this.cleanURL(`https://www.youtube.com/embed/${trailer.key}`);
            }
        }
    }

    private cleanURL(oldURL: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
