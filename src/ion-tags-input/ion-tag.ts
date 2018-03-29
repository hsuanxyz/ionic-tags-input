import { Component, EventEmitter, Input, Output } from "@angular/core";
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
    'class': 'iti-tag iti-tag-color',
    '[class.iti-tag-md]': 'mode === "md"',
    '[class.iti-tag-ios]': 'mode === "ios"',
    '[class.iti-tag-wp]': 'mode === "wp"',
    '[style.background-color]': '_color'
  }
})
export class IonTag {

  _color: string = TAG_COLORS['default'];

  @Input() tag: string;
  @Input() allowClear: boolean = true;
  @Input() mode: 'md' | 'ios' | 'wp';
  @Output() onClear: EventEmitter<string> = new EventEmitter();
  @Input()
  set color(value: string) {
    if (value !== 'random') {
      this._color = value;
    } else {
      const keys = Object.keys(TAG_COLORS);
      const max = keys.length + 1;
      let index = Math.floor(Math.random() * max);
      this._color = TAG_COLORS[keys[index]]
    }
  };

}
