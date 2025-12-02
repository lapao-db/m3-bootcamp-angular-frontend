import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _httpClient = inject(HttpClient); // Importar metodo HttpClient inject
    private apiUrl = environment.baseUrl; 

    //Metodos para hacer las peticiones

    //Metodo POST
    postUser(userToCreate: User){
      return this._httpClient.post(this.apiUrl + "/users", userToCreate);
    }
    //Metodo GET
    getUser(){
      return this._httpClient.get(`${this.apiUrl}/users`);
    }
    //Metodo PUT
    putUser(userToUpdate : User, idUser:string){
      return this._httpClient.put(`${this.apiUrl}/users/${idUser}`,userToUpdate);
    }
    //Metodo DELETE
    deleteUser(idDelete: string){
      return this._httpClient.delete(`${this.apiUrl}/users/${idDelete}`);

    }
    
}
