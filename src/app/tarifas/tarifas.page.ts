import { Component, OnInit } from '@angular/core';
import { TarifaService } from '../Servidores/tarifa.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.page.html',
  styleUrls: ['./tarifas.page.scss'],
})
export class TarifasPage implements OnInit {
  list_tarifas=[];
  constructor(private servTarifas:TarifaService) { }

  ngOnInit() {
    this.list_tarifas=this.servTarifas.lista();
  }

}
