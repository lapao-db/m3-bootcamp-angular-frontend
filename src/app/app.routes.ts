import { Routes } from '@angular/router';
//1. Importar todos los componentes pagina
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { Products } from './pages/products/products';


export const routes: Routes = [
    {path: '', component: Home, title: 'Inicio'},
    {path: 'register', component: Register, title: 'Registro'},
    {path: 'admin', component:Admin, title: 'Dashboard' },
    {path: 'login', component:Login, title: 'Inicion Sesión' },
    {path:'products', component:Products, title: 'Productos'},
    {path: '**', component:NotFound, title: '404'},
];
