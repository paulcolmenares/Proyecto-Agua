import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../Servidores/roles.service';
import { UsuarioService } from '../Servidores/usuario.service';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.page.html',
  styleUrls: ['./adm-usuarios.page.scss'],
})
export class AdmUsuariosPage implements OnInit {
  list_usuarios:any;
  list_roles:any;
  UserRol = new FormGroup({
    usr : new FormControl('',[Validators.required]),
    rol : new FormControl('',[Validators.required])
  }
  )


  constructor(private serv:UsuarioService, private serv2:RolesService) { }

  ngOnInit() {
    this.list_usuarios=this.serv.lista();
    this.list_roles=this.serv2.lista();
  }

  user_roles() { console.log("Listar Roles"); }

  Guardar() { console.log(this.UserRol.value);
    this.serv2.asociar(this.UserRol.value.usr,this.UserRol.value.rol);
  }
}
