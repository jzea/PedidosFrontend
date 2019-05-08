import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cart.service';
import { PedidoService} from '../../services/services-rest/pedido.service';
import { PedidoDetalleService} from '../../services/services-rest/pedidoDetalle.service';
import { Pedido} from '../../models/pedido.model';
import { Producto} from '../../models/producto.model';
import { PedidoDetalle} from '../../models/pedidoDetalle.model';
import {UserStorageService} from '../../services/user-storage.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { ToastController } from 'ionic-angular';
import {ToastService} from '../../services/toast.service';
import {MapPage} from '../map/map';
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage  implements OnInit {
  productos= [];
  total = 0;
  codUser="";
  latLng;
  constructor(private toastService:ToastService,private payPal: PayPal,public navCtrl: NavController, public navParams: NavParams, private cartService:CartService, private pedidoService:PedidoService,private userStorageService:UserStorageService,private pedidoDetalleService:PedidoDetalleService) {
    this.userStorageService.getIdUser().then(
      (codUser)=>{
        this.codUser=codUser;
        console.log(codUser)
      }
    );
    this.userStorageService.getLatLng().subscribe(
      (data)=>{
        this.latLng=data;
      }
    )  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};
  console.log(items)
    for (let obj of items) {
      
      if (selected[obj.codproducto]) {
        selected[obj.codproducto].count++;
      } else {
        selected[obj.codproducto] = {...obj, count: 1};
        console.log("objid :" + JSON.stringify(selected[obj.codproducto]))
      }
    }
    this.productos = Object.keys(selected).map(key => selected[key])

    this.total = this.productos.reduce((a, b) => a + (b.count * b.precio), 0);
    console.log(this.productos)
  }
  saveOrder(){
    console.log('usuario '+ this.codUser);
    let latitud="";
    let longitud="";
    if(this.latLng){
       latitud=this.latLng.lat;
       longitud=this.latLng.lng;
    }
  const pedido:Pedido ={codusuario:this.codUser,fecha:'2019/04/25',latitud,longitud};
  this.pedidoService.create(pedido).subscribe(
    (data)=>{
      console.log(data);
      const pedido:Pedido=data['pedido'];
      for(let i=0;i<this.productos.length;i++){
        const pedidoDetalle:PedidoDetalle={codpedido:pedido.codpedido,codproducto:this.productos[i].codproducto,cantidad:this.productos[i].count}
        this.pedidoDetalleService.create(pedidoDetalle).subscribe(
          (data)=>{
            console.log(data);
          }
        )
      }
    }
  )
  }
  pedir(){
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AXO-7z-ToXOStZ-LG5x8y0ZwTTWZrFnmZEpec0RmtwLSvLlRHRVkvhufGA7vBYtDLutka35J0sidOLkx'
  }).then(() => {
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      acceptCreditCards: true,
      //languageOrLocale: 'pt-BR',
      //merchantName: 'CanalDoAbranches',
      merchantPrivacyPolicyURL: '',
      merchantUserAgreementURL: ''
    })).then(() => {
    
      let payment = new PayPalPayment(this.total+'.00', 'USD', 'Pago por el pedido', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((response) => {
        this.toastService.presentToast("Pago realizado correctamente");
        this.saveOrder();
      }, () => {
        this.toastService.presentToast("Error al hacer el pago de paypal");
      })
    })
  })
  }
  addDireccion(){
    this.navCtrl.push(MapPage);
  }

}
