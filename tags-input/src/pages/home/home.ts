import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = ['Pizza', 'Pasta', 'Parmesan'];
  constructor(public navCtrl: NavController) {

  }

  tagStrVerify(str: string){
    return str !== 'ABC' && str.trim() !== '';
  }

}
