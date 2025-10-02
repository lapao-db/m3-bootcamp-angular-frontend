// Servicios -> Logica accesible desde cualquier parte de un proyecto
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { enviroment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //1. Inyectar: metodos, proveedores, ... dependencias o directivas de Angular. 
  private _httpClient = inject(HttpClient); //variable = inject(dependencia)
  
  //2. Definir la ruta de acceso al back
  
  //private apiUrl = 'http://localhost:3000'; //url general del back
  private apiUrl = enviroment.baseUrl; //de la variable de entorno llamamos la url de la app

  //3. Métodos para hacer las peticiones (se nombran como se quiera)

  //peticion POST
  postProduct(productToCreate : Product){
    return this._httpClient.post(this.apiUrl + "/products/crear", productToCreate);
  };

  //peticion GET
  getProduct(){
    return this._httpClient.get(this.apiUrl + "/products/mostrar");

  };
  //peticion PUT
  putProduct(productToUpdate : Product, idProductUpdate : string){
    //return this._httpClient.put(this.apiUrl + '/products/actualizar/' + idProductUpdate, productToUpdate) //opcion 1
    return this._httpClient.put(`${this.apiUrl}/products/actualizar/${idProductUpdate}`, productToUpdate) //Opcion 2

  };
  //peticion DELETE
  deleteProduct(idPrductDelete :string){
    return this._httpClient.delete(this.apiUrl + "/products/eliminar/" , { 
      params: {idPrductDelete}
    }); // Opcion 3
  };

}
