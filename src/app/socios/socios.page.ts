import { Component, OnInit } from '@angular/core';
import { Roles } from '../Clases Modelos/roles';
import { Socios } from '../Clases Modelos/socios';
import { SociosService } from '../Servidores/socios.service';
import { StoreService } from '../Servidores/store.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.page.html',
  styleUrls: ['./socios.page.scss'],
})
export class SociosPage implements OnInit {
  Roles:Roles[];
  sel:Roles=new Roles();
  listasocios:any;
  constructor(private serv:StoreService,private serv2:SociosService) { }

  ngOnInit() {
    this.listasocios=this.serv2.getSocios();
    
          this.serv.get("roles").then((data: Roles[]) => {
            this.Roles = data;this.sel=this.Roles[0];
      });
    }
    borrar(e:Socios) { this.serv2.borrar(e);
}
}