import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UsercartComponent } from './usercart/usercart.component';
import { ViewitemComponent } from './viewitem/viewitem.component';

const routes: Routes = [
  { path: 'usercomp', component: UserComponent },
  { path:"usercart", component:UsercartComponent},
  { path:"view", component:ViewitemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
