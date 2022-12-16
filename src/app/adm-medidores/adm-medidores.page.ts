import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medidores } from '../Clases Modelos/medidores';
import { MedidoresService } from '../Servidores/medidores.service';
import { SociosService } from '../Servidores/socios.service';
import { UsuarioService } from '../Servidores/usuario.service';

@Component({
  selector: 'app-adm-medidores',
  templateUrl: './adm-medidores.page.html',
  styleUrls: ['./adm-medidores.page.scss'],
})
export class AdmMedidoresPage implements OnInit {

  list_medidor:any;
  list_socios: any;
  asoci = new FormGroup({
    soc : new FormControl('',[Validators.required]),
    med : new FormControl('',[Validators.required])
  }
  )

  constructor(private serv:MedidoresService,private serv2:SociosService) { }

  ngOnInit() {
    this.list_socios=this.serv2.getSocios();
    this.list_medidor=this.serv.lista();

  }

  editar(e) { console.log(e); }

  borrar(e:Medidores) { this.serv.borrar(e); this.ngOnInit(); }
  
  asociar() {
    this.serv.asociarsociomedidor(
      this.asoci.value.med,
      this.asoci.value.soc
    );
}
}
