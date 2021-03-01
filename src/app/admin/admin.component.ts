import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  file!:File; 

  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }
  //inject user service
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

  onSubmit(ref:any){   
    let productObj = ref.value;
    console.log(productObj);
    let formData = new FormData();

    //adding image and other data to ForData object
    formData.append('photo',this.file,this.file.name);
 
    formData.append("productObj",JSON.stringify(productObj)) 
  

    this.us.createProduct(formData).subscribe(
      res=>{
        if(res["message"] == "product existed"){
          alert("Product is already existed..choose another");
        }
        else{
          alert("Product Added Successfully");

          //navigate to login component
          this.router.navigateByUrl("/allproducts");
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }  
    )
    
}


}
