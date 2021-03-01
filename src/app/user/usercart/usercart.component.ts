import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username;
  cart:any;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res["message"]
      },
      err=>{
        alert("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  }

  edit(n:number){
    let obj=this.cart[n];

    
  }

  delete(n:number){
    let obj=this.cart[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteCartProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed from E-Commerce")
          this.router.navigateByUrl("/allcart")
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }


}
