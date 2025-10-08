import { Component, inject, OnInit } from '@angular/core';
//Importar el servicio porque queremos hacer get de los productps
import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {
  //1. Inyeccion de dependencias y declaracion de variables
  
  //Se necesita inyectar el Servicio -> se usa _ para indicar que es una directiva inyectada
  _productService = inject(ProductService);
  //variable
  allProducts : Product [] = [];
  baseUrl : string = environment.baseUrl;

  showProducts(){
    //1. Hacer Peticion GET -> con servicio creado
    //2. Guardar los productos en la variable creada -> allProducts
    //3. Mostrar en navegador

    this._productService.getProducts().subscribe({
      // manejo de errores -> gestion de respuestas del back
      next: (response : any)=> {
        this.allProducts = response.data;
        console.log(this.allProducts);
      }, //respuestas positivas del Back
      error: (error :any)=>{
        console.error(error);
      } //respuestas negativas del Back

    })
  }

  ngOnInit(): void {
    //Directiva de angular: Indica que se ejecute al cargarse en el navegador por primera vez se ejecute. 
    this.showProducts();
  }

}
