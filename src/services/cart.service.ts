import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { EmpresaService } from './services-rest/empresa.service';
import { Empresa} from '../models/empresa.model';
import { CategoriaEmpresa } from '../models/CategoriaEmpresa.model';
@Injectable()
export class CartService {

  private data = [
    {
      category: 'Pizza',
      expanded: true,
      products: [
        { id: 0, name: 'Salami', price: '8' },
        { id: 1, name: 'Classic', price: '5' },
        { id: 2, name: 'Tuna', price: '9' },
        { id: 3, name: 'Hawai', price: '7' }
      ]
    },
    {
      category: 'Pasta',
      products: [
        { id: 4, name: 'Mac & Cheese', price: '8' },
        { id: 5, name: 'Bolognese', price: '6' }
      ]
    },
    {
      category: 'Salad',
      products: [
        { id: 6, name: 'Ham & Egg', price: '8' },
        { id: 7, name: 'Basic', price: '5' },
        { id: 8, name: 'Ceaser', price: '9' }
      ]
    }
  ];

  private cart = [];
  private empresaAll:CategoriaEmpresa[]=[]; 
  private cartObservable: Subject<any[]> = new Subject();
  constructor(public empresaService: EmpresaService) {
    console.log("entro card");
    this.empresaService.findAll().subscribe(
      (data) => {
        let temp="";
        const empresas:Empresa[]=data['empresas'];
        for(let i=0; i<empresas.length;i++){
          console.log(empresas[i].categoria.nombrecat);
          
          if(empresas[i].categoria.nombrecat!=temp){
            temp=empresas[i].categoria.nombrecat;
            const category=empresas[i].categoria.nombrecat;
            empresas[i].categoria=null;
            const empresa:CategoriaEmpresa ={category,empresas:[empresas[i]],expanded:true}
            this.empresaAll.push(empresa);
            console.log(this.empresaAll)
          }else{
            for(let j=0; j<this.empresaAll.length;j++){
              if(this.empresaAll[j].category=temp){
                this.empresaAll[j].empresas.push(empresas[i]);
              }
          }
        }
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProducts() {
    return this.empresaAll;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
    this.cartObservable.next(this.cart);
  }
  getCartObservable(): Observable<any[]> {
    return this.cartObservable.asObservable();
  }
}