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
    { field: 'userId', sortable: true, filter: true, resizable: true,editable: true },
    { field: 'amount', sortable: true, filter: true, resizable: true,editable: true },
    { field: 'dateCreated', sortable: true, filter: true, resizable: true,editable: false
    ,cellRenderer: (data:any) => {return data.value ? (new Date(data.value)).toLocaleDateString() : '';}},
    { field: 'dateUpdated', sortable: true, filter: true, resizable: true,editable: false
    ,cellRenderer: (data:any) => {return data.value ? (new Date(data.value)).toLocaleDateString() : '';}},
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
