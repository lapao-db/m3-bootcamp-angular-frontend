import { Component, inject } from '@angular/core';
// Formularios Reactivos -> cada cosa que el usuario escriba sea reconocido por el sistema
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //Variables e inyeccion de servicios
  private _loginService = inject(LoginService);

  //no es necesario que los nombres sean iguales a la interface credentials pero ahorran trabajo
  loginForm = new FormGroup({
    emailLogin: new FormControl('',[Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  //manejo de eventos
  handleSubmit() {
    // const email = this.loginForm.value.emailLogin
    // const password = this.loginForm.value.passwordLogin
    // console.log(email, password);
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched(); // Para agregar estilos -> marcar todos los imput como activados
      return;
    }

    //Cada que se vaya a hacer una peticion PUT / POST -creacion, actualizar -> Contruir a partir de la interfaz para que se cumpla lo que el backed espera
    const credentials: Credentials = {
      emailLogin: this.loginForm.value.emailLogin || '',
      passwordLogin: this.loginForm.value.passwordLogin || '',
    };

    console.log('Credenciales para login', credentials);

    //Logica de la peticion al back de Inicio de Sesion
    //1. acceder al servicio + metodo que necesito (parametro de la var que contiene la info)
    this._loginService.login(credentials).subscribe({
      //manejo de la respuesta o error
      next: (res: any) => {
        console.log(res);
        if (res) {
          //guardar el token en el localStorage
          localStorage.setItem('token', res.token);
          
          // Mensaje de respuesya
          //alert(res.mensaje)

          Swal.fire({
            title: res.mensaje,
            icon: 'success',
            draggable: true,
          });

          this._loginService.redirectTo();
        }
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
        Swal.fire({
            title: err.error.mensaje,
            icon: 'error',
            draggable: false,
          });

      },
    });
  }
}
