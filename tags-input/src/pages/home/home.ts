import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = ['Pizza', 'Pasta', 'Parmesan'];
  itemsStr = '';
  constructor(public navCtrl: NavController) {

  }

  tagStrVerify(str: string){
    return str !== 'ABC' && str.trim() !== '';
  }

  onChange(val){
    this.itemsStr = this.items.toString();
    console.log(val)
  }
}
