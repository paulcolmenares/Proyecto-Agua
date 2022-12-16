import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmFacturasPageRoutingModule } from './adm-facturas-routing.module';

import { AdmFacturasPage } from './adm-facturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    AdmFacturasPageRoutingModule
  ],
  declarations: [AdmFacturasPage]
})
export class AdmFacturasPageModule {}
