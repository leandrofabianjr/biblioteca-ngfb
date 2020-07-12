import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface GoogleBook {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    },
    pageCount: number;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    }
  };

}

export interface GoogleApiResponse<T> {
  kind: string;
  totalItems: number;
  items: T[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  private API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {
  }

  search(query: string): Observable<GoogleApiResponse<GoogleBook>> {
    return this.http
      .get<GoogleApiResponse<GoogleBook>>(`${this.API}?q=${query}`);
  }
}
