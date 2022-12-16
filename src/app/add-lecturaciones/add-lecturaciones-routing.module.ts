import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLecturacionesPage } from './add-lecturaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AddLecturacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLecturacionesPageRoutingModule {}
