import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consumo } from '../Clases Modelos/consumo';
import { LecturasService } from '../Servidores/lecturas.service';
import { StoreService } from '../Servidores/store.service';

@Component({
  selector: 'app-add-lecturaciones',
  templateUrl: './add-lecturaciones.page.html',
  styleUrls: ['./add-lecturaciones.page.scss'],
})
export class AddLecturacionesPage implements OnInit {
  new_lectura = new FormGroup({
    lectura: new FormControl(0,[Validators.required,Validators.min(0)]),
    fecha: new FormControl(null,Validators.required)
  })

  constructor(private serv:LecturasService, private datos:StoreService) { }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
  
  }

  Guardar() { 
    this.datos.get("medidor").then(
      data => {
        let Dato = new Consumo();
        Dato.med=data;
        console.log(Dato,data);
        Dato.lectura=this.new_lectura.value.lectura;
        Dato.fecha=this.new_lectura.value.fecha;
        this.serv.add(Dato);
      }
    )
    
    }
}
