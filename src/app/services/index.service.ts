import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  private _db = inject(DataService);

  constructor(
    private http: HttpClient,
  ) {}

  getData(): Observable<any>{
    return this.http.get('../assets/data/data.json');
  }

}
