import { Component, computed, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '@app/gifs/services/gifs.service';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
  gifs = computed<Gif[]>(()=> this.gifService.trendingGifs());
}
