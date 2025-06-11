# Pipes App Notes

## Angular Pipes

A pipe transforms visually data that you pass to it, you can past arguments to this pipe, separated by :

### I18nPluralPipe

First create a map with the of the text that will be displayed given the number of in this case clients.

```typescript
clientsMap = signal({
  "=0": "we don't have any clients waiting",
  "=1": "we have one client waiting",
  "=2": "we have two clients waiting",
  other: "we have # clients waiting",
});
```

```html
<p>Right now {{ clients().length | i18nPlural : clientsMap() }}</p>
```

### SlicePipe

```html
<div>
  <h3>Sliced: slice:0:2</h3>
  <p class="text-primary">{{ clients() | slice : 0 : 2 }}</p>
</div>
```

### KeyValuePipe
Given an object you can extract its key and its value and iterate over it.

```typescript
client = signal({
  name: "Aaron",
  Age: 20,
  City: "London",
});
```

```html
<div>
  @for (item of client() | keyvalue; track $index) {
  <div>
    <span class="text-primary">{{ item.key | titlecase }}:</span>
    {{ item.value }}
  </div>
  }
</div>
```

## Custom Pipes

### Basic Pipe

```typescript
import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
  name: "canFly",
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? "Hero can fly" : "Hero cannot fly";
  }
}
```

### Custom Pipe with maps

```typescript
import { Pipe, type PipeTransform } from "@angular/core";
import { Color, ColorMap } from "../interfaces/hero.interface";

@Pipe({
  name: "heroTextColor",
})
export class HeroTextColorPipe implements PipeTransform {
  transform(value: Color): string {
    return ColorMap[value];
  }
}

export const ColorMap = {
  [Color.red]: "#E57373",
  [Color.black]: "#424242",
  [Color.blue]: "#64B5F6",
  [Color.green]: "#81C784",
};
```
