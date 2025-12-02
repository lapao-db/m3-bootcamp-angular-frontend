import { Component, inject } from '@angular/core';
//importar directiva
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-navbar', //etiqueta de html
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  
  private _loginService = inject(LoginService);
  isVisible: boolean = this._loginService.isAdmin();
}
