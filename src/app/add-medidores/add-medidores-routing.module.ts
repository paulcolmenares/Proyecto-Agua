import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMedidoresPage } from './add-medidores.page';

const routes: Routes = [
  {
    path: '',
    component: AddMedidoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMedidoresPageRoutingModule {}
