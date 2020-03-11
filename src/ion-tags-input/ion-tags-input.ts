import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  ViewChild,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { Platform } from 'ionic-angular';
import { TAG_COLORS } from "./colors";


export const CITY_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IonTagsInput),
  multi: true
};

@Component({
  selector: 'ion-tags-input',
  providers: [CITY_PICKER_VALUE_ACCESSOR],
  template: `
  <div class="iti-tags-wrap">
    <ion-tag  *ngFor="let tag of _tags; let $index = index;"
              [tag]="tag"
              [mode]="mode"
              [color]="cssColor"
              [allowClear]="!hideRemove && !readonly"
              (onClear)="btnRemoveTag($index)">
    </ion-tag>
  </div>
  <input #tagsInput
         [hidden]="readonly"
         [disabled]="readonly"
         class="iti-input" [type]="type"
         [placeholder]="placeholder"
         [(ngModel)]="_editTag"
         (blur)="blur()"
         (keyup.backspace)="keyRemoveTag($event); false"
         (keyup)="separatorStrAddTag()"
         (keyup.enter)="keyAddTag()">
  `,
  host: {
    'class': 'tit-border-color ion-tags-input',
    '[style.border-bottom-color]': '_isFocus ? cssColor : null',
    '[class.active]': '_isFocus',
    '[class.readonly]': 'readonly'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: [/** COMPONENT_STYLE */]
})
export class IonTagsInput implements ControlValueAccessor, OnInit {

  _once: boolean = false;
  @Input() mode: string = '';
  @Input() readonly: boolean = false;
  @Input() hideRemove: boolean = false;
  @Input() maxTags: number = -1;
  @Input() placeholder: string = '+Tag';
  @Input() type: string = 'text';
  @Input() separatorStr: string = ',';
  @Input() canEnterAdd: boolean = true;
  @Input() canBackspaceRemove: boolean = true;
  @Input() verifyMethod: (tagSrt: string) => boolean;
  @Input()
  set color(value: string) {
    if (TAG_COLORS.hasOwnProperty(value)) {
      this.cssColor = (TAG_COLORS[value] as string);
    } else {
      this.cssColor = value;
    }
  }
  @Input()
  set once(value: boolean | string) {
    if (typeof value === 'string') {
      this._once = true;
    } else {
      this._once = value;
    }
  }
  get once(): boolean | string {
    return this._once;
  }


  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() ionFocus: EventEmitter<any> = new EventEmitter();
  @Output() ionBlur: EventEmitter<any> = new EventEmitter();
  @ViewChild('tagsInput') input: any;

  _editTag: string = '';
  _tags: Array<string> = [];
  _isFocus: boolean = false;
  _onChanged: Function;
  _onTouched: Function;
  cssColor: string;

  constructor(public plt: Platform, public ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.mode === '') {
      this.plt.ready().then(() => {
        this.initMode();
      })
    }
  }

  keyAddTag(): any {
    let tagStr = this._editTag.trim();
    if (!this.canEnterAdd) return;
    if (!this.verifyTag(tagStr)) return;
    if (this.once && !this.isOnce(tagStr)) {
      this._editTag = '';
      return;
    }
    this.pushTag(tagStr);
  }

  separatorStrAddTag(): any {
    const lastIndex: number = this._editTag.length - 1;
    let tagStr: string = '';
    if (!this.separatorStr) return;

    if (this._editTag[lastIndex] === this.separatorStr) {
      tagStr = this._editTag.split(this.separatorStr)[0].trim();

      if (this.verifyTag(tagStr) && this.isOnce(tagStr)) {
        this.pushTag(tagStr);
      } else {
        this._editTag = '';
      }
    }
  }

  keyRemoveTag(): any {
    if (!this.canBackspaceRemove) return;
    if (this._editTag === '') {
      this.removeTag(-1);
      this._editTag = '';
    }
  }

  btnRemoveTag($index: number): any {
    this.removeTag($index);
  }

  verifyTag(tagStr: string): boolean {

    if (typeof this.verifyMethod === 'function') {
      if (!this.verifyMethod(tagStr)) {
        this._editTag = '';
        return false;
      } else {
        return true;
      }
    }

    if (!tagStr.trim()) {
      this._editTag = '';
      return false;
    } else {
      return true;
    }
  }

  pushTag(tagStr: string): any {
    if (this.maxTags !== -1 && this._tags.length >= this.maxTags) {
      this._editTag = '';
      return;
    }
    this._tags.push(tagStr.trim());
    this.ref.detectChanges();
    this.onChange.emit(this._tags);
    this._editTag = '';
  }

  removeTag($index: number): any {
    if (this._tags.length > 0) {
      if ($index === -1) {
        this._tags.pop();
        this.onChange.emit(this._tags);
      } else if ($index > -1) {
        this._tags.splice($index, 1);
        this.onChange.emit(this._tags);
      }
    }
  }

  isOnce(tagStr: string): boolean {
    const tags: string[] = this._tags;
    return tags.every((e: string): boolean => {
      return e !== tagStr
    })
  }

  @HostListener('click', ['$event'])
  _click(ev: UIEvent): any {
    if (!this._isFocus) {

    }
    this.focus();
    ev.preventDefault();
    ev.stopPropagation();
  }

  public blur(): any {
    if (this._isFocus) {
            this._isFocus = false;
            var tagStr = this._editTag.trim();  
            if (tagStr !== '')
            {
                if (this.once && !this.isOnce(tagStr)) {
                    this._editTag = '';
                }else{
                    this.pushTag(tagStr);
                }
            }                
            
            this.ionBlur.emit(this._tags);
        }
  }

  public focus(): any {
    if (!this._isFocus) {
      this._isFocus = true;
      this.input.nativeElement.focus();
      this.ionFocus.emit(this._tags);
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

  setValue(val: any): any {
    this._tags = val;
    if (this._tags) {
      this._onChanged(this._tags);
    }
  }

  initMode(): any {
    this.mode = this.plt.is('ios') ? 'ios' : this.plt.is('android') ? 'md' : this.plt.is('windows') ? 'mp' : 'md';
  }

}
