import { Component, ChangeDetectorRef, Input, Output, EventEmitter, HostListener, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Platform } from 'ionic-angular';
/**
 * Generated class for the IonTagsInput directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
export var CITY_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return IonTagsInput; }),
    multi: true
};
export var IonTagsInput = (function () {
    function IonTagsInput(plt, ref) {
        this.plt = plt;
        this.ref = ref;
        this._editTag = '';
        this._tags = [];
        this._isFocus = false;
        this._colors = ['#4a8bfc', '#32db64', '#f53d3d', '#ffc125', '#767676', '#7e60ff', '#222', '#bcbcbc'];
        this.mode = '';
        this.readonly = false;
        this.color = '';
        this.hideRemove = false;
        this.maxTags = -1;
        this.placeholder = '+Tag';
        this.type = 'text';
        this.separatorStr = ',';
        this.once = true;
        this.canEnterAdd = true;
        this.canBackspaceRemove = true;
        this.onChange = new EventEmitter();
    }
    IonTagsInput.prototype.ngOnInit = function () {
        var _this = this;
        if (this.mode === '') {
            this.plt.ready().then(function () {
                _this.initMode();
                _this.initRandomColor();
            });
        }
    };
    IonTagsInput.prototype.initRandomColor = function () {
        if (this.color !== 'random')
            return;
        var tagsEve = this.tags.nativeElement.children;
        for (var _i = 0, tagsEve_1 = tagsEve; _i < tagsEve_1.length; _i++) {
            var eve = tagsEve_1[_i];
            if (eve.style['backgroundColor'] === '') {
                eve.style['backgroundColor'] = this.getRandomColor();
            }
        }
    };
    IonTagsInput.prototype.addRandomColor = function () {
        if (this.color !== 'random')
            return;
        var tagsEve = this.tags.nativeElement.children;
        console.log(tagsEve);
        tagsEve[tagsEve.length - 1].style['backgroundColor'] = this.getRandomColor();
    };
    IonTagsInput.prototype.keyAddTag = function () {
        var tagStr = this._editTag.trim();
        if (!this.canEnterAdd)
            return;
        if (!this.verifyTag(tagStr))
            return;
        if (!this.isOnce(tagStr)) {
            this._editTag = '';
            return;
        }
        this.pushTag(tagStr);
    };
    IonTagsInput.prototype.separatorStrAddTag = function () {
        var lastIndex = this._editTag.length - 1;
        var tagStr = '';
        if (!this.separatorStr)
            return;
        if (this._editTag[lastIndex] === this.separatorStr) {
            tagStr = this._editTag.split(this.separatorStr)[0].trim();
            if (this.verifyTag(tagStr) && this.isOnce(tagStr)) {
                this.pushTag(tagStr);
            }
            else {
                this._editTag = '';
            }
        }
    };
    IonTagsInput.prototype.keyRemoveTag = function () {
        if (!this.canBackspaceRemove)
            return;
        if (this._editTag === '') {
            this.removeTag(-1);
            this._editTag = '';
        }
    };
    IonTagsInput.prototype.btnRemoveTag = function ($index) {
        this.removeTag($index);
    };
    IonTagsInput.prototype.verifyTag = function (tagStr) {
        if (typeof this.verifyMethod === 'function') {
            if (!this.verifyMethod(tagStr)) {
                this._editTag = '';
                return false;
            }
            else {
                return true;
            }
        }
        if (!tagStr.trim()) {
            this._editTag = '';
            return false;
        }
        else {
            return true;
        }
    };
    IonTagsInput.prototype.pushTag = function (tagStr) {
        if (this.maxTags !== -1 && this._tags.length >= this.maxTags) {
            this._editTag = '';
            return;
        }
        this._tags.push(tagStr.trim());
        this.ref.detectChanges();
        this.addRandomColor();
        this.onChange.emit(this._tags);
        this._editTag = '';
    };
    IonTagsInput.prototype.removeTag = function ($index) {
        if (this._tags.length > 0) {
            if ($index === -1) {
                this._tags.pop();
                this.onChange.emit(this._tags);
            }
            else if ($index > -1) {
                this._tags.splice($index, 1);
                this.onChange.emit(this._tags);
            }
        }
    };
    IonTagsInput.prototype.isOnce = function (tagStr) {
        if (!this.once)
            return true;
        var tags = this._tags;
        return tags.every(function (e) {
            return e !== tagStr;
        });
    };
    IonTagsInput.prototype._click = function (ev) {
        this.input.nativeElement.focus();
        this._isFocus = true;
        ev.preventDefault();
        ev.stopPropagation();
    };
    IonTagsInput.prototype._blur = function () {
        this.input.nativeElement.blur();
        this._isFocus = false;
    };
    IonTagsInput.prototype._focus = function () {
        if (!this._isFocus) {
            this._isFocus = true;
        }
    };
    IonTagsInput.prototype.writeValue = function (val) {
        this._tags = val;
    };
    IonTagsInput.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
        this.setValue(this._tags);
    };
    IonTagsInput.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    IonTagsInput.prototype.setValue = function (val) {
        this._tags = val;
        if (this._tags) {
            this._onChanged(this._tags);
        }
    };
    IonTagsInput.prototype.initMode = function () {
        this.mode = this.plt.is('ios') ? 'ios' : this.plt.is('android') ? 'md' : this.plt.is('windows') ? 'mp' : '';
    };
    IonTagsInput.prototype.getRandomColor = function () {
        var max = this._colors.length + 1;
        var index = Math.floor(Math.random() * max);
        return this._colors[index];
    };
    IonTagsInput.decorators = [
        { type: Component, args: [{
                    selector: 'ion-tags-input',
                    providers: [CITY_PICKER_VALUE_ACCESSOR],
                    template: "\n    <div [class]=\"'ion-tags-input tit-border-color '  + (readonly ? 'readonly' : color)\" [class.active]=\"_isFocus\">\n      <div class=\"iti-tags-wrap\" #tags>\n        <span  *ngFor=\"let tag of _tags; let $index = index;\"\n               [class]=\"'iti-tag iti-tag-color ' + color + ' iti-tag-' + mode\">\n          {{tag}}\n          <a [hidden]=\"hideRemove || readonly\" \n             class=\"iti-tag-rm\"\n             (click)=\"btnRemoveTag($index)\"></a>\n       </span>\n      </div>\n      <input #tagsInput\n             [hidden]=\"readonly\"\n             [disabled]=\"readonly\"\n             class=\"iti-input\" [type]=\"type\"\n             [placeholder]=\"placeholder\"\n             [(ngModel)]=\"_editTag\"\n             (blur)=\"_blur()\"\n             (focus)=\"_focus()\"\n             (keyup.backspace)=\"keyRemoveTag($event); false\"\n             (keyup)=\"separatorStrAddTag()\"\n             (keyup.enter)=\"keyAddTag()\">\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    IonTagsInput.ctorParameters = [
        { type: Platform, },
        { type: ChangeDetectorRef, },
    ];
    IonTagsInput.propDecorators = {
        'input': [{ type: ViewChild, args: ['tagsInput',] },],
        'tags': [{ type: ViewChild, args: ['tags',] },],
        'mode': [{ type: Input },],
        'readonly': [{ type: Input },],
        'color': [{ type: Input },],
        'hideRemove': [{ type: Input },],
        'maxTags': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'type': [{ type: Input },],
        'separatorStr': [{ type: Input },],
        'once': [{ type: Input },],
        'canEnterAdd': [{ type: Input },],
        'canBackspaceRemove': [{ type: Input },],
        'verifyMethod': [{ type: Input },],
        'onChange': [{ type: Output },],
        '_click': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return IonTagsInput;
}());
//# sourceMappingURL=ion-tags-input.js.map