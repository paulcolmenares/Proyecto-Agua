import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Consumo } from '../Clases Modelos/consumo';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class LecturasService {
  server = "https://localhost:9090/consumos";
  
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient, 
    private serv:StoreService, private toastController: ToastController) { }

  lista():Consumo[] {
      let items:Consumo[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server,this.Opciones).subscribe(
        data => { 
          let datos=data['_embedded']['consumos'];
          datos.forEach(element => {
            let T:Consumo = new Consumo();
            let id_string:string = element['_links']['self']['href'];
            T.id_Consumos=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
            T.lectura=element['lectura'];
            T.fecha=element['fecha'];
            T.med= element['_links']['med']['href'];
            items.push(T);
          });
         });
      });
      return items;
    }

    add(T:Consumo) {
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
  
    borrar(T:Consumo) {
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.delete(this.server+'/'+T.id_Consumos.toString(),this.Opciones)
        .subscribe(async data => { const toast = await this.toastController.create({
          message: 'Eliminado',
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
        })
      })
    }
}
