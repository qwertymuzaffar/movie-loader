import {SafeResourceUrl} from '@angular/platform-browser';

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Movies {
    movies: Movie[];
}

export interface Movie {
    id: null;
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

export interface TrailersResponse {
    id: number;
    results: Trailer[];
}

export interface Trailer {
    id: number;
    key: string;
    name: string;
    type: string;
    site: string;
    url: SafeResourceUrl;
}

export interface Genres {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}
