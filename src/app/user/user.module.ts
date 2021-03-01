import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsercartComponent } from './usercart/usercart.component';
import { ViewitemComponent } from './viewitem/viewitem.component';



@NgModule({
  declarations: [UserComponent, UsercartComponent, ViewitemComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
