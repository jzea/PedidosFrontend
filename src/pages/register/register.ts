import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import {LoginPage} from '../../pages/login/login';
import { UserService } from '../../services/services-rest/user.service';
import { ToastService } from '../../services/toast.service';
import { Strings } from "../../utils/strings";
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  credentials: User = { usuario: '', contrasena: '', direccion: '', telefono: 0, rol: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService,public toastService: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.userService.register(this.credentials).subscribe(
      (data)=>{
        this.toastService.presentToast(Strings.OPERACION_EXITOSA);
        setTimeout(() => this.navCtrl.setRoot(LoginPage), 2000);
      },
      (error)=> {
          console.log(error);
      }
    );
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
}
