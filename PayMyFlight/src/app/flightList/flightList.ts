import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/service/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlightsearchServiceService } from '../home-services/flightsearch/flightsearch-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutocompleteServeiceService } from '../home-services/autocomplete/autocomplete-serveice.service';
declare var $: any;
@Component({
  selector: 'flightList-page',
  templateUrl: './flightList.html',
  styleUrls: ['./flightList.css']
})
export class FlightList implements OnInit {
  
  public filteredContentFlight: any[];
  public filteredContentFlightRound: any[];
  data: any;
  defaultFlag: any;
  rootType: any;
  defaultAdults: number;

  userData: any[] = [];
  userList1: any;
  userList2: any;

  lastkeydown1: number = 0;
  lastkeydown2: number = 0;
  subscription: any;
 
  loginForm: FormGroup;
  public result= {
    departure_flight:[],
    arrival_flight:[]
}
  public PAYMENT_METHOD_TYPE = {
    // BANK: 'bank',
    CARD: 'card',
    UPI: 'upi'
    };
  
 

   constructor(private formBuilder: FormBuilder,
               private http: HttpClient,
               private flightSerchService: FlightsearchServiceService,
               private autocompleteService: AutocompleteServeiceService,
               private router: Router) {

    // this.defaultFlag = 1;
    this.defaultAdults=1;
    // this.defaultChilds=0;
    // this.defaultInfants=0;
    // this.defaultTravelClass="Economy";

    this.loginForm = this.formBuilder.group({

      // rootType: ['', Validators.required],
      rootType: new FormControl('', [Validators.required,]),
      paymentMethod: this.initPaymentMethodFormGroup(),
     
        selectAdults: new FormControl('', []),
        selectChildren: new FormControl('', []),
        selectInfants: new FormControl('', []),
        selectClass: new FormControl('', []),
        selectPreferredAirline: new FormControl('', []),
    
    });

    }

  ngOnInit() {

    

    // if(LocalStorageService.isLoggedIn()){
    //   this.queryUserProfileData = LocalStorageService.getUserData();
    // }
    // this.isLoggedIn = LocalStorageService.getIsLoggedIn();
    // if(this.isLoggedIn){
    //   this.agentPhone=LocalStorageService.getUser().phone;
    //   this.userType = LocalStorageService.getUserTypeString();
    //   if(this.userType==2){
    //     this.userData = LocalStorageService.getUserData();
    //   }

    // }

    this.getSingleFlights();
    
    let defaultFlag = sessionStorage.getItem("defaultFlag");
    this.defaultFlag = JSON.parse(defaultFlag)
    // let rootType = sessionStorage.getItem("rootType");
    // if(JSON.parse(rootType)==1){
    //   sessionStorage.setItem("rootType",JSON.stringify(2));
    // }else{
    //   sessionStorage.setItem("rootType",JSON.stringify(1));
    // }
    
    let dataHoroscope = localStorage.getItem("OnewayJson");
    let reaponse: any = JSON.parse(dataHoroscope)
    console.log(reaponse.Data);
    // ==========================
    const get_flight_sq=(data_,DepartureCode, ArrivalCode)=>{
    let result= {
        departure_flight:[],
        arrival_flight:[]
    }
    
    data_.forEach((i)=>{
       if(i.DepartureAirportLocationCode+i.ArrivalAirportLocationCode!=DepartureCode) {
         result.departure_flight.push('D:'+JSON.stringify(i))
     } else{
         result.arrival_flight.push('A:'+JSON.stringify(i))
        //  result.departure_flight.arrival_flight
     } 
        
    })
  
   return result
    
}

// const result= get_flight_sq(data.Data.FlightSegmentList,'BLR','')
reaponse.Data.FlightSegmentList.forEach((i)=>{
  const result= get_flight_sq(reaponse.Data.FlightSegmentList, i.ArrivalAirportLocationCode+i.DepartureAirportLocationCode,'')
  this.result.arrival_flight=result.arrival_flight
  this.result.departure_flight=result.departure_flight
  console.log(result);
  // console.log();
})
let result1: any=[];
for(let i=0;i<(this.result.departure_flight.length||this.result.arrival_flight.length);i++){
  console.log(this.result.arrival_flight[i]);
  result1.push(this.result.arrival_flight[i]+this.result.departure_flight[i]);
  console.log(result1);
}
this.filteredContentFlight=result1;
// const result= get_flight_sq(data.Data.FlightSegmentList, '','')
// console.log(result)
    // ==========================
    // this.filteredContentFlight=reaponse.Data.FlightSegmentList;
    // this.filteredContentFlight=this.result.arrival_flight;
    console.log(this.filteredContentFlight);

    this.subscribePaymentTypeChanges();
    this.setPaymentMethodType(this.PAYMENT_METHOD_TYPE.UPI);
  }
  setPaymentMethodType(type: string) {
    console.log((<any>this.loginForm).controls.rootType.value);
      // sessionStorage.setItem("rootType",JSON.stringify((<any>this.loginForm).controls.rootType.value));
      console.log(this.defaultFlag);
      // let rootType = sessionStorage.getItem("rootType");
      // if(((<any>this.loginForm).controls.rootType.value||rootType)==1){
      //   sessionStorage.setItem("rootType",JSON.stringify(2));
      // }else{
      //   sessionStorage.setItem("rootType",JSON.stringify(1));
      // }
      let rootTypeNew = sessionStorage.getItem("rootType");
      // this.defaultFlag = JSON.parse(rootTypeNew)
      //      console.log(this.defaultFlag);
    // update payment method type value
    const ctrl: FormControl = (<any>this.loginForm).controls.paymentMethod.controls.type;
    ctrl.setValue(type);

    $(function(){
      var dtToday = new Date();
      
      var month:any = dtToday.getMonth() + 1;
      var day:any = dtToday.getDate();
      var year = dtToday.getFullYear();
      if(month < 10)
          month = '0' + month.toString();
      if(day < 10)
          day = '0' + day.toString();
      
      var maxDate = year + '-' + month + '-' + day;
      // alert(maxDate);
      $("#DepartDate1").attr('min', maxDate);
      $("#roundtripReturnDate").attr('min', maxDate);
      $("#bankDepartDate2").attr('min', maxDate);
      $("#bankDepartDate3").attr('min', maxDate);

      $("#DepartDate1").on('change', function() { 
  
        // var datearray = $("#DepartDate1").val().split("-");
        var datearray1 = $("#DepartDate1").val();
    
        // var montharray = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
    
        // var year = "20" + datearray[2];
    
        // var month = montharray.indexOf(datearray[1])+1;
    
        // var day = datearray[0];
    
        // var minDate = (year +"-"+ month +"-"+ day);
        var minDate = ('20' +"-"+ '09' +"-"+ '2020');
    
        // $("#roundtripReturnDate").attr('min',minDate); 
        $("#roundtripReturnDate").attr('min',datearray1); 
    
      });
      $("#DepartDate1").on('change', function() { 
  
        var datearray1 = $("#DepartDate1").val();
    
        $("#bankDepartDate2").attr('min',datearray1); 
    
      });
      $("#bankDepartDate2").on('change', function() { 
  
        var datearray1 = $("#bankDepartDate2").val();
    
        $("#bankDepartDate3").attr('min',datearray1); 
    
      });

  });

  
  // $(document).ready(function () {

  //   $("#DepartDate1").on('change', function() { 
  
  //     var datearray = $("#DepartDate1").val().split("-");
  
  //     var montharray = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
  
  //     var year = "20" + datearray[2];
  
  //     var month = montharray.indexOf(datearray[1])+1;
  
  //     var day = datearray[0];
  
  //     var minDate = (year +"-"+ month +"-"+ day);
  
  //     $("#roundtripReturnDate").attr('min',minDate); 
  
  //   });
  
  // });
  
  //  this.f();
  }

  initPaymentMethodFormGroup() {
    // initialize payment method form group
    const group = this.formBuilder.group({
        type: [''],
        card: this.formBuilder.group(this.initPaymentMethodCardModel()),
        // bank: this.formBuilder.group(this.initPaymentMethodBankModel()),
        upi: this.formBuilder.group(this.initPaymentMethodUpiModel())
    });

    return group;
}
initPaymentMethodCardModel() {
  // initialize card model

  // regex for master, visa, amex card
  // you get valid testing credit card from http://www.getcreditcardnumbers.com/
  const cardNoRegex = `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$`;

  // regex for expiry format MM/YY
  const expiryRegex = `^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$`;

  const model = {
      // cardNo: ['', [Validators.required, Validators.pattern(cardNoRegex)]],
      // cardHolder: ['', Validators.required],
      // expiry: ['', [Validators.required, Validators.pattern(expiryRegex)]]
      // OnewayFromPlace1: new FormControl('', [Validators.required,]),
      // OnewayToPlace1: new FormControl('', [Validators.required,]),

      OnewayFromPlace: ['', Validators.required],
      OnewayToPlace: ['', Validators.required],
      OnewayDeparture: ['',Validators.required],
      // RoundtripReturnOn1: ['', Validators.required],
      // RoundtripReturnOn1: ['', if(rootType==){Validators.required, } ],
      
  };

  return model;
}
// initPaymentMethodBankModel() {
//   // initialize bank model
//   const model = {
//     MultiCityFromPlace1: ['', Validators.required],
//     MultiCityToPlace1: ['', Validators.required],
//     RoundtripDepartOn1:['',Validators.required],
//     MultiCityFromPlace2: ['', Validators.required],
//     MultiCityToPlace2: ['', Validators.required],
//     RoundtripDepartOn2:['',Validators.required],
//     MultiCityFromPlace3: ['', ],
//     MultiCityToPlace3: ['', ],
//     RoundtripDepartOn3:['',],
      
//   };

//   return model;
// }

initPaymentMethodUpiModel(){

  const model = {

    roundTripFromPlace: ['', Validators.required],
    roundTripToPlace: ['', Validators.required],
    roundTripDeparture: ['',Validators.required],
    roundTripReturn: ['', Validators.required],
    
};

return model;

}
subscribePaymentTypeChanges() {
  // controls
  const pmCtrl = (<any>this.loginForm).controls.paymentMethod;
  // const bankCtrl = pmCtrl.controls.bank;
  const cardCtrl = pmCtrl.controls.card;
  const upiCtrl = pmCtrl.controls.upi;

  // initialize value changes stream
  const changes$ = pmCtrl.controls.type.valueChanges;

  // subscribe to the stream
  changes$.subscribe(paymentMethodType => {
      // // BANK
      // if (paymentMethodType === this.PAYMENT_METHOD_TYPE.BANK) {
       
      //     Object.keys(bankCtrl.controls).forEach(key => {
      //         bankCtrl.controls[key].setValidators(this.initPaymentMethodBankModel()[key][1]);
      //         bankCtrl.controls[key].updateValueAndValidity();
      //     });

      //     // remove all validators from card fields
      //     Object.keys(cardCtrl.controls).forEach(key => {
      //         cardCtrl.controls[key].setValidators(null);
      //         cardCtrl.controls[key].updateValueAndValidity();
      //     });

      //      // remove all validators from upi fields
      //      Object.keys(upiCtrl.controls).forEach(key => {
      //       upiCtrl.controls[key].setValidators(null);
      //       upiCtrl.controls[key].updateValueAndValidity();
      //   });
      // }

      // CARD
      if (paymentMethodType === this.PAYMENT_METHOD_TYPE.CARD) {
        // if (this.defaultFlag == 1 || paymentMethodType == 2 || paymentMethodType == 1) {

         // apply validators to each card fields, retrieve validators from card model
         Object.keys(cardCtrl.controls).forEach(key => {
          cardCtrl.controls[key].setValidators(this.initPaymentMethodCardModel()[key][1]);
          cardCtrl.controls[key].updateValueAndValidity();
      });

          // // remove all validators from bank fields
          // Object.keys(bankCtrl.controls).forEach(key => {
          //     bankCtrl.controls[key].setValidators(null);
          //     bankCtrl.controls[key].updateValueAndValidity();
          // });

           // remove all validators from upi fields
           Object.keys(upiCtrl.controls).forEach(key => {
            upiCtrl.controls[key].setValidators(null);
            upiCtrl.controls[key].updateValueAndValidity();
        });

         
      }

        // UPI
        if (paymentMethodType === this.PAYMENT_METHOD_TYPE.UPI) {
          // if (this.defaultFlag == 1 || paymentMethodType == 2 || paymentMethodType == 1) {

           // apply validators to each upi fields, retrieve validators from upi model
           Object.keys(upiCtrl.controls).forEach(key => {
            upiCtrl.controls[key].setValidators(this.initPaymentMethodUpiModel()[key][1]);
            upiCtrl.controls[key].updateValueAndValidity();
        });

            // // remove all validators from bank fields
            // Object.keys(bankCtrl.controls).forEach(key => {
            //     bankCtrl.controls[key].setValidators(null);
            //     bankCtrl.controls[key].updateValueAndValidity();
            // });
  
             // remove all validators from card fields
             Object.keys(cardCtrl.controls).forEach(key => {
              cardCtrl.controls[key].setValidators(null);
              cardCtrl.controls[key].updateValueAndValidity();
          });
  
           
        }


  });
}
  // ===========Autocomplete start=======================

  getUserIdsSecondtWay($event) {
    
    let userId = (<HTMLInputElement>document.getElementById('dynamicUserIdsSecondWay')).value;

    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown2 > 200) {

        //Get the user data from users.json
    this.autocompleteService.getAllAirportsByCategoryId(userId,1).subscribe(
      data => {
        // console.log(data.data);
        // console.log(data.data.data);
        // let matches = [], i;
        // for ( i = 0; i < data.data.data.length; i++) {
        //   matches.push(data.data.data[i].detailedName + data.data.data[i].iataCode);
        //   // matches.push(matches.concat(data.data.data[i].iataCode));
        //   console.log(data.data.data[i]);
        // }
        // console.log(matches);
        // Object.assign(this.userData, matches);
        
        let matches = [] , i;
        for ( i = 0; i < data.data.length; i++) {
          matches.push(data.data[i].city.toUpperCase()+',' + data.data[i].country.toUpperCase()+','+ data.data[i].name.toUpperCase()+',' + data.data[i].code.toUpperCase());
          // matches.push(matches.concat(data.data.data[i].iataCode));
          // console.log(data.data[i]);
        }
        // matches= matches.toUpperCase()
        // console.log(matches);
        Object.assign(this.userData, matches);
      },
      error => {
        console.log("Something wrong here");
      }); 

      userId= userId.toUpperCase();
        this.userList2 = this.searchFromArray(this.userData, userId);

        $('#dynamicUserIdsSecondWay').autocomplete({
          autoFocus: true,
          source: this.userList2,
          
         
        //   select: function( event, ui ) {
        //   $( this ).val(ui.item.value );
        //   const code= ui.item.value;
        //  console.log( code.length);
        // //  console.log( code.reverse);

        //  let matches = [],matches1 = [], i;
        //  for ( i = 0; i < code.length; i++) {
        //    matches.push(code[i]);
        //  }

        //  matches=matches.reverse();
        //  console.log(matches);
        //  for ( i = 0; i <3; i++) {
        //   matches1.push(matches[i]);
        // }

        // matches1=matches1.reverse();
        // console.log(matches1);
        // this.OnewayFromPlace11=matches1;
        // console.log(this.OnewayFromPlace11);
        //  }
        // });
     
     
      // $('#dynamicUserIdsSecondWay').autocomplete({
      //   autoFocus: true,
      //   source:function (request, response) {
      //     response($.map(this.userList2,function(item){
      //       return{
      //         value:item.value,
      //       }
      //     }))
      //   },
       
       
        select: function( event, ui ) {
          // this.loginForm.controls.paymentMethod.controls.card.controls.OnewayFromPlace1.set('');
          // this.OnewayFromPlace1.value=(ui.item.value);
          // this.OnewayFromPlace1 =    $(this).val(( .OnewayFromPlace1 ));
          // this.OnewayFromPlace1 =    $( "#dynamicUserIdsSecondWay" ).val( ui.item.label, );
          $( this ).val( ui.item.value );
          // $( "#project-description" ).html( ui.item.desc );
          // return this.OnewayFromPlace1value;
       }
      });
    
    

        $('ul.ui-autocomplete')
        .css('fontSize', '10px')
        .css({
          fontSize: '10px',
           border: '1px solid #ccc',
           position: 'absolute',
           top: '100%',
           left: 0,
          'z-index': '1000',
          float: 'left',
          display: 'none',
          'min-width': '160px',
          'max-width': '270px',
          padding: '4px 0',
          margin: '0 0 10px 25px',
          'list-style': 'none',
         'background-color': '#ffffff',
        'border-color':'rgba(0, 0, 0, 0.2)',
        'border-style':'solid',
        'border-width':'1px',
        '-webkit-border-radius': '5px',
        '-moz-border-radius': '5px',
        'border-radius': '5px',
        '-webkit-box-shadow':' 0 5px 10px rgba(0, 0, 0, 0.2)',
        '-moz-box-shadow': '0 5px 10px rgba(0, 0, 0, 0.2)',
        'box-shadow': '0 5px 10px rgba(0, 0, 0, 0.2)',
        '-webkit-background-clip': 'padding-box',
        '-moz-background-clip': 'padding',
        'background-clip': 'padding-box',
        '*border-right-width': '2px',
        '*border-bottom-width': '2px',
        'max-height': '200px', 'overflow-y': 'scroll', 'overflow-x': 'hidden',
      }) ;
      

      }
    }
  }
  getUserIdsSecondtWay1($event) {
    
    let userId = (<HTMLInputElement>document.getElementById('dynamicUserIdsSecondWay1')).value;

    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown2 > 200) {
        
        //Get the user data from users.json
    this.autocompleteService.getAllAirportsByCategoryId(userId,1).subscribe(
      data => {
        // // console.log(data.data.data);
        // let matches = [], i;
        // for ( i = 0; i < data.data.data.length; i++) {
        //   matches.push(data.data.data[i].detailedName + data.data.data[i].iataCode);
        //   console.log(data.data.data[i]);
        // }
        // console.log(matches);
        // Object.assign(this.userData, matches);

         let matches = [], i;
         for ( i = 0; i < data.data.length; i++) {
          matches.push(data.data[i].city.toUpperCase()+',' + data.data[i].country.toUpperCase()+','+ data.data[i].name.toUpperCase()+',' + data.data[i].code.toUpperCase());
          //  console.log(data.data[i]);
         }
        //  console.log(matches);
         Object.assign(this.userData, matches);
      },
      error => {
        console.log("Something wrong here");
      }); 

      userId= userId.toUpperCase()
        this.userList1 = this.searchFromArray(this.userData, userId);


        $('#dynamicUserIdsSecondWay1').autocomplete({
          autoFocus: true,
          source: this.userList1,
          messages: {
            noResults: '',
            results: function (event, ui) { }
          }
        });

       

        $('ul.ui-autocomplete')
        .css('fontSize', '5px')
        .css({
          fontSize: '10px',
           border: '1px solid #ccc',
           position: 'absolute',
           top: '100%',
           left: 0,
          'z-index': '1000',
          float: 'left',
          display: 'none',
          'min-width': '160px',
          'max-width': '270px',
          padding: '4px 0',
          margin: '0 0 10px 25px',
          'list-style': 'none',
         'background-color': '#ffffff',
        'border-color':'rgba(0, 0, 0, 0.2)',
        'border-style':'solid',
        'border-width':'1px',
        '-webkit-border-radius': '5px',
        '-moz-border-radius': '5px',
        'border-radius': '5px',
        '-webkit-box-shadow':' 0 5px 10px rgba(0, 0, 0, 0.2)',
        '-moz-box-shadow': '0 5px 10px rgba(0, 0, 0, 0.2)',
        'box-shadow': '0 5px 10px rgba(0, 0, 0, 0.2)',
        '-webkit-background-clip': 'padding-box',
        '-moz-background-clip': 'padding',
        'background-clip': 'padding-box',
        '*border-right-width': '2px',
        '*border-bottom-width': '2px',

        'max-height': '200px', 'overflow-y': 'auto', 'overflow-x': 'hidden',

      }) ;
      

      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    console.log(matches);
    return matches;
  };

  // ================Autocomplete end=========================
  // userLoggedIn(){
  //   this.isLoggedIn = LocalStorageService.getIsLoggedIn();
  //   console.log("Login")
  
  // }
  // userLoggedOut(){
  //   this.isLoggedIn = LocalStorageService.getIsLoggedIn();
  //   console.log("Logout")
  
  // }
  getReturnFlights(){
    console.log(JSON.stringify(this.loginForm.value))
    this. getSingleFlights();
  }

  getSingleFlights() {
   
    this.flightSerchService.apiData$.subscribe(data => this.data = data)
    console.log(this.data);
    // // if (this.voucherCode && this.voucherCode + "".length > 0) {
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    //   this.RechargeUsingCHiLiVoucherNumber = sessionStorage.getItem("sessionLoginNumber");
    //   this.loading = true;
      

    //   this.http.get('https://selfcare.chili.mu:8080/vc/cardRecharge/' + this.RechargeUsingCHiLiVoucherNumber + "/" + this.voucherCode, { headers: headers })
     this.http.get('assets/js/flights.json')

        .subscribe(data => {
          // console.log(data);
          let reaponse: any = data;
          console.log(reaponse);
          // this.filteredContentFlight=reaponse;
          // this.loading = false;
          let status: string = reaponse.status;
          let message: string = reaponse.message;
          // if (status.indexOf("ERROR") == -1) {
          //   if (reaponse.data.indexOf('SUCCESS_OK') > -1) {
          //   // if (status ==  "SUCCESSFUL" && message == "Request Successful") {
           
          //   //alert("Dear Customer,your Advance Credit Loan has been granted. Thank you")
          //   // this.closeModal("#subscriberLoyaltyPointsMTML2ModalHTML");
          //   // this.openModal("#RechargeSuccessModal");
          //   // this.voucherCode = "";
          // }
         
          // else {
            
          //   // this.closeModal("#subscriberLoyaltyPointsMTML2ModalHTML");
          //   // this.openModal("#OperationFailedModal");
          // }
        },
          error => {
            // this.loading = false;
            alert(error.data)
            console.log(JSON.parse(error.data));

          });
    // }
    // else {
    //   alert("Pleasee fill all required Feilds");
    // }



  }

}
