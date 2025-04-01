import { Component, signal } from '@angular/core';
import { Character } from '../../interfaces/Character';

@Component({
  selector: 'app-dragonball',
  imports: [],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './daragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {

  name = signal<string>('');
  power = signal<number>(0);

  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 15000,
    },
    // {
    //   id: 2,
    //   name: 'Vegeta',
    //   power: 14000,
    // },
    // {
    //   id: 3,
    //   name: 'Gohan',
    //   power: 12000,
    // },
    // {
    //   id: 4,
    //   name: 'Piccolo',
    //   power: 10000,
    // },
    // {
    //   id: 5,
    //   name: 'Krillin',
    //   power: 8000,
    // },
    // {
    //   id: 6,
    //   name: 'Bulma',
    //   power: 5000,
    // },
    // {
    //   id: 7,
    //   name: 'Trunks',
    //   power: 11000,
    // },
    // {
    //   id: 8,
    //   name: 'Frieza',
    //   power: 20000,
    // },
    // {
    //   id: 9,
    //   name: 'Cell',
    //   power: 25000,
    // },
    // {
    //   id: 10,
    //   name: 'Majin Buu',
    //   power: 30000,
    // }
  ]);

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;
    const newCharacter: Character = {
      id: this.characters.length + 1,
      name: this.name(), 
      power: this.power()
    }

    this.characters.update((prev)=> [...prev, newCharacter]),
    this.resetFields();
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
