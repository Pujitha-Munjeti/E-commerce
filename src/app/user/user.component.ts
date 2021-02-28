import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //inject user service
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(ref:any){   
    let userObj = ref.value;
    console.log(userObj);
    


    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"] =="user existed"){
          alert("Username is already existed..choose another");
        }
        else{
          alert("Registration succesfull");

          //navigate to login component
          this.router.navigateByUrl("/logincomp");
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }  
    )
    
}


}
