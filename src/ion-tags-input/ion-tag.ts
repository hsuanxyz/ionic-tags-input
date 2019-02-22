import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { TAG_COLORS } from "./colors";


@Component({
  selector: 'ion-tag',
  template: `
  <span>
    {{tag}}
    <a class="iti-tag-rm"
       [hidden]="!allowClear" 
       (click)="onClear.emit(tag)"></a>
 </span>  
  `,
  host: {
    '[style.background-color]': '_bgColor',
  },
  styleUrls: [/** COMPONENT_STYLE */]
})

export class IonTag {
  private _bgColor: string;
  public ionColorClasses: string;

  @HostBinding('class')
  get ionColorClass() {
    return this.ionColorClasses;
  };

  @Input() tag: string;
  @Input() allowClear: boolean = true;
  @Input() mode: 'md' | 'ios' | 'wp';
  @Output() onClear: EventEmitter<string> = new EventEmitter();
  @Input()
  set color(value: string) {
    this.ionColorClasses = `iti-tag iti-tag-color iti-tag-${this.mode} `;
    if (value === 'random') {
      value = RandomShuffled.next(Object.keys(TAG_COLORS));
    }
    if (TAG_COLORS[value] === null) {
      // use ionic colors
      this.ionColorClasses += `ion-color ion-color-${value}`;
      this._bgColor = null;
      return;
    }
    this._bgColor = TAG_COLORS[value] || value;
  };

}



/**
 * iterate through a random shuffled array colors so colors are not repeated
 */
class RandomShuffled {
  static shuffled:Array<string>= [];
  static next(array: Array<string>):string {
    if (RandomShuffled.shuffled.length)
      return RandomShuffled.shuffled.pop();

    array = array.slice();  // make a copy
    let currentIndex = array.length;
    let temporaryValue:string;
    let randomIndex:number;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    RandomShuffled.shuffled = array;
    return array.pop();
  }
}