import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import {EntregaPedidoService} from '../../services/services-rest/entregaPedido.service';
import {EntregaPedido} from '../../models/entregaPedido.model';
import {ToastService} from '../../services/toast.service';
import {SearchPage} from '../search/search';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  pedidos:EntregaPedido[];
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public entregaPedidoService:EntregaPedidoService, public toastService:ToastService) {
    this.entregaPedidoService.findByCodUsuario(5).subscribe(
      (data)=>{
        this.pedidos=data['entregaPedido'];
        console.log(this.pedidos);
      }
    )
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
  presentContactModal() {
    let contactModal = this.modalCtrl.create(SearchPage);
    contactModal.present();
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  entregarPedido(){
    this.toastService.presentToast("Pedido entregado correctamente");
  }
}
