import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Roles } from '../Clases Modelos/roles';
import { Socios } from '../Clases Modelos/socios';
import { SociosService } from '../Servidores/socios.service';
import { StoreService } from '../Servidores/store.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  Roles:Roles[];
  sel:Roles=new Roles();
  listasocios:any;
  imageError:String="";
  isImageSaved: boolean = false;
  cardImageBase64: string = "";
  imgBase64Path:string ="";

  new_socio = new FormGroup({
    nom : new FormControl('',[Validators.required,Validators.minLength(3)]),
    ape : new FormControl('',[Validators.required,Validators.minLength(5)]),
    direc: new FormControl('',[Validators.required,Validators.minLength(10)]),
    fech_reg: new FormControl(null,Validators.required),
    correo: new FormControl('',[Validators.required,Validators.email]),
    celu: new FormControl('',[Validators.required,Validators.minLength(7)]),
    fech_nac: new FormControl(null,Validators.required),
    activ: new FormControl()
  }
  )
  constructor(private serv:StoreService,private serv2:SociosService) { }

  ngOnInit() {
this.listasocios=this.serv2.getSocios();

      this.serv.get("roles").then((data: Roles[]) => {
        this.Roles = data;this.sel=this.Roles[0];
  });
}
Guardar() { 
  var Soc:Socios = new Socios();
  Soc.nombres=this.new_socio.value.nom;
  Soc.apellidos=this.new_socio.value.ape;
  Soc.celular=this.new_socio.value.celu;
  Soc.correo=this.new_socio.value.correo;
  Soc.direccion=this.new_socio.value.direc;
  Soc.activo=this.new_socio.value.activ;
  Soc.fechaNacimiento=this.new_socio.value.fech_nac;
  Soc.fechaRegistro=this.new_socio.value.fech_reg;
  //if(this.isImageSaved) Soc.foto=this.imgBase64Path;
 // else Soc.foto="";
  this.serv2.add(Soc);
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  foto(fileInput: any) {
    this.imageError = "";
    console.log(fileInput);
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';
                console.log(this.imageError);
            return false;
        }
        
        if (!allowed_types.includes(fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            console.log(this.imageError);
            return false;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {    
                this.cardImageBase64 = e.target.result;
                this.imgBase64Path = this.cardImageBase64.substring(
                  this.cardImageBase64.indexOf("base64")+7);
                console.log(this.imgBase64Path);
                this.isImageSaved = true;
                return true;
                }
            };

        reader.readAsDataURL(fileInput.target.files[0]);
        console.log(reader);
        return true;
    }
    else return false;
}
}

