import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
  selector: 'app-heroes-page',
  templateUrl: './hero-page.component.html',
  imports: [CommonModule]
})
export class HeroesPageComponent {

  name = signal('Ironman');
  age = signal(45);
  hroDescription = computed(()=>{
    const description = `${this.name()} - ${this.age()}`;
    return description
  });

  changeHero(): void {
    this.name.update((prevName) => 'Spiderman');
    this.age.update((prevAge) => 22);
  }

  changeName(): void {
    this.name.update((prevName) => 'Hulk');
  }

  changeAge(): void {
    this.age.update((prevAge) => 60);
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

}