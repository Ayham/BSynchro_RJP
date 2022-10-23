import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/ApiService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  ngOnInit(): void {    
    this.rowData  = [];
  }
    
 
  columnDefs = [
    { field: 'name' },
    { field: 'surname' },
    { field: 'balance'},
    { field: 'dateCreated'},
    { field: 'dateUpdated'},
  ];

  rowData = [
      { name: '', surname: '', balance: '', dateCreated:'', dateUpdated:'' }
  ];

  constructor(public apiService: ApiService) {      
    let params: HttpParams = new HttpParams();
    this.apiService.get<any[]>("/User/Get", params).subscribe(s => {
      debugger;
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
