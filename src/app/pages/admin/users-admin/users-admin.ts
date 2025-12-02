import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';

// !!! Si se va a hacer ACTUALIZACION -PUT -> se DEBE trabajar con FORMULARIOS

@Component({
  selector: 'app-users-admin',
  imports: [],
  templateUrl: './users-admin.html',
  styleUrl: './users-admin.css'
})
export class UsersAdmin implements OnInit {

  //1. Inyeccion de Dependencias e Inicialización de variables
  private _userService =inject(UserService);
  
  // Se necesita traer todos los usuarios de la BD -> crear variable que las contenga
  allUsers: User [] = [];

  //2. Formgroups y formcontrols que se requieran
  //...

  //3. Métodos que permitan hacer las peticiones y gestionar las respuestas
  showUsers(){
    // hace la peticion -> GET
    this._userService.getUser().subscribe({
      next: (res:any)=>{
        console.log(res);
        this.allUsers = res.userData;
      },
      error: (err: any)=>{
        console.error(err);
      }
    })
  }

  deleteUser(id:string){
    //Hace la peticion -> DELETE
    this._userService.deleteUser(id).subscribe({
      next: (res: any)=>{
        console.log(res);
        Swal.fire({
          title: "Ususario eliminado con Exito",
          icon: 'success',
          draggable: false
        })
      },
      error: () => {}
    })
  }

  updateUserInfo(id:string){
    //Hace la peticion -> PUT
    // ... tomar como referencia el Register.ts
    console.log("Id del ususario a editar: ", id);
  }

  ngOnInit(): void {
    this.showUsers();
  }

}
