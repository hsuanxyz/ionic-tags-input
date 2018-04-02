# ionic-tags-input

[![Dependency Status](https://david-dm.org/HsuanXyz/ionic-tags-input.svg)](https://david-dm.org/HsuanXyz/ionic-tags-input)
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url] [![MIT License][license-image]][license-url]

[![NPM](https://nodei.co/npm/ionic-tags-input.png?downloads=true&stars=true)](https://nodei.co/npm/ionic-tags-input/)

一个ionic的标签输入(tags-input)组件

![demo](https://github.com/HsuanXyz/hsuanxyz.github.io/blob/master/assets/ionic-tags-input/tags.png?raw=true)

[DEMO](https://stackblitz.com/edit/ionic-tags-input)

## 安装

`npm install ionic-tags-input --save`

## 使用

 引入模块

 ```
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

## 例子

### 基本使用

```
<ion-tags-input [(ngModel)]="tags" (onChange)="onChange($event)"></ion-tags-input>
```

```
export class YourPage {

  tags = ['Ionic', 'Angular', 'TypeScript'];

  constructor() {}

  onChange(val){
    console.log(tags)
  }

}
```

设置placeholder

```
<ion-tags-input [(ngModel)]="tags" [placeholder]="'add tag'"></ion-tags-input>
```

设置 input type

***无法提供类型验证，只能设置软键盘类型***

```
<ion-tags-input [(ngModel)]="tags" [type]="'email'"></ion-tags-input>
```

设置标签不重复

```
<ion-tags-input [(ngModel)]="tags" [once]="'true'"></ion-tags-input>
```

### 样式

设置平台样式

```
<ion-tags-input [(ngModel)]="tags" [mode]="'md'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [mode]="'ios'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [mode]="'wp'"></ion-tags-input>
```

设置颜色

```
<ion-tags-input [(ngModel)]="tags" [mode]="'light'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [mode]="'secondary'"></ion-tags-input>
<ion-tags-input [(ngModel)]="tags" [mode]="'danger'"></ion-tags-input>
```

全部颜色: `light secondary danger dark warn gray purple`

特殊颜色: `random` 随机颜色

隐藏移除按钮

```
<ion-tags-input [(ngModel)]="tags" [hideRemove]="true"></ion-tags-input>
```

### 分割符

使用分隔符确认输入
```
<ion-tags-input [(ngModel)]="tags" [separatorStr]="','"></ion-tags-input>
```

### 键盘

使用`Backspace`删除标签

```
<ion-tags-input [(ngModel)]="tags" [canBackspaceRemove]="true"></ion-tags-input>
```

使用`Enter` 添加标签

```
<ion-tags-input [(ngModel)]="tags" [canEnterAdd]="true"></ion-tags-input>
```

### 验证

传入一个方法，该方法接受一个字符串，返回一个布尔值

```
<ion-tags-input [(ngModel)]="tags" [verifyMethod]="verifyTag"></ion-tags-input>
```

```
export class YourPage {

  tags = ['Ionic', 'Angular', 'TypeScript'];

  constructor() {}

  verifyTag(str: string): boolean{
    return str !== 'ABC' && str.trim() !== '';
  }

}
```

## API

### 输入属性

| Name            | Type          | Description |
| --------------- | ------------- | ----------- |
| mode            | String        | 设置平台样式 `md ios wp`     |
| color           | String        | 设置颜色 `light secondary danger dark warn gray purple random` `#xxxxxx`  |
| placeholder     | String        | 设置 input placeholder |
| readonly        | Boolean       | 只读 |
| type            | String        | 设置 input type    |
| maxTags         | number        | 设置最大数, `-1` 无限制 |
| hideRemove      | Boolean       | 隐藏移除按钮  |
| once            | Boolean       | 设置标签唯一 |
| canEnterAdd     | Boolean       | 是否能使用Enter键确认输入 |
| canBackspaceRemove | Boolean    | 能否使用Backspace键删除标签 |
| verifyMethod    | Function      | 提过给标签输入的验证方法 |

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
