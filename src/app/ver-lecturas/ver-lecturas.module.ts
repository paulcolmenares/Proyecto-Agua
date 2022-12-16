import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerLecturasPageRoutingModule } from './ver-lecturas-routing.module';

import { VerLecturasPage } from './ver-lecturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerLecturasPageRoutingModule
  ],
  declarations: [VerLecturasPage]
})
export class VerLecturasPageModule {}
