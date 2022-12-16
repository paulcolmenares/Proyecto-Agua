import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Roles } from "../Clases Modelos/roles";
import { StoreService } from "./store.service";


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  server = "https://localhost:9090/roles";
  
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, 
    private serv:StoreService, private toastController: ToastController) { }

  lista():Roles[] {
      let items:Roles[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server,this.Opciones).subscribe(
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
  
    add(T:Roles) {
      let dat=JSON.stringify(T); 
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
          this.http.post(this.server,dat,this.Opciones).subscribe(
            async data => { const toast = await this.toastController.create({
              message: 'Guardado',
              duration: 1000,
              position: 'top'
            });
            await toast.present();
           }, 
            async error => {
              const toast = await this.toastController.create({
                message: 'Error',
                duration: 1000,
                position: 'top'
              });
              await toast.present();
            }
          );
    });
    }
  
    borrar(T:Roles) {
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.delete(this.server+'/'+T.id.toString(),this.Opciones)
        .subscribe(data=> console.log("Borrado"),
                    error=> console.log(error))
      })
    }
  
    asociar(U:string,R:string) {
      let Opciones2 = {
        headers: new HttpHeaders({
          'Content-Type':  'text/uri-list'
        })
      };
      let server2 = this.server+"/"+R+"/users";
      let USR = this.server.substring(0,this.server.lastIndexOf("/"))+"/usuarios/"+U;
      
      console.log(server2,USR);
  
      this.serv.get('token').then(data => {
        Opciones2.headers=Opciones2.headers.
          set('Authorization','Basic '+data);
          this.http.patch(server2,USR,Opciones2).subscribe(
            data => console.log("HECHO",data),
            error => console.log(error)
          );
    });
    }
}
