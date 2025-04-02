import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/Character';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAddComponent {
  name = signal<string>('');
  power = signal<number>(0);

  newCharacter = output<Character>();

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter: Character = {
      // id: this.characters.length + 1,
      id: 7,
      name: this.name(), 
      power: this.power()
    }

    // this.characters.update((prev)=> [...prev, newCharacter]),
    this.newCharacter.emit(newCharacter);
    this.resetFields();
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
