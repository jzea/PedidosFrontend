import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'cartcount',
  templateUrl: 'cartcount.html'
})
export class CartcountComponent {

  countCart: number = 0;

  constructor(private navCtrl: NavController, private cartService:CartService) {
    this.cartService.getCartObservable().subscribe(
      data => this.countCart = data.length
    )
  }
  openCart() {
    alert("aaa")
    this.navCtrl.push(CartPage);
  }
}
