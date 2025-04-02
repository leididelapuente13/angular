import { Component, input } from '@angular/core';
import { Character } from '../../../interfaces/Character';

@Component({
  selector: 'daragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  title = input.required<string>();
  characters = input.required<Character[]>();

}
