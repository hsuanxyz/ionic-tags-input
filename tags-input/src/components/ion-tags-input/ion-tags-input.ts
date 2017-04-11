import {Component, Input, Output, EventEmitter, HostListener,OnInit, ViewChild, forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

import { Platform } from 'ionic-angular';
/**
 * Generated class for the IonTagsInput directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */

export const CITY_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IonTagsInput),
  multi: true
};

@Component({
  selector: 'ion-tags-input',
  providers: [CITY_PICKER_VALUE_ACCESSOR],
  template: `
    <div class="ion-tags-input">
      <div class="iti-tags-wrap">
        <span *ngFor="let tag of _tags; let $index = index"
              [class]="'iti-tag iti-tag-color ' + color + ' iti-tag-' + mode ">
          {{tag}}
          <a [hidden]="hideRemove" [class]="'iti-tag-rm iti-tag-color ' + color" (click)="btnRemoveTag($index)"></a>
       </span>
      </div>
      <input #tagsInput
             class="iti-input" [type]="type"
             [placeholder]="placeholder"
             [(ngModel)]="_editTag"
             (blur)="_blur()"
             (focus)="_focus()"
             (keyup.backspace)="keyRemoveTag()"
             (keyup)="separatorStrAddTag()"
             (keyup.enter)="keyAddTag()">
    </div>
  `,
  styles:[`
    .ion-tags-input {
      border: 1px solid #ddd;
      padding: 5px;
    }

    .ion-tags-input .iti-tag {
      display: block;
      float: left;
      font-family: sans-serif;
      font-size: 1.3rem;
      font-weight: 400;
      margin-right: 5px;
      margin-bottom: 5px;
      padding: 4px 10px;
      max-height: 30px;
    }

    .ion-tags-input a.iti-tag-rm::before {
      content: " x";
      cursor: pointer;
      font-weight: bold;
    }

    .ion-tags-input .iti-input {
      background: transparent;
      border: 0;
      color: #777;
      font-family: sans-serif;
      font-size: 13px;
      font-weight: 400;
      outline: none;
      padding: 5px;
      width: 80px;
    }

    .ion-tags-input .iti-tag.iti-tag-ios {
      border-radius: 13px;
    }

    .ion-tags-input .iti-tag.iti-tag-md {
      border-radius: 4px;
    }

    .ion-tags-input .iti-tag.iti-tag-wp {
      border-radius: 0;
    }

    .iti-tag-color {
      background-color: #4a8bfc;
      color: white;
    }

    .iti-tag-color.light {
      background-color: #f4f4f4;
      color: #000;
    }

    .iti-tag-color.secondary {
      background-color: #32db64;
    }

    .iti-tag-color.danger {
      background-color: #f53d3d;
    }

    .iti-tag-color.dark {
      background-color: #222;
    }

    .iti-tag-color.warn {
      background-color: #ffc125;
    }
    
    .iti-tag-color.gray {
      background-color: #767676;
    }
    
    .iti-tag-color.purple {
      background-color: #7e60ff;
    }

  `],
})
export class IonTagsInput implements ControlValueAccessor, OnInit {

  _editTag: string = '';
  _tags: Array<string> = [];
  _isFocus: boolean = false;
  _onChanged: Function;
  _onTouched: Function;

  @ViewChild('tagsInput') input: any;

  @Input() mode: string = '';
  @Input() color: string = '';
  @Input() hideRemove: boolean = false;

  @Input() placeholder: string = '+Tag';
  @Input() type: string = 'text';
  @Input() separatorStr: string = ',';
  @Input() once: boolean = true;
  @Input() canEnterAdd: boolean = true;
  @Input() canBackspaceRemove: boolean = true;
  @Input() verifyMethod: (tagSrt: string) => boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(public plt: Platform) {}

  ngOnInit(): void {
    if(this.mode === ''){
      this.plt.ready().then(()=>{
        this.initMode();
      })
    }
  }

  keyAddTag(): any{
    let tagStr = this._editTag.trim();
    if(!this.canEnterAdd ) return;
    if(!this.verifyTag(tagStr) ) return;
    if(!this.isOnce(tagStr) ) {
      this._editTag = '';
      return;
    }
    this.pushTag(tagStr );
  }

  separatorStrAddTag(): any{
    const lastIndex: number = this._editTag.length-1;
    let tagStr: string = '';
    if(!this.separatorStr ) return;

    if(this._editTag[lastIndex] === this.separatorStr ){
      tagStr = this._editTag.split(this.separatorStr)[0].trim();

      if(this.verifyTag(tagStr) && this.isOnce(tagStr)){
        this.pushTag(tagStr);
      }else{
        this._editTag = '';
      }
    }
  }

  keyRemoveTag(): any{
    if(!this.canBackspaceRemove ) return;
    if(this._editTag === ''){
      this.removeTag(-1);
      this._editTag = '';
    }
  }

  btnRemoveTag($index: number): any{
    this.removeTag($index);
  }

  verifyTag(tagStr: string) :boolean {

    if(typeof this.verifyMethod === 'function'){
       if(!this.verifyMethod(tagStr)){
         this._editTag = '';
         return false;
       }else{
         return true;
       }
    }

    if(!tagStr.trim() ){
      this._editTag = '';
      return false;
    }else {
      return true;
    }
  }

  pushTag(tagStr: string): any {
    this._tags.push(tagStr.trim() );
    this.onChange.emit(this._tags);
    this._editTag = '';
  }

  removeTag($index: number){
    if(this._tags.length > 0){
      if($index === -1){
        this._tags.pop();
        this.onChange.emit(this._tags);
      }else if ($index > -1) {
        this._tags.splice($index,1);
        this.onChange.emit(this._tags);
      }
    }
  }

  isOnce(tagStr: string): boolean {
    if(!this.once) return true;
    const tags: string[] = this._tags;
    return tags.every( (e: string): boolean => {
      return e !== tagStr
    })
  }

  @HostListener('click', ['$event'])
  private _click(ev: UIEvent) {
    this.input.nativeElement.focus();
    this._isFocus = true;
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _blur(){
    this.input.nativeElement.blur();
    this._isFocus = false;
  }

  private _focus(){
    if(!this._isFocus){
      this._isFocus = true;
    }
  }

  writeValue(val: any): void {
    this._tags = val;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
    this.setValue(this._tags);
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private setValue(val: any) {
    this._tags = val;
  }

  private initMode(){
    this.mode = this.plt.is('ios') ? 'ios' : this.plt.is('android') ? 'md' : this.plt.is('windows') ? 'mp' : '';
  }


}
