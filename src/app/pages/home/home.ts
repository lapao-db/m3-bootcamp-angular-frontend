import { Component } from '@angular/core';
import { Card } from '../../components/card/card';


//importar componente que se quiera. Componente dentro de componenete


@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
