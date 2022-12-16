import { Component, OnInit } from '@angular/core';
import { Consumo } from '../Clases Modelos/consumo';
import { Medidores } from '../Clases Modelos/medidores';
import { Tarifa } from '../Clases Modelos/tarifa';
import { MedidoresService } from '../Servidores/medidores.service';
import { StoreService } from '../Servidores/store.service';
import { TarifaService } from '../Servidores/tarifa.service';

@Component({
  selector: 'app-lecturador',
  templateUrl: './lecturador.page.html',
  styleUrls: ['./lecturador.page.scss'],
})
export class LecturadorPage implements OnInit {
  list_medidores=[];list_lecturas=[];
  medi:Medidores;
  tarif_aplica:Tarifa;

  constructor(private servMedidores:MedidoresService,
            private servTarifas:TarifaService,
            private ServStore:StoreService) { }

  ngOnInit() {
    this.list_medidores=this.servMedidores.lista();
  }
  activar() {
    this.list_lecturas=this.servMedidores.lecturas(this.medi);
    this.ServStore.set("medidor","https://localhost:9090/medidores/"+this.medi.id_Medidor);
  }
  facturar(datoLec:Consumo) { 
    this.servTarifas.GenerarFactura(datoLec);
   }
  }


