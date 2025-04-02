import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/Character';


const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters) : []
}

@Injectable({providedIn: 'root'})
export class DragonballService {
  constructor() { }
  
  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(()=>{
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  })

  addCharacter(character: Character) {
    this.characters.update((prev)=>[...prev, character])
  }
}