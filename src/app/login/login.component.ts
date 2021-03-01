import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef:any){

    let userCredObj=formRef.value;
    
    //if user
    if(userCredObj.usertype=="user"){
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
            //store token and username in local storage
            localStorage.setItem("token",res["signedToken"])
            localStorage.setItem("username",res["username"])

            //navigate to user component
            this.router.navigateByUrl("/home")
          }
          else{
            alert(res["reason"])
            this.router.navigateByUrl("/usercomp")
          }
        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )

    }

       //if admin
       if(userCredObj.usertype=="admin"){
        if(userCredObj.username=="admin" && userCredObj.password=="admin"){
          //navigate to user component
          this.router.navigateByUrl("/admincomp")
        }
        else{
          alert("Sorry wrong username or password")
        }
       }

  }

}
