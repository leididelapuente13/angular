import { Component, inject } from '@angular/core';
import { Character } from '../../interfaces/Character';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonballService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './daragonball-page.component.css'
})
export class DragonballPageComponent {

  // old way of injecting the service
  // constructor(
  //   public dragonballService : DragonballService
  // ){}

  public dragonballService = inject(DragonballService);

  addCharacter(character: Character) {
    this.dragonballService.addCharacter(character);
  }

  get characters (){
    return this.dragonballService.characters();
  }

}
