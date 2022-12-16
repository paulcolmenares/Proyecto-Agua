import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { Consumo } from '../Clases Modelos/consumo';
import { Medidores } from '../Clases Modelos/medidores';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class MedidoresService {
  server = "https://localhost:9090/medidores";
  
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient, 
    private serv:StoreService, toastController:ToastController) { }

  lista():Medidores[] {
      let items:Medidores[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server,this.Opciones).subscribe(
        data => { 
          let datos=data['_embedded']['medidors'];
          datos.forEach(element => {
            let T:Medidores = new Medidores();
            let id_string:string = element['_links']['self']['href'];
            T.id_Medidor=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
            T.marca=element['marca'];
            T.serial=element['serial'];
            T.reg_Inic=element['reg_Inic'];
            T.fechaInstalacion=element['fechaInstalacion'];
            items.push(T);
          });
         });
      });
      return items;
    }

    lecturas(M:Medidores):Consumo[] {
      let items:Consumo[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server+"/"+M.id_Medidor+"/lecturas",this.Opciones).
        subscribe(
        data => { 
          let datos=data['_embedded']['consumoses'];
          datos.forEach(element => {
            let T:Consumo = new Consumo();
            let id_string:string = element['_links']['self']['href'];
            T.id_Consumos=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
            T.lectura=element['lectura'];
            T.fecha=element['fecha'];
            items.push(T);
          });
         });
      });
      return items;
    }
  
    add(T:Medidores) {
      let dat=JSON.stringify(T); 
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
          this.http.post(this.server,dat,this.Opciones).subscribe(
            async data => { const toast = await toastController.create({
              message: 'Guardado',
              duration: 1000,
              position: 'top'
            });
            await toast.present();
           }, 
            async error => {
              const toast = await toastController.create({
                message: 'Error',
                duration: 1000,
                position: 'top'
              });
              await toast.present();
            }
          );
    });
    }
  
    borrar(T:Medidores) {
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.delete(this.server+'/'+T.id_Medidor.toString(),this.Opciones)
        .subscribe(data=> console.log("Borrado"),
                    error=> console.log(error))
      })
    }
    //ASIGNAR MEDIDOR AL SOCIO
  asociarsociomedidor(M: string, S: string) {
    let Opciones2 = {
      headers: new HttpHeaders({
        'Content-Type': 'text/uri-list',
      }),
    };
    let server2 = 'https://localhost:9090/medidores/' + M + '/pers';
    let USR =
      this.server.substring(0, this.server.lastIndexOf('/')) +
      '/soc/' +
      S;
    this.serv.get('token').then((data) => {
      Opciones2.headers = Opciones2.headers.
      set('Authorization','Basic ' + data);
      this.http.put(server2, USR, Opciones2).subscribe(
        data => console.log("HECHO",data),
          error => console.log(error)
      );
    });
  }
}
