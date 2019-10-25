import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {MoviesResponse, Movie, TrailersResponse, Genres} from './movies.interface';

@Injectable()
export class MoviesService {

    private apiHost = 'https://api.themoviedb.org/3';
    private apiKey = '15541eba921815cd9399ab49a5977f16';
    constructor(private http: HttpClient) {

    }

    getMovies(genreId?: number): Observable<MoviesResponse> {
        const obj: any = {
            sort_by: 'popularity.desc',
            api_key: this.apiKey
        };
        if (genreId) {
            obj.with_genres = genreId;
        }
        const params = new HttpParams({fromObject: obj});
        return this.http.get<MoviesResponse>(`${this.apiHost}/discover/movie`, {params});
    }

    getMovie(movieId: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.apiHost}/movie/${movieId}?api_key=${this.apiKey}`);
    }

    /* Получить список трейлеров или видео */
    getVideos(movieId: number): Observable<TrailersResponse> {
        return this.http.get<TrailersResponse>(`${this.apiHost}/movie/${movieId}/videos?api_key=${this.apiKey}`);
    }

    getGenres(): Observable<Genres> {
        return this.http.get<Genres>(`${this.apiHost}/genre/movie/list?api_key=15541eba921815cd9399ab49a5977f16`);
    }
}
