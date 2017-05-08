/**
 * Created by hsuanlee on 2017/4/10.
 */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { IonTagsInput } from "./ion-tags-input";

/** @hidden */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [

    IonTagsInput
  ],
  exports: [

    IonTagsInput
  ]
})
export class IonTagsInputModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonTagsInputModule, providers: []
    };
  }
}
