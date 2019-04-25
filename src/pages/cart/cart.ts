import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cart.service';
import { PedidoService} from '../../services/services-rest/pedido.service';
import { Pedido} from '../../models/pedido.model';
import {UserStorageService} from '../../services/user-storage.service';
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage  implements OnInit {
  selectedItems = [];
  total = 0;
  codUser="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService:CartService, private pedidoService:PedidoService,private userStorageService:UserStorageService) {
    this.userStorageService.getIdUser().then(
      (codUser)=>{
        this.codUser=codUser;
        console.log(codUser)
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
    this.selectedItems = Object.keys(selected).map(key => selected[key])

    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.precio), 0);
    console.log(this.selectedItems)
  }
  pedir(){
    console.log('usuario '+ this.codUser);
  const pedido:Pedido ={codusuario:this.codUser,fecha:'2019/04/25',latitud:'11',longitud:'12'};
  this.pedidoService.create(pedido).subscribe(
    (data)=>{
      console.log(data);
    }
  )
  }
}
