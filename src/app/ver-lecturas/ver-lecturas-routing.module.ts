import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerLecturasPage } from './ver-lecturas.page';

const routes: Routes = [
  {
    path: '',
    component: VerLecturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerLecturasPageRoutingModule {}
