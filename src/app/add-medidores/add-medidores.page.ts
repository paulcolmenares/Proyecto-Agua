import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medidores } from '../Clases Modelos/medidores';
import { MedidoresService } from '../Servidores/medidores.service';

@Component({
  selector: 'app-add-medidores',
  templateUrl: './add-medidores.page.html',
  styleUrls: ['./add-medidores.page.scss'],
})
export class AddMedidoresPage implements OnInit {
  new_medidor = new FormGroup({
    marca : new FormControl('',[Validators.required,Validators.minLength(3)]),
    serial : new FormControl('',[Validators.required,Validators.minLength(5)]),
    reg_inic: new FormControl(0,[Validators.required,Validators.min(0)]),
    fech_inst: new FormControl(null,Validators.required)
  })

  constructor(private serv:MedidoresService) { }

  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
    // En desarrollo
  }

  Guardar() { 
    let Dato = new Medidores();
    Dato.marca=this.new_medidor.value.marca;
    Dato.serial=this.new_medidor.value.serial;
    Dato.reg_Inic=this.new_medidor.value.reg_inic;
    Dato.fechaInstalacion=this.new_medidor.value.fech_inst;
    this.serv.add(Dato);
    }
}
