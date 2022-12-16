
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Roles } from '../Clases Modelos/roles';
import { Usuario } from '../Clases Modelos/usuario';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  server = "https://localhost:9090/usuarios";
    
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient,
            private ruta:Router, private Store:StoreService) {   }

  public IniciarSesion(login:string,clave:string):Roles[] {
    let token=login+":"+clave;let roles_asig:Roles[]=[];
    this.Opciones.headers=
      this.Opciones.headers.set('Authorization','Basic '+btoa(token))
    this.http.get(this.server+"/"+login,this.Opciones).subscribe(
      data => { 
          this.Store.set("token",btoa(token));
          this.http.get(data['_links']['roles']['href'],this.Opciones).subscribe(
            datos => { let items= datos['_embedded']['roles'];
                  items.forEach(element => {
          let T:Roles = new Roles();
          let id_string:string = element['_links']['self']['href'];
          T.id=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
          T.codigo=element['codigo'];T.descripcion=element['descripcion'];
          T.activo=element['activo'];
          if (T.activo) roles_asig.push(T);
            });
            this.Store.set("roles",roles_asig);
            this.ruta.navigate(["/administrador"]);
            return roles_asig;
          
            
          },
      error => { console.log(error); }
    );  });
    return roles_asig;
  }

  add(T:Usuario):any {
    let dat=JSON.stringify(T); 
    this.Store.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
        this.http.post(this.server,dat,this.Opciones).subscribe(
          data => { console.log("Hecho",data); return data; },
          error => console.log(error)
        );
  });
  }

  borrar(T:Usuario) {
    this.Store.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
      this.http.delete(this.server+'/'+T.usr,this.Opciones)
      .subscribe(data=> console.log("Borrado"),
                  error=> console.log(error))
    })
  }

  lista():Usuario[] {
    let items:Usuario[]=[];
    this.Store.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
      this.http.get(this.server,this.Opciones).subscribe(
      data => { 
        let datos=data['_embedded']['usuarios'];
        datos.forEach(element => {
          let T:Usuario = new Usuario();
          let id_string:string = element['_links']['self']['href'];
          T.usr=id_string.substring(id_string.lastIndexOf('/')+1);
          T.clave=element['clave'];
          items.push(T);
        });
       });
    });
    return items;
  }

  getRoles(T:Usuario):Roles[] {
    let items:Roles[]=[];
    this.Store.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
      this.http.get(this.server+"/"+T.usr+"/roles",this.Opciones).subscribe(
      data => { 
        let datos=data['_embedded']['roles'];
        datos.forEach(element => {
          let T:Roles = new Roles();
          let id_string:string = element['_links']['self']['href'];
          T.id=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
          T.codigo=element['codigo'];
          T.descripcion=element['descripcion'];
          T.activo=element['activo'];
          items.push(T);
        });
       });
    });
    return items;
  }
  
}
