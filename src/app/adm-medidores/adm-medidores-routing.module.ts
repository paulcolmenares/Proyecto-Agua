import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmMedidoresPage } from './adm-medidores.page';

const routes: Routes = [
  {
    path: '',
    component: AdmMedidoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmMedidoresPageRoutingModule {}
