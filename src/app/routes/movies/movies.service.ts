import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {MoviesResponse, Movie, TrailersResponse, Genres} from './movies.interface';

@Injectable()
export class MoviesService {

    private apiHost = 'https://api.themoviedb.org/3';
    private apiKey = '15541eba921815cd9399ab49a5977f16';
    constructor(private http: HttpClient) {

    }

    getMovies(genreId: number): Observable<MoviesResponse> {

        let url = `${this.apiHost}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}`;

        if (genreId) {
            url = url + `&with_genres=${genreId}`;
        }

        return this.http.get(url)
            .pipe(
                map((res: MoviesResponse) => res)
            );
    }

    getMovie(movieId: number): Observable<Movie> {
        return this.http.get(`${this.apiHost}/movie/${movieId}?api_key=${this.apiKey}`)
            .pipe(
                map((res: Movie) => res)
            );
    }

    /* Получить список трейлеров или видео */
    getVideos(movieId: number): Observable<TrailersResponse> {
        return this.http.get(`${this.apiHost}/movie/${movieId}/videos?api_key=${this.apiKey}`)
            .pipe(
                map((res: TrailersResponse) => res)
            );
    }

    getGenres(): Observable<Genres> {
        return this.http.get(`${this.apiHost}/genre/movie/list?api_key=15541eba921815cd9399ab49a5977f16`)
            .pipe(
                map((res: Genres) => res)
            );
    }
}
