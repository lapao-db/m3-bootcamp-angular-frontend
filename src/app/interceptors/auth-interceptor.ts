// Interceptor -> Permite interceptar el token al inicio de sesion y se lo pasa a cada peticion que lo necesite

import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //necesito pasarles el token antes de que vayan al servidor
  const _loginService = inject(LoginService);
  const token = _loginService.getToken();

  //EL backed espera -> Bearer nvlnrlnvlnvlnbdv
  const request = token ? req.clone({setHeaders:{Authorization: "Bearer " + token}}): req;

  
  return next(request); //pasa la peticion al back
};
