import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { SearchPage } from '../pages/search/search';
import {ProductoPage } from '../pages/producto/producto';
import { RegisterPage } from '../pages/register/register';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userStorageService:UserStorageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'login', component: LoginPage },
      { title: 'card', component: CartPage },
      { title: 'search', component: SearchPage },
      { title: 'register', component: RegisterPage },
      { title: 'producto', component: ProductoPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  homePageRedirect() {
    this.userStorageService.getIdUser().then(
      data => {
        if (data != undefined) {
          this.rootPage = HomePage;
          alert("aa");
        } else {
          this.rootPage = LoginPage;
          alert("nn");
        }
      });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
