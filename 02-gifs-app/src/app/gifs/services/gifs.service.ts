import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@enviroments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { Gif } from '../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  foundGifs = signal<Gif[]>([]);
  searchingGifs = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }


  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: 0,
        rating: 'g',
        bundle: 'messaging_non_clips',
      }
    }).subscribe((response)=>{
      this.trendingGifs.set(GifMapper.mapGiphyItemstoGifArray(response.data));
      this.trendingGifsLoading.set(false);
    })
  }

  serchGifs(query: string) {
    if(!query.trim()) return; 
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        rating: 'g',
        lang: 'en',
        offset: 0,
        bundle: 'messaging_non_clips',
        q: query,
      }
    }).subscribe((response)=>{
      this.foundGifs.set(GifMapper.mapGiphyItemstoGifArray(response.data));
      this.searchingGifs.set(false);
    });
  }

}