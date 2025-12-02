import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // Para decodificar el token y saber si inicio sesion usuario/admin
import { Router } from '@angular/router'; //Redireccionar a otras paginas al inicio de sesion


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    //1. Injectar servicio HttpClient y definir variables
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.baseUrl;

  //2. Desarrollar la logica del servicio

  //2.1 Peticion POST
  login(loginCredentials : Credentials){
    return this._httpClient.post(`${this.apiUrl}/login/`, loginCredentials);
  
  }
  
  //2.2 Decirle al navegador de donde va a obtener -> almacenamiento temporal
  getToken(){
    return localStorage.getItem('token');
  }

  //VALIDAR si es rol admin o no
  // Este metodo retorna true o false. Dependiendo de si es admin o no

  isAdmin(){
    //primero -> obtener el token del nav en local storage
    const token = this.getToken();

    //En caso de que exista token -> decodifique token
    if(token){
      const decoded : any = jwtDecode(token);

      return decoded.admin === true ? true : false;

    }else{
      console.log('No se encontró token');
      return false;
    }
   
  }

  //REDIRECCIONAR despues de iniciar sesion
  redirectTo(){
    //si es admin que redireccione a administrador
    if(this.isAdmin()){
      this._router.navigate(['/admin']); //redireccione a una pagina de la app nombrada en app.routes
    }else{
      this._router.navigate(['/']);
    }
  }

  // Cerrar sesion
  logout(){
    localStorage.removeItem('token');
    alert('Cierre de sesión Exitoso');
    this._router.navigate(['/login']);
  }

  // Validar si inicio sesion o no
  isLoggedIn(){
    return this.getToken() ? true : false; 
  }// Si no hay token -> no esta loggeado (false)

}

