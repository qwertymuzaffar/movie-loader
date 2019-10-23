import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MoviesService} from '../movies.service';

import {Movie, TrailersResponse} from '../movies.interface';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    movieId: number;
    destroy$ = new Subject();
    movie: Movie;
    trailers: TrailersResponse;
    constructor(private route: ActivatedRoute,
                private moviesService: MoviesService,
                private sanitizer: DomSanitizer) {
        this.movieId = Number(this.route.snapshot.params['movieId']);
    }

    ngOnInit() {
        this.getMovie(this.movieId);
        this.getVideos(this.movieId);
    }

    private getMovie(movieId: number) {
        this.moviesService.getMovie(movieId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                if (x) {
                    this.movie = x;
                }
            });
    }

    private getVideos(movieId: number) {
        this.moviesService.getVideos(movieId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                if (x) {

                    if (!x.results.length) {
                        return;
                    }

                    for (let i = 0; i < x.results.length; i++) {
                        const video = x.results[i];

                        if (video.site === 'YouTube') {
                            video.url = this.cleanURL(`https://www.youtube.com/embed/${video.key}`);
                        }
                    }

                    this.trailers = x;
                }
            });
    }

    private cleanURL(oldURL: string)  {
        return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
