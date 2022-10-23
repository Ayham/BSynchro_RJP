import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [  
  {path:'user', component: UserComponent, data:{breadcrumb: 'User'}},
  {path:'transaction', component: TransactionComponent, data:{breadcrumb: 'Transaction'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
