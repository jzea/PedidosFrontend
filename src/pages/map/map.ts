import {MapService} from '../../services/map.service';
import { Component } from "@angular/core/";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserStorageService} from '../../services/user-storage.service';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  direccion='Av. Peru 700 andahuaylas';
  constructor(public mapService:MapService,public navController:NavController,public userStorageService:UserStorageService) { }
  
  ionViewDidLoad() {
    this.mapService.loadMap('map_canvas');
  }
  geocoder(){
    this.mapService.geocoder(this.direccion).then(
      (data)=>{
        console.log("valor de la promesa");
        console.log(data);
        if(data.length){
          const latLng={lat:data[0].position.lat,lng:data[0].position.lng,direccion:this.direccion}
          this.userStorageService.setLatLng(latLng);
        }
      }
    )
  }
  back(){
    this.navController.pop();
  }
}