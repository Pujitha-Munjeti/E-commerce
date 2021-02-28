import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username;
  products:any;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getAllProducts();
  }
  user(){
    if(this.username==null){
      return false;
    }
    else{
      return true;
    }
  }
  getAllProducts(){
    this.us.getProducts().subscribe(
      res=>{
        this.products=res["message"]
      },
      err=>{
        alert("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  }

}
