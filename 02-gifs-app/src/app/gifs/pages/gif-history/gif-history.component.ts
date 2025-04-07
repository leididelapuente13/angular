import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { map } from 'rxjs';
import { GifService } from '@app/gifs/services/gifs.service';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
  styles: ``
})
export default class GifHistoryComponent {

  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query'] ?? 'No query'))
  )

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  })
}
