import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import {LoginPage} from '../../pages/login/login';
import { UserService } from '../../services/services-rest/user.service';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  credentials: User = { usuario: '', contrasena: '', direccion: '', telefono: 0, rol: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.userService.register(this.credentials).subscribe(
      (data)=>{
        console.log(data);
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
