import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent {

  constructor(){
    console.log(this.imageUrl);
  }

  imageUrl = input.required<string>();
  imageAlt = input.required<string>();
}
