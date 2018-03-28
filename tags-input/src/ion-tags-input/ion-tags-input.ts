import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

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
    <div [class]="'ion-tags-input tit-border-color '  + (readonly ? 'readonly' : color)" [class.active]="_isFocus">
      <div class="iti-tags-wrap" #tags>
        <ion-tag  *ngFor="let tag of _tags; let $index = index;"
                  [tag]="tag"
                  [mode]="mode"
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
             (blur)="_blur()"
             (keyup.backspace)="keyRemoveTag($event); false"
             (keyup)="separatorStrAddTag()"
             (keyup.enter)="keyAddTag()">
    </div>
  `
})
export class IonTagsInput implements ControlValueAccessor, OnInit {

  _editTag: string = '';
  _tags: Array<string> = [];
  _isFocus: boolean = false;
  _onChanged: Function;
  _onTouched: Function;
  _colors = ['#4a8bfc', '#32db64', '#f53d3d', '#ffc125', '#767676', '#7e60ff', '#222', '#bcbcbc'];

  @ViewChild('tagsInput') input: any;
  @ViewChild('tags') tags: any;

  @Input() mode: string = '';
  @Input() readonly: boolean = false;
  @Input() color: string = '';
  @Input() hideRemove: boolean = false;
  @Input() maxTags: number = -1;

  @Input() placeholder: string = '+Tag';
  @Input() type: string = 'text';
  @Input() separatorStr: string = ',';
  @Input() once: boolean = true;
  @Input() canEnterAdd: boolean = true;
  @Input() canBackspaceRemove: boolean = true;
  @Input() verifyMethod: (tagSrt: string) => boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() ionFocus: EventEmitter<any> = new EventEmitter();
  @Output() ionBlur: EventEmitter<any> = new EventEmitter();

  constructor(public plt: Platform, public ref: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    if (this.mode === '') {
      this.plt.ready().then(() => {
        this.initMode();
        this.initRandomColor();
      })
    }
  }

  initRandomColor() {
    if (this.color !== 'random') return;
    let tagsEve = this.tags.nativeElement.children;

    for (let eve of tagsEve) {
      if (eve.style['backgroundColor'] === '') {
        eve.style['backgroundColor'] = this.getRandomColor()
      }
    }
  }

  addRandomColor() {
    if (this.color !== 'random') return;
    let tagsEve = this.tags.nativeElement.children;
    tagsEve[tagsEve.length - 1].style['backgroundColor'] = this.getRandomColor()
  }

  keyAddTag(): any {
    let tagStr = this._editTag.trim();
    if (!this.canEnterAdd) return;
    if (!this.verifyTag(tagStr)) return;
    if (!this.isOnce(tagStr)) {
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
    this.addRandomColor();
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
    if (!this.once) return true;
    const tags: string[] = this._tags;
    return tags.every((e: string): boolean => {
      return e !== tagStr
    })
  }

  @HostListener('click', ['$event'])
  private _click(ev: UIEvent): any {
    if (!this._isFocus) {

    }
    this._focus();
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _blur(): any {
    if (this._isFocus) {
      this._isFocus = false;
      this.ionBlur.emit(this._tags);
    }
  }

  private _focus(): any {
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

  private setValue(val: any): any {
    this._tags = val;
    if (this._tags) {
      this._onChanged(this._tags);
    }
  }

  private initMode(): any {
    this.mode = this.plt.is('ios') ? 'ios' : this.plt.is('android') ? 'md' : this.plt.is('windows') ? 'mp' : '';
  }

  private getRandomColor() {
    const max = this._colors.length + 1;
    let index = Math.floor(Math.random() * max);
    return this._colors[index]
  }

}
