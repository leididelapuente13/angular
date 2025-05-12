import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@enviroments/environment";
import { map, tap } from "rxjs";
import type { GiphyResponse } from "../interfaces/giphy.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { Gif } from '../interfaces/gif.interface';


@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);
  GIF_KEY = 'gifs';
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(this.loadGifsFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory()) ?? '[]';
    localStorage.setItem('gifs', historyString);
  });

  loadGifsFromLocalStorage() {
    const gifsFromLocalStorage = localStorage.getItem(this.GIF_KEY) ?? '[]';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs;
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
    }).subscribe((response) => {
      this.trendingGifs.set(GifMapper.mapGiphyItemstoGifArray(response.data));
      this.trendingGifsLoading.set(false);
    })
  }

  serchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        rating: 'g',
        lang: 'en',
        offset: 0,
        bundle: 'messaging_non_clips',
        q: query,
      }
    }).pipe(
      map(({ data }) => GifMapper.mapGiphyItemstoGifArray(data)),
      tap(gifs => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: gifs
        }))
      })
    )
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }

}
