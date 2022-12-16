import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMedidoresPageRoutingModule } from './add-medidores-routing.module';

import { AddMedidoresPage } from './add-medidores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddMedidoresPageRoutingModule
  ],
  declarations: [AddMedidoresPage]
})
export class AddMedidoresPageModule {}
