import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Giphy } from '../../shared/giphy';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GiphyService {

  private API_URL = '//api.giphy.com/v1/gifs/search';
  private API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';
  public pageSize = 20;

  constructor(private http: HttpClient) { }

  get(term: string, page: number): Observable<Giphy> {
    const URL = `${this.API_URL}?api_key=${this.API_KEY}&limit=${this.pageSize}&offset=${(page - 1) * this.pageSize}&q=${term}`

    return this.http.get<Giphy>(URL);
  }
}
