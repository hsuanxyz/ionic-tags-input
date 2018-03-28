import { Component, EventEmitter, Input, Output } from "@angular/core";

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
    '[class.iti-tag-wp]': 'mode === "wp"'
  }
})
export class IonTag {

  @Input() tag: string;
  @Input() allowClear: boolean = true;
  @Input() color: string;
  @Input() mode: 'md' | 'ios' | 'wp';
  @Output() onClear: EventEmitter<string> = new EventEmitter();

}
