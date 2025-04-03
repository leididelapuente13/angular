import { GiphyItem } from "../interfaces/giphy.interface";
import { Gif } from '../interfaces/gif.interface';

 export class GifMapper {

  static mapGiphyItemToGif(item: GiphyItem): Gif{
    const { id, images, title } = item;
    return {
      id,
      title,
      url: images.original.url,
    }
  }

  static mapGiphyItemstoGifArray(items: GiphyItem[]): Gif[]{
    return items.map(this.mapGiphyItemToGif);
  }
 }
