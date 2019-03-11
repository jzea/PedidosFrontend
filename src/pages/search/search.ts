import { Component,OnInit } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cart.service';
import { FormControl } from '@angular/forms';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService:CartService) {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.autocompleteItems = this.cartService.getProducts();
      console.log(this.autocompleteItems);
      this.filterItems();
    });
  }
  ngOnInit() {
  }
  filterItems() {
    this.toggle = true;
    if (!this.searchTerm) {
      this.toggle = false;
    }
    this.autocompleteItems = this.autocompleteItems.filter((item) => {
      return ((item.category).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
