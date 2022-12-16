import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmFacturasPage } from './adm-facturas.page';

const routes: Routes = [
  {
    path: '',
    component: AdmFacturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmFacturasPageRoutingModule {}
