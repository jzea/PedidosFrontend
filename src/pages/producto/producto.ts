import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductoService } from '../../services/services-rest/producto.service';
import {Producto} from '../../models/producto.model';
import { CartService } from '../../services/cart.service';
/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  private productos:Producto[]=[];
  private nombreEmpresa:String="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public productoService:ProductoService,private cartService: CartService) {
     const codEmpresa= this.navParams.get("codempresa");
     this.nombreEmpresa= this.navParams.get("nombre");
     console.log(codEmpresa)
    this.productoService.findByCodEmpresa(codEmpresa).subscribe(
      (data)=> {
        this.productos=data['productos'];
        console.log(this.productos)
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
}
