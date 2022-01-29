import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './core/service/auth-gaurd.service';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './core/service/TokenInterceptor';
import { FlightList } from './flightList/flightList';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';



@NgModule({
  declarations: [
    AppComponent,
    FlightList,
    HomeComponent,
    PaymentpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // AccordionModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
