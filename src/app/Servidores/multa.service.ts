import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Multa } from '../Clases Modelos/multa';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class MultaService {
  server = "https://localhost:9090/multas";
  
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  toastController: any;

  constructor(private http: HttpClient, 
    private serv:StoreService) { }

  lista():Multa[] {
      let items:Multa[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server,this.Opciones).subscribe(
        data => { 
          let datos=data['_embedded']['multas'];
          datos.forEach(element => {
            let T:Multa = new Multa();
            let id_string:string = element['_links']['self']['href'];
            T.id_Multas=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
            T.FechaVigencia=element['fechaVigencia'];
            T.monto=element['monto'];
            items.push(T);
          });
         });
      });
      return items;
    }
  
    add(T:Multa) {
      let dat=JSON.stringify(T); 
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
          this.http.post(this.server,dat,this.Opciones).subscribe(
            async data => { const toast = await this.toastController.create({
              message: 'Guardado',
              duration: 1000,
              position: top
            });
            await toast.present();
           }, 
            async error => {
              const toast = await this.toastController.create({
                message: 'Error',
                duration: 1000,
                position: top
              });
              await toast.present();
            }
          );
    });
}
}
