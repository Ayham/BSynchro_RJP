import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public static BaseUrl = 'https://localhost:44302/api';
    constructor(private http: HttpClient) 
    { }

    get<T>(url: string, param: HttpParams): Observable<any> 
    {
     // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
      
      return this.http.get<T>(ApiService.BaseUrl + url, {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }),
        params: param
      }).pipe(
        tap( // Log the result or error
        {
          next: (data) => data,
          error: (error) => this.showError(error)
        }
        )
      );    
    }  
    
  post<T>(url: string, param: HttpParams, data: any ): Observable<any> 
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    return this.http.post<T>(ApiService.BaseUrl + url, data, {
      headers: headers,
      params: param
    }).pipe(
      tap( // Log the result or error
      {
        next: (data) => data,
        error: (error) => this.showError(error)
      }
      )
    );
    }  
    showError(error: any): void {
        throw new Error("Error in call api.");
    }
}

