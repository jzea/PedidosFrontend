import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { MapPage } from '../pages/map/map';
import { SearchPage } from '../pages/search/search';
import { RegisterPage } from '../pages/register/register';
import {ProductoPage } from '../pages/producto/producto';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserStorageService } from '../services/user-storage.service';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/services-rest/user.service';
import { PedidoService} from '../services/services-rest/pedido.service';
import { EntregaPedidoService} from '../services/services-rest/entregaPedido.service';
import { PedidoDetalleService} from '../services/services-rest/pedidoDetalle.service';
import{ProductoService } from '../services/services-rest/producto.service';
import {EmpresaService} from '../services/services-rest/empresa.service';
import { HttpService } from '../core/http.service';
import {CartcountComponent} from '../components/cartcount/cartcount';
import { PayPal} from '@ionic-native/paypal';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapService } from '../services/map.service';
import {ToastService} from '../services/toast.service';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CartPage,
    MapPage,
    SearchPage,
    ProductoPage,
    RegisterPage,
    CartcountComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CartPage,
    MapPage,
    SearchPage,
    ProductoPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    UserStorageService,
    CartService,
    UserService,
    PedidoService,
    PedidoDetalleService,
    EntregaPedidoService,
    ProductoService,
    EmpresaService,
    HttpService,
    PayPal,
    MapService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
