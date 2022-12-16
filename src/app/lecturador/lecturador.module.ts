import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturadorPageRoutingModule } from './lecturador-routing.module';

import { LecturadorPage } from './lecturador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturadorPageRoutingModule
  ],
  declarations: [LecturadorPage]
})
export class LecturadorPageModule {}
