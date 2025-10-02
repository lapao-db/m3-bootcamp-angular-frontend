import { Component } from '@angular/core';
//importar directiva
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar', //etiqueta de html
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}
