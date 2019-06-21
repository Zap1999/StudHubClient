import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Question } from '../model/question.model';
import {Feedback} from "../model/feedback.model";

@Injectable({
    providedIn: 'root'
  })
  export class FeedbackService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/feedback';
      }

    createFeedback(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(`${this.apiUrl}/create`, feedback);
    }
  }