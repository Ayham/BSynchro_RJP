import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
