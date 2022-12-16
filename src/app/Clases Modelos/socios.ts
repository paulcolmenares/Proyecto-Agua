export class Socios {
    id:Number;
    cedula:string;
    celular:string;
    nombres:string;
    apellidos:string;
    correo:string;
    activo:boolean;
    foto:string;
    fechaNacimiento:Date;
    fechaRegistro:Date;
    direccion:string;
setid(i:Number){this.id=i}
getid():Number{return this.id;}
setcedula(c:string){this.cedula=c}
getcedula():string{return this.cedula;}
setcelular(ce:string){this.celular=ce}
getcelular():string{return this.celular;}
setnombres(co:string){this.correo=co}
getnombres():string{return this.correo;}
setapellidos(a:string){this.apellidos=a}
getapellidos():string{return this.apellidos;}
setactivo(ac:boolean){this.activo=ac}
getactivo():boolean{return this.activo;}
setfoto(fo:string){this.foto=fo}
getfoto():string{return this.correo;}
setfechaNacimiento(fe:Date){this.fechaNacimiento=fe}
getfechaNacimiento():Date{return this.fechaNacimiento;}
setfechaRegistro(f:Date){this.fechaRegistro=f}
getfechaRegistro():Date{return this.fechaRegistro;}
setdireccion(d:string){this.direccion=d}
getdireccion():string{return this.direccion;}

constructor(){}
}
