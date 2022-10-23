import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, CellValueChangedEvent, ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/ApiService';
import { helper, user } from './model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private gridApi!: GridApi;
  private gridTransactionApi!: GridApi;

  ngOnInit(): void {    
  }
    
 
  columnDefs = [  
    { field: 'action',
      width:100, 
      headerName: 'Action', 
      resizable: true,
      cellRenderer: (params:any) => this.actionCellRenderer(params, undefined),
      editable: false,
      colId: "action"
    },
    { field: 'name', sortable: true, filter: true, resizable: true,editable: true },
    { field: 'surname', sortable: true, filter: true, resizable: true,editable: true },
    { field: 'balance', sortable: true, filter: true, resizable: true,editable: false},
    { field: 'dateCreated', sortable: true, filter: true, resizable: true,editable: false
    ,cellRenderer: (data:any) => {return data.value ? (new Date(data.value)).toLocaleDateString() : '';}},
    { field: 'dateUpdated', sortable: true, filter: true, resizable: true,editable: false
    ,cellRenderer: (data:any) => {return data.value ? (new Date(data.value)).toLocaleDateString() : '';}},
  ];
  @ViewChild('transaction') transaction: TemplateRef<void> | undefined;

  otherAction: boolean | undefined;
  cancelUpdate: boolean | undefined;
  actionCellRenderer(params:any, otherAction:any) {
   let eGui = document.createElement("div");
   let editingCells = params.api.getEditingCells();
   // checks if the rowIndex matches in at least one of the editing cells
   let isCurrentRowEditing = editingCells.some((cell: { rowIndex: any; }) => {
     return cell.rowIndex === params.node.rowIndex;
   });
  let isOtherAction = otherAction;
   if (isCurrentRowEditing) {
     eGui.innerHTML = `
  <i class="fa-solid fa-check fa-xl" data-action="update" title="Applay" style="color:#17a2b8"></i>&nbsp;
  <i class="fa-solid fa-xmark fa-xl" data-action="cancel" title="Cancel"></i>
  `;
   }     
   
   else {
     eGui.innerHTML = `
  <i class="fa-solid fa-pen-to-square fa-lg" data-action="edit" title="Edit"></i>&nbsp;
  <i class="fa-solid fa-trash fa-lg" data-action="delete"  title="delete" style="color:#dc3545"></i>
  <i class="fa-solid fa-sitemap fa-lg" data-action="transaction" title="Transaction" style="color:#ffc107"></i>

  `;
   }
 
   return eGui;
 }
 onCellClicked(params:any) {
   // Handle click event for action cells
   if (params.column.colId === "action" && params.event.target.dataset.action) {
     let action = params.event.target.dataset.action; 
     if (action === "edit") {
       params.api.startEditingCell({
         rowIndex: params.node.rowIndex,
         // gets the first columnKey
         colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
       });
     } 
     if (action === "delete") {
       this.deleteModel();
     } 
     if (action === "update") {     
       this.cancelUpdate = false; 
       params.api.stopEditing(false);
     } 
     if (action === "cancel") {
       this.cancelUpdate = true;
       params.api.stopEditing(true);
     }
     if (action === "transaction") {
      this.gteDataTransaction();
     }
   }
 }
 onCellClickedTransaction(params:any){

 }
 onRowEditingStarted(params:any) {
   params.api.refreshCells({
     columns: ["action"],
     rowNodes: [params.node],
     force: true
   });
 }
 onRowEditingStopped(params:any) {
   params.api.refreshCells({
     columns: ["action"],
     rowNodes: [params.node],
     force: true
   });  
   if(this.cancelUpdate == false)
   this.onCellValueChanged(params.node);
 }
 public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
 public getRowIdTransaction: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
 rowData = [];
 rowDataTransaction = [];

  constructor(public apiService: ApiService,private modalService: NgbModal) {   
    this.getData();
  }
 getData(){   
  let params: HttpParams = new HttpParams();
  this.apiService.get<any[]>("/User/Get", params).subscribe(s => {
    this.rowData = s;      
  });

 }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  onGridReadyTransaction(params: GridReadyEvent) {
    this.gridTransactionApi = params.api;
  }
  
	create(content:any) {
		this.modalService.open(content, { size: 'lg' });
	}
  
  formSubmit(result:any) {
    this.closeForm();
    debugger;
    var userModel = new user();
    userModel.Name = result.Name;
    userModel.Surname = result.Surname;
    let params: HttpParams = new HttpParams();
    this.apiService.post<any[]>("/User/Create", params, userModel).subscribe(s => {
      this.getData();  
    });
 }
  formSubmitInitialCredit(result:any) {
    this.closeForm();
    var userModel = new user();
    var helperModel = new helper();
    helperModel.CustomerID = result.CustomerID;
    helperModel.InitialCredit = result.InitialCredit;
    let params: HttpParams = new HttpParams()
    .set('customerID',result.customerID)
    .set('initialCredit',result.initialCredit);;
    this.apiService.post<any[]>("/User/Create", params, userModel).subscribe(s => {
      this.getData();  
    });
 }
 
 onCellValueChanged(event: CellValueChangedEvent) {
  var newCountry = new user();
  newCountry.Id = event.data.id;
  newCountry.Name = event.data.name;
  newCountry.Surname = event.data.surname;
  newCountry.Balance = event.data.balance;
  let params: HttpParams = new HttpParams();
  this.apiService.post<any[]>("/user/Edit", params, newCountry).subscribe(s => {
    this.getData(); 
  });
}
deleteModel(){  
  var selectedRows = this.gridApi.getSelectedRows();
  var userModel = new user();
  userModel.Id = selectedRows[0].id;
  let params: HttpParams = new HttpParams();
  this.apiService.post<any[]>("/User/Delete", params, userModel).subscribe(s => {
    this.closeForm();
    this.getData();
  });
}
 closeForm(){
  document.getElementById('closeButton')?.click();
 }

 OpenTransation(model:any){  
  this.modalService.open(model, { size: 'lg' });
 }


 
 
 columnDefsTransaction = [
  { field: 'userId', sortable: true, filter: true, resizable: true,editable: true },
  { field: 'amount', sortable: true, filter: true, resizable: true,editable: true },
  { field: 'dateCreated', sortable: true, filter: true, resizable: true,editable: false
  ,cellRenderer: (data:any) => {return data.value ? (new Date(data.value)).toLocaleDateString() : '';}},
  { field: 'dateUpdated', sortable: true, filter: true, resizable: true,editable: false
  ,cellRenderer: (data:any) => {return data.value ? (new Date(data.value)).toLocaleDateString() : '';}},
];

gteDataTransaction() {     
  this.OpenTransation(this.transaction);  
  selectedRows= [];
  var selectedRows = this.gridApi.getSelectedRows();
  let params: HttpParams = new HttpParams()
  .set('userId',selectedRows[0].id);
  this.apiService.get<any[]>("/Transaction/GetTransactionByUserId", params).subscribe(s => {
    this.rowDataTransaction = s;      
  });
}

}
