import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.component.html',
  styleUrls: ['./viewitem.component.css']
})
export class ViewitemComponent implements OnInit {

  username;
  productname;
  product;
  constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.productname=localStorage.getItem("productname")
    //console.log("PRODUCT NAME IS ",this.productname)
    this.getProduct();
  }
  getProduct(){
    this.us.getItem(this.productname).subscribe(
      res=>{
        this.product=res["message"]
        console.log("the product is",this.product)
      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )
  }
  additem(){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.product.productname,
      productID:this.product.productID,
      colour:this.product.colour,
      mfddate:this.product.mfddate,
      cost:this.product.cost,
      description:this.product.description,
      productImgLink:this.product.productImgLink
      }
      
      //console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
          if(res["message"]){
            alert("Add Product added to cart")
          this.router.navigateByUrl("/usercart")
          }
        },
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/logincomp")
    }
  }


}
