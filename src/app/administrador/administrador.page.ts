import { Component, OnInit } from '@angular/core';
import { Roles } from '../Clases Modelos/roles';
import { StoreService } from '../Servidores/store.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  Roles:Roles[];
  sel:Roles=new Roles();
  constructor(private serv:StoreService) { }

  ngOnInit() {
      this.serv.get("roles").then((data: Roles[]) => {
        this.Roles = data;this.sel=this.Roles[0];
  });

} }