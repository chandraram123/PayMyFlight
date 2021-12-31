import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Oneway } from 'src/app/home-model/oneway';

@Injectable({
  providedIn: 'root'
})
export class FlightsearchServiceService {

  

  constructor(
                private http:HttpClient,
              ) { }

  todayDate() {
    let ndate = new Date();
    return ndate;
  }
  
  getSingleFlights( origin: any, destination: any,date: any): Observable<any>{
    // getAllFlightsByCategoryId(){

    let header = new HttpHeaders();      
    let otp_header = header.append('Content-Type', 'application/json');
    console.log(otp_header.get('Content-Type')) 
    // return this.http.get( 'https://3.14.228.194:18083/topContent/topContentByCtgId?ctgId='+  id ,  { headers:otp_header } );
    // return this.http.get( 'http://182.74.113.62:9797/api/cheapest?destination='+destination+'&origin='+origin+'&departureDate='+date ,  { headers:otp_header } );
    // return this.http.get( this.GET_ALL_SONGS_BY_CATEGORY_ID +  id ,  { headers:otp_header } );
  
     return this.http.get( "assets/Json/OneWay.Json");
    // return this.http.get( "http://182.74.113.62:9797/api/airports?keyword=del");
    //  this.http.get( "assets/flightsJson/category.json")
    // .subscribe((data)=>{
  
    //   console.log(data);
  
    // });
    
  
  }



  
  // don't use "any", type your data instead!
private apiData = new BehaviorSubject<any>(null);
public apiData$ = this.apiData.asObservable();

fetchData(body: any) {

//  const headers = new HttpHeaders({ 'Authorization': sessionStorage.getItem("token"), 'Content-Type': 'application/json' })
// const headers = new HttpHeaders({ 'Authorization': sessionStorage.getItem("token"), 'Content-Type': 'application/json' })
 
  // let headers = new HttpHeaders().set('Content-Type', 'application/json');
                                
    // let header = new HttpHeaders();      
    // let otp_header = header.set('Content-Type', 'application/json');
    // console.log(headers.get('Content-Type'));
    // console.log(headers.get('Authorization')) 
   
  // return this.http.get("assets/Json/OneWay.Json").pipe((data) => {
    return this.http.post('https://restapidemo.myfarebox.com/api/v2/Search/Flight',body ).pipe((data) => {
    return data;
    console.log(data)
    
  })
}
// here we set/change value of the observable
setData(data) { 
   this.apiData.next(data)
}

 















}
