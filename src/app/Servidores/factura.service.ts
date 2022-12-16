import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Factura } from '../Clases Modelos/factura';

import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  server = "https://localhost:9090/facturas";
  
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, 
    private serv:StoreService, private toastController: ToastController) { }
  cobrar(T:Factura) {
    
  }

  add(T:Factura) {
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
  
  lista():Factura[] {
      let items:Factura[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server,this.Opciones).subscribe(
        data => { 
          let datos=data['_embedded']['facturas'];
          datos.forEach(element => {
            let T:Factura = new Factura();
            let id_string:string = element['_links']['self']['href'];
            T.id=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
            T.razonsocial=element['razonsocial'];
            T.nit=element['nit'];
            T.periodo= element['periodo'];
            T.monto=element['monto'];
            T.estado=element['estado'];
            items.push(T);
          });
         });
      });
      return items;
    }

    borrar(T:Factura) {
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.delete(this.server+'/'+T.id.toString(),this.Opciones)
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
