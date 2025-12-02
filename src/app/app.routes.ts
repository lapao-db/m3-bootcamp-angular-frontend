import { Routes } from '@angular/router';
//1. Importar todos los componentes pagina
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { Products } from './pages/products/products';

//importar en nuestras rutas el guardian y especificar que rutas son protegidas
import { authGuard } from './guards/auth-guard';

import { UsersAdmin } from './pages/admin/users-admin/users-admin';
import { Inventory } from './pages/admin/inventory/inventory';

export const routes: Routes = [
    {path: '', component: Home, title: 'Inicio'},
    {path: 'register', component: Register, title: 'Registro'},
    {
        path: 'admin', 
        component: Admin, 
        title: 'Dashboard', 
        canActivate :[authGuard],
        canActivateChild: [authGuard], // Proteger rutas hijas
        children: [
            {path: '', component:UsersAdmin}, // '' -> sera el componente de entrada/inicio
            {path: 'inventory', component:Inventory}
        ]
    },
    {path: 'login', component:Login, title: 'Inicion Sesión' },
    {path:'products', component:Products, title: 'Productos'},
    {path: '**', component:NotFound, title: '404'},
];
