import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = ['TypeScript', 'Angular', 'Ionic'];
  items2 = ['TypeScript', 'Angular', 'Ionic'];
  items3 = ['TypeScript', 'Angular', 'Ionic'];
  items4 = ['TypeScript', 'Angular', 'Ionic'];
  items5 = ['TypeScript', 'Angular', 'Ionic'];
  constructor(public navCtrl: NavController) {

  }

  tagStrVerify(str: string): boolean{
    return str !== 'ABC' && str.trim() !== '';
  }

  onChange(val){
    console.log(val)
  }
}
