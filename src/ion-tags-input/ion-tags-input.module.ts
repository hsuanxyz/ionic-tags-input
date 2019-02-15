/**
 * Created by hsuanlee on 2017/4/10.
 */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonTagsInput } from "./ion-tags-input";
import { IonTag } from "./ion-tag";
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IonTagsInput, IonTag],
  exports: [IonTagsInput, IonTag],
  entryComponents: [IonTagsInput, IonTag]
})
export class IonTagsInputModule {

}
