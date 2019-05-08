import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { SearchPage } from '../pages/search/search';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any, icon:any }>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userStorageService: UserStorageService) {
    this.initializeApp();

    this.userStorageService.getRol().then(
      rol=>{  
        this.changeMenu(rol);
      }
    )
    this.userStorageService.getRolObservable().subscribe(
      rol=>{
        this.changeMenu(rol);
      }
    )
  }
  changeMenu(rol){
    switch(rol){
      case "admin":
      this.pages = [
        { title: 'Inicio', component: HomePage, icon: 'home' },
        { title: 'Pedidos pendientes', component: ListPage, icon: 'search' },
      ];
      break;
      case "trabajador":
      this.pages = [
        { title: 'Inicio', component: HomePage, icon: 'home' },
        { title: 'Pedidos pendientes', component: ListPage, icon: 'search' },
      ];
      break;
      case "usuario":
      this.pages = [
        { title: 'Inicio', component: HomePage, icon: 'home' },
        { title: 'Pedido', component: CartPage, icon: 'list-box' },
        { title: 'Buscar Productos', component: SearchPage, icon: 'search' },
        { title: 'Lita', component: ListPage, icon: 'search' },
      ];
      break;
      default:
      this.pages = [
        { title: 'Inicio', component: HomePage, icon: 'home' },
      ];
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.homePageRedirect();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  homePageRedirect() {
    this.userStorageService.getIdUser().then(
      data => {
        if (data != undefined) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  logout() {
    this.userStorageService.removeIdUser();
    window.location.reload(); // reiniciar socket
  }
}
