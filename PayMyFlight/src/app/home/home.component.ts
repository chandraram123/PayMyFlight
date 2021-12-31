import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../core/service/local-storage.service';
import { Constants } from '../core/constants';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightsearchServiceService } from '../home-services/flightsearch/flightsearch-service.service';
import { AutocompleteServeiceService } from '../home-services/autocomplete/autocomplete-serveice.service';


declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  //  @Output() mUserLoggedIn = new EventEmitter();
  //  @Output() mUserLoggedOut = new EventEmitter(); 

  defaultFlag: any;
  rootType: number;

  defaultAdults: number;

  userData: any[] = [];
  userList1: any;
  userList2: any;

  lastkeydown1: number = 0;
  lastkeydown2: number = 0;
  subscription: any;
 
  loginForm: FormGroup;
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

    this.defaultFlag = 1;
    this.rootType=1;
    this.defaultAdults=1;
    // this.defaultChilds=0;
    // this.defaultInfants=0;
    // this.defaultTravelClass="Economy";

    this.loginForm = this.formBuilder.group({

      // rootType: ['', Validators.required],
      rootType: new FormControl('', [Validators.required,]),
      paymentMethod: this.initPaymentMethodFormGroup(),
      // fromPlace: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(30),
      //   Validators.pattern('^[a-zA-Z ]*$')]),
      //   toPlace: new FormControl('', [Validators.required,]),
    
        selectAdults: new FormControl('', []),
        selectChildren: new FormControl('', []),
        selectInfants: new FormControl('', []),
        selectClass: new FormControl('', []),
        selectPreferredAirline: new FormControl('', []),
    
    });

    }
//     ngAfterViewInit() {
//     $('.hero-slider').slick({
//       autoplay: true,
//       autoplaySpeed: 7500,
//       pauseOnFocus: false,
//       pauseOnHover: false,
//       infinite: true,
//       arrows: true,
//       fade: true,
//       prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
//       nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
//       dots: true
//   });
//   $('.hero-slider').slickAnimation();
//   $('[data-background]').each(function () {
//     $(this).css({
//         'background-image': 'url(' + $(this).data('background') + ')'
//     });
// });
 
// }

// @ViewChild('Appheader',{static: false}) header:HeaderComponent;



  ngOnInit() {
    // console.log(this.rootType);
    // sessionStorage.setItem("rootType",JSON.stringify(this.rootType));
    console.log(this.defaultFlag);
      
        // sessionStorage.setItem("defaultFlag",JSON.stringify(this.defaultFlag));
        // let rootType = sessionStorage.getItem("rootType");
        // if(JSON.parse(rootType)==1){
        //   sessionStorage.setItem("rootType",JSON.stringify(2));
        // }else{
        //   sessionStorage.setItem("rootType",JSON.stringify(1));
        // }
      
    this.subscribePaymentTypeChanges();
    this.setPaymentMethodType(this.PAYMENT_METHOD_TYPE.UPI);
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

  // logout(){
  //   LocalStorageService.setIsLoggedIn(false);
  //   localStorage.removeItem(Constants.userDataKey);
  //   this.isLoggedIn = LocalStorageService.getIsLoggedIn();
  //   this.mUserLoggedOut.emit();
  //   this.router.navigate(['/login']);
  
  
  // }

  // queryUserProfileMTML2(){
  //   if(this.queryUserProfileMsisdn&&this.queryUserProfileMsisdn+"".length>0){
  //     const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //     let params;
  //     if(!this.queryUserProfileIMSI||this.queryUserProfileIMSI+"".length==0){
  //       this.queryUserProfileIMSI="";
  
  //     }
  //     if(!this.queryUserProfilePswd||this.queryUserProfilePswd+"".length==0){
  //       this.queryUserProfilePswd="";
  
  //     }
  
  //   params = "?msisdn="+this.queryUserProfileMsisdn+"&imsi="+this.queryUserProfileIMSI+"&userPwd="+this.queryUserProfilePswd;
  
  //     this.http.get(this.queryUserProfile+params, { headers: headers})
  //       .subscribe(data => {
  //         let reaponse:any=data;
  //         console.log(JSON.parse(reaponse.data));
  //         let dataresponse = JSON.parse(reaponse.data);
  //         if(dataresponse.errormsg){
  //           alert(dataresponse.errormsg)
  //         }else{
  //          this.queryUserProfileData =  dataresponse;
  //          this.closeModal("#queryUserProfileMTML2Modal");
  //             this.openModal("#queryUserProfileMTML2ModalResponse");
           
  //         }
  //       },
  //       error => {
  //         alert(error.data)
  //         console.log( JSON.parse(error.data));
    
  //       });
  //   }
  //   else{
  //     alert("Pleasee fill all required Feilds");
  //   }
  
  
  
  // }
  
  // register(){
  //    if(this.signupmsisdn&&this.signupmsisdn.length>0&&
  //     this.signupName&&this.signupName.length>0&&
  //     this.signupCertNo&&this.signupCertNo.length>0&&
  //     this.signupGender&&this.signupGender.length>0&&
  //     this.signupAddressLine1&&this.signupAddressLine1.length>0&&
  //     this.signupAddressLine2&&this.signupAddressLine2.length>0&&
  //     this.signupPic&&this.signupPic.length>0
  //     )
  // {
  //   const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //   let request ={'msisdn':this.signupmsisdn,
  //     'agentNbr':LocalStorageService.getUser().phone,
  //     'customerName': this.signupName,
  //     'certType':"1",
  //     'certNo': this.signupCertNo,
  //     'gender': this.signupGender,
  //     'location':'Mauritius MTML',
  //     'addressLine1':this.signupAddressLine1,
  //     'addressLine2':this.signupAddressLine2,
  //     'customerImagePath':this.signupPic,
  //     'idPic':this.signupPic
  //   }
  //   return this.http.post(this.registerCustomer, request,{ headers: headers})
  //   .subscribe(data => {
  //     let reaponse:any=data;
  //     console.log(JSON.parse(reaponse.data));
  //     let dataresponse=JSON.parse(reaponse.data);
  //     if(dataresponse.errormsg){
  //       alert(dataresponse.errormsg);
  //      } else{
  //        alert("Registration successfull")
  //      }
  //   },
  //   error => {
  //     alert(error.data)
  //     console.log( JSON.parse(error.data));
  
  //   });
  
  
  // }else{
  //   alert('Please complete form before submit.')
  // }
  //  // return this.http.post(localUrl,{});
  // }
  // fileSelected(event){
  //   //const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
  // if(this.signupmsisdn&&this.signupmsisdn+"".length>0){
  //   let formData: FormData = new FormData(); 
  //   formData.append('msisdn', this.signupmsisdn); 
  //   formData.append('files', event[0]); 
  //   formData.append('files', event[0]); 
  
  //   return this.http.post(this.uploadPics, formData)
  //   .subscribe(data => {
  //     debugger
  //     let reaponse:any=data;
  //     this.signupPic = reaponse.pic1
  //     alert("success")
  //   },
  //   error => {
  //     alert(error.data)
  //     console.log( JSON.parse(error.data));
  
  //   });
  // }else{
  //   alert("Please provoide msisdn before selecting image.")
  // }
  
  
  //    }
  
  // pinmodification(){
  //   debugger
  //   if(this.oldMpin&&this.oldMpin+"".length>0&&this.newMPin&&this.newMPin+"".length>0&&this.confirmNewMPin&&this.confirmNewMPin+"".length>0){
  //     if(this.newMPin==this.confirmNewMPin){
  //       const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //       let params = "?newPin="+this.newMPin+"&agentNbr="+this.pinmodificationPone+"&oldPin="+this.oldMpin;
  //       this.http.get(this.modifyPin+params, { headers: headers})
  //         .subscribe(data => {
  //           debugger
  //           let reaponse:any=data;
  //           console.log(reaponse);
  //           if(reaponse.data != "success"){
  //            alert(reaponse.data)
  //            return;
  //           }
  //           else{
  //             this.oldMpin = "";
  //             this.newMPin = "";
  //             this.confirmNewMPin = "";
  //            $("#dealerModal").modal("hide");
  //            alert("Congrats! Pin modified successfully.")
  
  //           }
      
  //           console.log(JSON.parse(reaponse.data));
  //         },
  //         error => {
  //           alert(error.data)
  //           console.log( JSON.parse(error.data));
      
  //         });
  //     }else{
  //       alert("Pleasee new mpin and confirm mpin must be same");
  
  //     }
  
  //   }
  //   else{
  //     alert("Pleasee fill all required Feilds");
  //   }
    
  //   $("#pinModal").modal("hide");
  // }
  // eTopUpUser(){
  //   debugger
  //   if(this.msisdn&&this.msisdn+"".length>0&&this.amountetopup&&this.amountetopup+"".length>0&&this.agentPwdEtopup&&this.agentPwdEtopup+"".length>0){
  //     if(this.msisdn.toString().indexOf("230")!=0){
  //       this.msisdn = "230"+this.msisdn;
  //     }
  //       const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //       let params = "?msisdn="+this.msisdn+"&agentNbr="+this.agentPhone+"&amount="+this.amountetopup+"&operChannelId=12&agentPwd="+this.agentPwdEtopup;
  //       this.http.get(this.etopUp+params, { headers: headers})
  //         .subscribe(data => {
  //           let reaponse:any=data;
  //          if(reaponse.data=="0000"){
  //            alert("Dear Customer, The transaction is successful.")
  //             //alert("E Topup  to msisdn "+this.msisdn+" is successfull.")
  //             this.msisdn = "";
  //             this.amountetopup = "";
  //            $("#etopupModal").modal("hide");
  //           }else{
  //             alert(JSON.parse(reaponse.data).resultMsg)
  //             return;
  //           }
      
  //           console.log(JSON.parse(reaponse.data));
  //         },
  //         error => {
  //           alert(error.data)
  //           console.log( JSON.parse(error.data));
      
  //         });
  // }
  //   else{
  //     alert("Pleasee fill all required Feilds");
  //   }
    
  //   $("#etopupModal").modal("hide");
  // }
  
  
  // getLastTransaction(){
  //      if(this.agentPwdLastTransaction&&this.agentPwdLastTransaction+"".length>0){
  //       const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //       let params = "?agentNbr="+this.agentPhone+"&agentPwd="+this.agentPwdLastTransaction;
  //       this.http.get(this.qryLastTransETOPUP+params, { headers: headers})
  //         .subscribe(data => {
  //           let reaponse:any=data;
  //           let responseData:any;
  //           try{
  //              responseData=JSON.parse(reaponse.data);
  //             }
  //           catch(e){
  //             responseData=reaponse.data;
  //           }
  //           if(responseData&&responseData.errorcode&&responseData.errorcode!="0000"){
  //           alert(responseData.errormsg)
  //           }
  //           else{
  //             this.lastTransactionObj = responseData;
  //             this.closeModal("#lastTransactionModal");
  //             this.openModal("#lastTransactionDetailModal");
  
  //           }
        
  //         },
  //         error => {
  //           alert(error.data)
      
  //         });
  //      }else{
  //        alert("Agent password is required");
  //      }
  
  // }
  // openModal(id){
  //   $(id).modal("show");
   
  // }
  // closeModal(id){
  //   $(id).modal("hide");
  // }
  // handleError(handleError: any) {
  //   throw new Error("Method not implemented.");
  // }
  // queryIndividualPackage(msisdn){
  //   this.sessionLoginNumber= sessionStorage.getItem("sessionLoginNumber");
  //   if(this.sessionLoginNumber){
  //     const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  //     headers.append('Access-Control-Allow-Origin', '*');
      
  //         this.http.get(this.queryIndividualPackageUrl+"?msisdn="+this.agentPhone, { headers: headers})
  //           .subscribe(data => {
  //             debugger
  //             let reaponse:any=data;
  //             console.log(reaponse);
  //             let responseData:any;
  //             try{
  //                responseData=this.getIndividualResponse(reaponse);
                
  //               }
  //             catch(e){
  //               responseData=reaponse.data;
  //             }
  //            alert(responseData);
          
  //           },
  //           error => {
  //             debugger
  //             alert(error.data)
        
  //           });
  //   }else{
  //     alert("Please go to login page!")
  //   }
  
   
  // }
 
    setPaymentMethodType(type: string) {
      console.log((<any>this.loginForm).controls.rootType.value);
      // sessionStorage.setItem("rootType",JSON.stringify((<any>this.loginForm).controls.rootType.value));
      console.log(this.defaultFlag);
      let rootType = sessionStorage.getItem("rootType");
      if(((<any>this.loginForm).controls.rootType.value||rootType)==1){
        sessionStorage.setItem("rootType",JSON.stringify(2));
      }else{
        sessionStorage.setItem("rootType",JSON.stringify(1));
      }
      let rootTypeNew = sessionStorage.getItem("rootType");
      // this.defaultFlag = JSON.parse(rootTypeNew)
      
      // console.log( type);
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
  // onSubmit() {
  //   alert(JSON.stringify(this.loginForm.value))
  // }
  getReturnFlights(){
    console.log(JSON.stringify(this.loginForm.value))
    this. getSingleFlights();
  }
  getSingleFlights(){
    const token="1BAF7E10-C37D-4753-AE2A-320509DE9C28-1971";
    sessionStorage.setItem('token',token.toString());
    console.log(JSON.stringify(this.loginForm.value.rootType))

    var body1= {
      
        "OriginDestinationInformations": [
          {
            "DepartureDateTime": "2021-12-31T00:00:00",
            "OriginLocationCode": "BLR",
            "DestinationLocationCode": "DXB"
      },
         {
            "DepartureDateTime": "2021-12-31T00:00:00",
            "OriginLocationCode": "DXB",
            "DestinationLocationCode": "BLR"
          }
        ],
        "TravelPreferences": {
          "MaxStopsQuantity": "Direct",
          "VendorPreferenceCodes": [
            "EK"
             ],
          "CabinPreference": "Y",
          "Preferences": {
            "CabinClassPreference": {
              "CabinType": "Y",
              "PreferenceLevel": "Restricted"
            }
          },
          "AirTripType": "Circle"
        },
        "PricingSourceType": "Public",
        "IsRefundable": true,
        "PassengerTypeQuantities": [
          {
            "Code": "ADT",
            "Quantity": 1
          }
        ],
        "RequestOptions": "Fifty",
        "NearByAirports": true,
        "Target": "Test",
        "ConversationId": "string"
      }
                      
      


    var body2= {
      "OriginDestinationInformations": [
      
      {
        "DepartureDateTime": "30 December, 2021",
        "OriginLocationCode": "DXB",
        "DestinationLocationCode": "BLR"
      }
      ],
      "TravelPreferences": {
      "MaxStopsQuantity": "Direct",
      "VendorPreferenceCodes": [
        "EK"
         ],
      "CabinPreference": "Y",
      "Preferences": {
        "CabinClassPreference": {
          "CabinType": "Y",
          "PreferenceLevel": "Restricted"
        }
      },
      "AirTripType": "OneWay"
      },
      "PricingSourceType": "Public",
      "IsRefundable": true,
      "PassengerTypeQuantities": [
      {
        "Code": "ADT",
        "Quantity": 1
      }
      ],
      "RequestOptions": "Fifty",
      "NearByAirports": true,
      "Target": "Test",
      "ConversationId": "string"
      }

    // this.flightSerchService.getSingleFlights("a","a","a")
    // .subscribe((data)=>{
       
    //   // this.contentFlights=data.data;
    //   console.log(data);
      
    //     // let matches = [], i;
    //     // for (i = 0; i < data.data.data.length; i++) {
    //     //   if (arr[i].match(regex)) {
    //     //     matches.push(arr[i]);
    //     //   }
    //     // }
    //     // return matches;
     
    // });
    if(this.loginForm.value.rootType==1){
      this.flightSerchService.fetchData(body1)
      .subscribe(data => {
        // this.data = data;
        console.log(data)
        // set data in service which is to be shared
        this.flightSerchService.setData(data)
        
        localStorage.setItem("OnewayJson",JSON.stringify(data));
        this.router.navigate(['Terms&Conditions']);
      })
    }
    if(this.loginForm.value.rootType==2){
      this.flightSerchService.fetchData(body2)
      .subscribe(data => {
        // this.data = data;
        console.log(data)
        // set data in service which is to be shared
        this.flightSerchService.setData(data)
        
        localStorage.setItem("OnewayJson",JSON.stringify(data));
        this.router.navigate(['Terms&Conditions']);
      })
    }
   
  }
  
  
  
 
  
  
      
      
      
      
         
            
            
          
  

}


