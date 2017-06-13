import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonTagsInput } from "./ion-tags-input";
/** @hidden */
export var IonTagsInputModule = (function () {
    function IonTagsInputModule() {
    }
    IonTagsInputModule.forRoot = function () {
        return {
            ngModule: IonTagsInputModule, providers: []
        };
    };
    IonTagsInputModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    IonTagsInputModule.ctorParameters = [];
    return IonTagsInputModule;
}());
//# sourceMappingURL=ion-tags-input.module.js.map