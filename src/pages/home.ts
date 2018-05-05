import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonTagsInput } from "../ion-tags-input";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  items = ['TypeScript', 'Angular', 'Ionic'];
  items2 = ['TypeScript', 'Angular', 'Ionic'];
  items3 = ['TypeScript', 'Angular', 'Ionic'];
  items4 = ['TypeScript', 'Angular', 'Ionic'];
  items5 = ['TypeScript', 'Angular', 'Ionic'];
  items6 = ['TypeScript', 'Angular', 'Ionic'];
  items7: string[] = [];

  @ViewChild('tagsInput', { read: IonTagsInput }) tagsInputRef: IonTagsInput;

  constructor(public navCtrl: NavController) {

  }

  tagStrVerify(str: string): boolean{
    return str !== 'ABC' && str.trim() !== '';
  }

  onChange(val: string){
    console.log(val)
  }

  onFocus() {
    console.log('Focus')
  }

  onBlur() {
    console.debug('Blur')
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tagsInputRef.focus();
    }, 100);
  }


}
