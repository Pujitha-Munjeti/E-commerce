import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
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

  edit(n:number){
    let obj=this.products[n];

    
  }

  delete(n:number){
    let obj=this.products[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          alert("Product removed from E-Commerce")
          this.router.navigateByUrl("/allproducts")
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }

}
