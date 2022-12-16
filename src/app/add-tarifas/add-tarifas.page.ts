import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tarifa } from '../Clases Modelos/tarifa';
import { TarifaService } from '../Servidores/tarifa.service';

@Component({
  selector: 'app-add-tarifas',
  templateUrl: './add-tarifas.page.html',
  styleUrls: ['./add-tarifas.page.scss'],
})
export class AddTarifasPage implements OnInit {
  new_tarifa = new FormGroup({
    consumo : new FormControl(0,[Validators.required,Validators.min(5)]),
    costo: new FormControl(0,[Validators.required,Validators.min(0.2)]),
    fecha: new FormControl(null,Validators.required)
  })

  constructor(private serv:TarifaService) { }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
    // En desarrollo
  }

  Guardar() { 
    let Dato = new Tarifa();
    Dato.fechaInic=this.new_tarifa.value.fecha;
    Dato.consumoMax=this.new_tarifa.value.consumo;
    Dato.costoUnit=this.new_tarifa.value.costo;
    this.serv.add(Dato);
    }
}
