import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/ApiService';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  ngOnInit(): void {     
    this.rowData = []; 
  }
    
 
  columnDefs = [
    { field: 'userId' },
    { field: 'amount' },
    { field: 'dateCreated'},
    { field: 'dateUpdated'},
  ];

  rowData = [
      { userId: '', amount: '', dateCreated: '',  dateUpdated:''}
  ];

  constructor(public apiService: ApiService) {      
    let params: HttpParams = new HttpParams();
    this.apiService.get<any[]>("/Transaction/Get", params).subscribe(s => {
      this.rowData = s;      
    });
  }

  onGridReady(params: GridReadyEvent) {
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

}
