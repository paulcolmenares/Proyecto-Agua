import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTarifasPageRoutingModule } from './add-tarifas-routing.module';

import { AddTarifasPage } from './add-tarifas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTarifasPageRoutingModule
  ],
  declarations: [AddTarifasPage]
})
export class AddTarifasPageModule {}
