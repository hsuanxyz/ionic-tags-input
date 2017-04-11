import {Component, ViewEncapsulation, Input} from '@angular/core';


/**
 * Generated class for the IonTagsInput directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */

@Component({
  selector: 'ion-tags-input',
  encapsulation: ViewEncapsulation.None,
  template: `
      <div class="ion-tags-input">
          <div class="iti-tags-wrap">
        <span *ngFor="let tag of _tags; let $index = index" class="iti-tag">
          {{tag}}
          <a class="iti-tag-rm" (click)="btnRemoveTag($index)"></a>
       </span>
          </div>
          <input class="iti-input" type="text"
                 [placeholder]="placeholder"
                 [(ngModel)]="_editTag"
                 (keyup.backspace)="keyRemoveTag()"
                 (keyup)="separatorStrAddTag()"
                 (keyup.enter)="keyAddTag()">
      </div>
  `,
  styles:[`    
    .ion-tags-input{
      border: 1px solid #ddd;
      padding: 5px;
    }
    
    .ion-tags-input .iti-tag{
      background-color: #cde69c;
      border-radius: 2px;
      border: 1px solid #a5d24a;
      color: #638421;
      display: block;
      float: left;
      font-family: sans-serif;
      font-size: 13px;
      font-weight: 400;
      margin-right: 5px;
      margin-bottom: 5px;
      padding: 5px;
      max-height: 30px;
    }
    
    .ion-tags-input .iti-input{
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
    
    .ion-tags-input a.iti-tag-rm::before{
      content: " x";
      color: #638421;
      cursor: pointer;
      font-weight: bold;
    }
  `],
})
export class IonTagsInput {

  tags: Array<string> = [];
  editTag: string = '';

  @Input() placeholder: string = '+Tag';
  @Input() separatorStr: string = ',';
  @Input() once: boolean = true;
  @Input() canEnterAdd: boolean = true;
  @Input() canBackspaceRemove: boolean = true;
  @Input() verifyMethod: (tagSrt: string) => boolean;


  constructor() {
    this.tags = ['Pizza', 'Pasta', 'Parmesan'];
  }

  keyAddTag(): any{
    let tagStr = this.editTag.trim();
    if(!this.canEnterAdd ) return;
    if(!this.verifyTag(tagStr) ) return;
    if(!this.isOnce(tagStr) ) {
      this.editTag = '';
      return;
    }
    this.tags.push(tagStr );
    this.editTag = '';
  }

  separatorStrAddTag(): any{
    const lastIndex: number = this.editTag.length-1;
    let tagStr: string = '';
    if(!this.separatorStr ) return;

    if(this.editTag[lastIndex] === this.separatorStr ){
      tagStr = this.editTag.split(this.separatorStr)[0].trim();

      if(this.verifyTag(tagStr) && this.isOnce(tagStr)){
        this.pushTag(tagStr);
      }else{
        this.editTag = '';
      }
    }
  }

  keyRemoveTag(): any{
    if(!this.canBackspaceRemove ) return;
    if(this.editTag === ''){
      this.tags.pop();
      this.editTag = '';

    }
  }

  btnRemoveTag($index): any{
    if(this.tags[$index] ){
      this.tags.splice($index,1)
    }
  }

  verifyTag(tagStr: string) :boolean {

    if(typeof this.verifyMethod === 'function'){
       if(!this.verifyMethod(tagStr)){
         this.editTag = '';
         return false;
       }else{
         return true;
       }
    }

    if(!tagStr.trim() ){
      this.editTag = '';
      return false;
    }else {
      return true;
    }

  }

  pushTag(tagStr: string): any {
    this.tags.push(tagStr.trim() );
    this.editTag = '';
  }

  isOnce(tagStr: string): boolean {
    if(!this.once) return true;
    const tags: string[] = this.tags;
    return tags.every( (e: string): boolean => {
      return e !== tagStr
    })
  }

}
