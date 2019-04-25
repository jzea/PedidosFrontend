import { Component,OnInit } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import {ProductoService } from '../../services/services-rest/producto.service';
import { CartService } from '../../services/cart.service';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage implements OnInit{
  autocompleteItems=[];
  searchTerm: string = '';
  searchControl: FormControl;
  toggle: boolean = false;
  temp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private productoService:ProductoService,private cartService:CartService) {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      if(this.temp){
        this.autocompleteItems=this.temp;
        this.findAll();
      }
      this.filterItems();
    });
  }
  ngOnInit() {
    this.findAll();
  }
  findAll(){
    this.productoService.findAll().subscribe(
      (data)=>{
        if(this.autocompleteItems.length==0){
          this.autocompleteItems = data['productos'];
        }
        this.temp=data['productos'];
        console.log(this.temp);
      }
    );
  }
  filterItems() {
    console.log("ejecutado filter")
    this.toggle = true;
    if (!this.searchTerm) {
      this.toggle = false;
    }
    this.autocompleteItems = this.autocompleteItems.filter((item) => {
      return ((item.titulo).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
}
