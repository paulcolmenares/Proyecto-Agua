import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturadorPage } from './lecturador.page';

const routes: Routes = [
  {
    path: '',
    component: LecturadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturadorPageRoutingModule {}
