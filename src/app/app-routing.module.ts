import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'socios',
    loadChildren: () => import('./socios/socios.module').then( m => m.SociosPageModule)
  },
  {
    path: 'lecturador',
    loadChildren: () => import('./lecturador/lecturador.module').then( m => m.LecturadorPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'cajero',
    loadChildren: () => import('./cajero/cajero.module').then( m => m.CajeroPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'adm-facturas',
    loadChildren: () => import('./adm-facturas/adm-facturas.module').then( m => m.AdmFacturasPageModule)
  },
  {
    path: 'add-lecturaciones',
    loadChildren: () => import('./add-lecturaciones/add-lecturaciones.module').then( m => m.AddLecturacionesPageModule)
  },
  {
    path: 'add-medidores',
    loadChildren: () => import('./add-medidores/add-medidores.module').then( m => m.AddMedidoresPageModule)
  },
  {
    path: 'add-tarifas',
    loadChildren: () => import('./add-tarifas/add-tarifas.module').then( m => m.AddTarifasPageModule)
  },
  {
    path: 'adm-medidores',
    loadChildren: () => import('./adm-medidores/adm-medidores.module').then( m => m.AdmMedidoresPageModule)
  },
  {
    path: 'adm-usuarios',
    loadChildren: () => import('./adm-usuarios/adm-usuarios.module').then( m => m.AdmUsuariosPageModule)
  },
  {
    path: 'tarifas',
    loadChildren: () => import('./tarifas/tarifas.module').then( m => m.TarifasPageModule)
  },
  {
    path: 'ver-lecturas',
    loadChildren: () => import('./ver-lecturas/ver-lecturas.module').then( m => m.VerLecturasPageModule)
  },
  {
    path: 'ver-facturas',
    loadChildren: () => import('./ver-facturas/ver-facturas.module').then( m => m.VerFacturasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
