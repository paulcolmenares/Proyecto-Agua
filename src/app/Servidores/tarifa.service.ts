import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Consumo } from "../Clases Modelos/consumo";
import { Factura } from "../Clases Modelos/factura";
import { Tarifa } from "../Clases Modelos/tarifa";
import { FacturaService } from "./factura.service";
import { StoreService } from "./store.service";


@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  server = "https://localhost:9090/tarifas";
  
  Opciones = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient, private servFact:FacturaService, 
    private serv:StoreService, private toastController: ToastController) { }

  GenerarFactura(L:Consumo) {
    let fecha=L.fecha;let lec:number=0;
    let base=L.lectura;base-=parseInt(L.lectura.toFixed(0));
    if(base+0.5>0.5) base+=0.5;
    lec=parseInt((base+L.lectura).toFixed(0));
    let items:Tarifa[]=[];
    this.serv.get('token').then(data => {
      this.Opciones.headers=this.Opciones.headers.
        set('Authorization','Basic '+data);
      this.http.get(this.server+"/search/aplic_tarif?fech="+fecha
      +"&consu="+lec,this.Opciones)
      .subscribe(
      data => { 
        let datos=data['_embedded']['tarifas'];
        datos.forEach(element => {
          let T:Tarifa = new Tarifa();
          let id_string:string = element['_links']['self']['href'];
          T.id=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
          T.consumoMax=element['consumoMax'];
          T.fechaInic=element['fechaInic'];
          T.costoUnit= element['costoUnit'];
          items.push(T);
        });

        let NuevaFact:Factura= new Factura();
        NuevaFact.razonsocial="Socio *Apellidos* Nombres*";
        NuevaFact.nit=1874681; //Cedula del Socio
        NuevaFact.periodo=new Date(L.fecha).toLocaleDateString('es-BO', { month: 'long', year: "numeric" })
        NuevaFact.estado=false;
        NuevaFact.monto=Math.round(L.lectura*items[0].costoUnit*100)/100;
        this.servFact.add(NuevaFact);
       });
    });
  }

  lista():Tarifa[] {
      let items:Tarifa[]=[];
      this.serv.get('token').then(data => {
        this.Opciones.headers=this.Opciones.headers.
          set('Authorization','Basic '+data);
        this.http.get(this.server,this.Opciones).subscribe(
        data => { 
          let datos=data['_embedded']['tarifas'];
          datos.forEach(element => {
            let T:Tarifa = new Tarifa();
            let id_string:string = element['_links']['self']['href'];
            T.id=Number.parseInt(id_string.substring(id_string.lastIndexOf('/')+1));
            T.consumoMax=element['consumoMax'];
            T.fechaInic=element['fechaInic'];
            T.costoUnit= element['costoUnit'];
            items.push(T);
          });
         });
      });
      return items;
    }

    add(T:Tarifa) {
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
  
    borrar(T:Tarifa) {
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
