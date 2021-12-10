import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AggregatedDataSeries {
  name: string;
  data: [string, number][];
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getData(): Observable<AggregatedDataSeries[]> {
    return this.http.get<AggregatedDataSeries[]>('/api/data/by-days');
  }
}
