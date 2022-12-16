import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLecturacionesPageRoutingModule } from './add-lecturaciones-routing.module';

import { AddLecturacionesPage } from './add-lecturaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddLecturacionesPageRoutingModule
  ],
  declarations: [AddLecturacionesPage]
})
export class AddLecturacionesPageModule {}
