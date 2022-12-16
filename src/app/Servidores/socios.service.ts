
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socios } from '../Clases Modelos/socios';
import { Usuario } from '../Clases Modelos/usuario';
import { RolesService } from './roles.service';
import { StoreService } from './store.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SociosService {
  server = "https://localhost:9090/pers";

  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  Lista:Socios[]=[];
  constructor(private http:HttpClient,private serv:StoreService, private ServUSR:UsuarioService,
    private servROL:RolesService) { }

  getSocios():Socios[] {
    let items:Socios[]=[];
    this.serv.get('token').then(data => {
      console.log(data);
      
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
      
      this.http.get(this.server,this.Opciones).subscribe(
      data => { 
        let datos=data['_embedded']['Personas'];
        datos.forEach(element => {
          let T:Socios = new Socios();
          let id_string:string = element['_links']['self']['href'];
          T.id=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
          T.apellidos=element['apellidos'];
          T.nombres=element['nombres'];
          T.celular=element['celular'];
          T.correo=element['correo'];
          //T.foto="data:image/jpeg;base64,"+element['foto'];
          items.push(T);
        });
       });
    });
    return items;
  }
  add(T:Socios) {
    let new_usr=new Usuario(); let ID_ROL_SOCIO='12';
    new_usr.usr=T.apellidos.substring(0,3)+T.nombres.substring(0,3);
    new_usr.clave=T.apellidos.substring(0,3)+T.nombres.substring(0,3).valueOf;
    this.ServUSR.add(new_usr);
    let dat=JSON.stringify(T);
    this.serv.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
        this.http.post(this.server,dat,this.Opciones).subscribe(
          data => {  
                      },
          error => console.log(error)
        );
      }, 
      error => console.log(error)
    );
  }

  borrar(T:Socios) {
    this.serv.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
      this.http.delete(this.server+'/'+T.id.toString(),this.Opciones)
      .subscribe(data=> console.log("Borrado"),
                  error=> console.log(error))
    })
  }
  asociar(U:string,S:string) {
    let Opciones2 = {
      headers: new HttpHeaders({
        'Content-Type':  'text/uri-list'
      })
    };
    let server2 = S+"/usr";
    let USR = this.server.substring(0,this.server.lastIndexOf("/"))+"/usuarios/"+U;
    
    console.log(server2,USR);

    this.serv.get('token').then(data => {
      Opciones2.headers=Opciones2.headers.
        set('Authorization','Basic '+data);
        this.http.put(server2,USR,Opciones2).subscribe(
          data => console.log("HECHO"),
          error => console.log(error)
        );
  });
  }
}