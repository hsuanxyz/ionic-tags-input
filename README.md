# ionic-tags-input

[![Dependency Status](https://david-dm.org/HsuanXyz/ionic-tags-input.svg)](https://david-dm.org/HsuanXyz/ionic-tags-input)
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url] [![MIT License][license-image]][license-url]

[![NPM](https://nodei.co/npm/ionic-tags-input.png?downloads=true&stars=true)](https://nodei.co/npm/ionic-tags-input/)

A ionic tags input component for ionic2
[中文文档](https://github.com/HsuanXyz/ionic-tags-input/blob/master/README-CN.md)


![demo](https://github.com/HsuanXyz/hsuanxyz.github.io/blob/master/assets/ionic-tags-input/tags.png?raw=true)

[DEMO](https://stackblitz.com/edit/ionic-tags-input)
## Install

`npm install ionic-tags-input --save`

## Use
 import the module:

 ```typescript
 ...
 import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  ...
  imports: [
    IonTagsInputModule,
    ...
  ],
  ...
})
export class AppModule {}

 ```

## Example

### Basic

```html
<ion-tags-input [(ngModel)]="tags" (onChange)="onChange($event)"></ion-tags-input>
```

```typescript
export class YourPage {

  tags = ['Ionic', 'Angular', 'TypeScript'];

  constructor() {}

  onChange(val){
    console.log(tags)
  }

}
```

set placeholder

```html
<ion-tags-input [(ngModel)]="tags" [placeholder]="'add tag'"></ion-tags-input>
```

set input type

*** Can not be verified, but can set the keyboard type ***

```html
<ion-tags-input [(ngModel)]="tags" [type]="'email'"></ion-tags-input>
```

can not be repeated

```html
<ion-tags-input [(ngModel)]="tags" [once]="'true'"></ion-tags-input>
```

### Style

Setting mode

```html
<ion-tags-input [(ngModel)]="tags" [mode]="'md'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [mode]="'ios'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [mode]="'wp'"></ion-tags-input>
```

Setting color:

```html
<ion-tags-input [(ngModel)]="tags" [color]="'light'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [color]="'secondary'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [color]="'danger'"></ion-tags-input>
```
All color: `light secondary danger dark warn gray purple`

Special color: `random`

Hide remove button

```html
<ion-tags-input [(ngModel)]="tags" [hideRemove]="true"></ion-tags-input>
```

### Separator

Use separator submit input
```html
<ion-tags-input [(ngModel)]="tags" [separatorStr]="','"></ion-tags-input>
```

### Keyboard

Use `Backspace` remove tag

```html
<ion-tags-input [(ngModel)]="tags" [canBackspaceRemove]="true"></ion-tags-input>
```

Use `Enter` submit input

```html
<ion-tags-input [(ngModel)]="tags" [canEnterAdd]="true"></ion-tags-input>
```

### Verify

A function whose argument is a string, returns a boolean value

```html
<ion-tags-input [(ngModel)]="tags" [verifyMethod]="verifyTag"></ion-tags-input>
```

```typescript
export class YourPage {

  tags = ['Ionic', 'Angular', 'TypeScript'];

  constructor() {}

  verifyTag(str: string): boolean{
    return str !== 'ABC' && str.trim() !== '';
  }

}
```

## API
### Input
| Name            | Type          | Description |
| --------------- | ------------- | ----------- |
| mode            | String        | platform style `md ios wp`     |
| color           | String        | color style `light secondary danger dark warn gray purple random` `#xxxxxx`   |
| readonly        | Boolean       | readonly |
| placeholder     | String        | input placeholder |
| type            | String        | input type    |
| maxTags         | number        | sets tags max number, `-1` unlimited |
| hideRemove      | Boolean       | hide remove button   |
| once            | Boolean       | setting can not be repeated  |
| canEnterAdd     | Boolean       | can usr the Enter key submit input |
| canBackspaceRemove | Boolean    | can usr the Backspace key remove tag |
| verifyMethod    | Function      | use function to verify input|

### Output
| Name            | Description |
| --------------- | ----------- |
| ionFocus        | on focus |
| ionBlur         | on blur |

[npm-url]: https://www.npmjs.com/package/ionic-tags-input
[npm-image]: https://img.shields.io/npm/v/ionic-tags-input.svg

[downloads-image]: https://img.shields.io/npm/dm/ionic-tags-input.svg
[downloads-url]: http://badge.fury.io/js/ionic-tags-input

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
