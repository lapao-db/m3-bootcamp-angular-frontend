import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private _userService = inject(UserService);
  private _router = inject(Router);

  registerForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    username : new FormControl('', [Validators.required]),
    email : new FormControl('',[Validators.required, Validators.email]),
    age : new FormControl<number|null>(null),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
    //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/)
  });

  handleSubmit(){
    const userData : User = {
      _id : '',
      name : this.registerForm.value.name || '',
      username : this.registerForm.value.username || '',
      email : this.registerForm.value.email || '',
      age : this.registerForm.value.age || 0,
      password : this.registerForm.value.password || '',
      role : "user"
    }

    console.log("Datos del Usuario: ", userData);
    
    this._userService.postUser(userData).subscribe({
      next : (res:any)=> {
        console.log(res);

        Swal.fire({
          title: "Registro Exitoso",
          text : res.mensaje,
          icon: "success"
        }).then(() =>{
          this._router.navigate(['/login']);
        })
      },
      error: (err:any)=>{
        console.error(err.error.mensaje);
        Swal.fire({
            title : "Oops!",
            text: err.error.mensaje,
            icon:"error"
          })
      }
    })
  
  }

}
