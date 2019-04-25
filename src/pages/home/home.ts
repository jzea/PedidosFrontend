import { Component, OnInit  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartService } from '../../services/cart.service';
import {ProductoPage} from '../../pages/producto/producto';
import {Empresa} from '../../models/empresa.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit  {
  cart = [];
  items = [];
 
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(public navCtrl: NavController,private cartService: CartService) {

  }
  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
  }
  verProductos(empresa:Empresa){
  this.navCtrl.push(ProductoPage, { codempresa:empresa.codempresa,nombre:empresa.nombre});
  console.log()
  }
}
