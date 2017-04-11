import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { Platform } from 'ionic-angular';
/**
 * Generated class for the IonTagsInput directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
export declare const CITY_PICKER_VALUE_ACCESSOR: any;
export declare class IonTagsInput implements ControlValueAccessor, OnInit {
    plt: Platform;
    _editTag: string;
    _tags: Array<string>;
    _isFocus: boolean;
    _onChanged: Function;
    _onTouched: Function;
    input: any;
    mode: string;
    color: string;
    hideRemove: boolean;
    placeholder: string;
    type: string;
    separatorStr: string;
    once: boolean;
    canEnterAdd: boolean;
    canBackspaceRemove: boolean;
    verifyMethod: (tagSrt: string) => boolean;
    onChange: EventEmitter<any>;
    constructor(plt: Platform);
    ngOnInit(): void;
    keyAddTag(): any;
    separatorStrAddTag(): any;
    keyRemoveTag(): any;
    btnRemoveTag($index: number): any;
    verifyTag(tagStr: string): boolean;
    pushTag(tagStr: string): any;
    removeTag($index: number): void;
    isOnce(tagStr: string): boolean;
    private _click(ev);
    private _blur();
    private _focus();
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private setValue(val);
    private initMode();
}
