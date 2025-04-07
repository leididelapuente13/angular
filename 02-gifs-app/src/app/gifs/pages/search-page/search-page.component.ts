import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '@app/gifs/services/gifs.service';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    if(!query.trim()) return; 
    this.gifs.set([]);
    this.gifService.serchGifs(query).subscribe((resp)=>{
      this.gifs.set(resp);
    });
  }

}
