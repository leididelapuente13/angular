import { Component, effect, input, output, signal } from '@angular/core';

@Component({
    selector: 'country-search-input',
    imports: [],
    templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
    placeholder = input<string>('Search');
    debounceTime = input<number>(500);
    search = output<string>();
    inputValue = signal<string>('');

    debounceEffect = effect((onCleanup) => {
        const value = this.inputValue();

        const timeout = setTimeout(() => {
            this.search.emit(value);
        }, this.debounceTime());

        onCleanup(() => {
            clearTimeout(timeout);
        })
    });
}
