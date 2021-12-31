import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteServeiceService {

  constructor(private http:HttpClient) { }

  getAllAirportsByCategoryId( input: any, page: number ): Observable<any>{
    // getAllAirportsByCategoryId(){

    let header = new HttpHeaders();      
    let otp_header = header.append('Content-Type', 'application/json');
    console.log(otp_header.get('Content-Type')) 
    // return this.http.get( 'https://3.14.228.194:18083/topContent/topContentByCtgId?ctgId='+  id ,  { headers:otp_header } );
    // return this.http.get( "http://182.74.113.62:9797/api/airports?keyword=" + input ,  { headers:otp_header } );
  
     return this.http.get( "assets/autocomplete-json/category.json");
   
    //  this.http.get( "assets/flightsJson/category.json")
    // .subscribe((data)=>{
  
    //   console.log(data);
  
    // });
  
  }

}
