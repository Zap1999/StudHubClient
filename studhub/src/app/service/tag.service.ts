import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base-service';
import { Tag } from './../model/tag.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class TagService extends BaseService {
      
    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/tags';
      }

    getTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this.apiUrl}`);
    }
  }