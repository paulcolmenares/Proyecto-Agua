
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../Servidores/usuario.service';
import {Storage} from "@ionic/storage";
import { StoreService } from '../Servidores/store.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 datos = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(2)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(2)]),
  });
  isCaptchaValid=false;
  constructor(private serv:UsuarioService,
    private Store:StoreService) { }
 

  ngOnInit() {
    this.Store.clear();
  }
  public InicSes() {
    let X=this.serv.IniciarSesion(this.datos.controls.user.value,
      this.datos.controls.pass.value);
    console.log(X);
  }


}
