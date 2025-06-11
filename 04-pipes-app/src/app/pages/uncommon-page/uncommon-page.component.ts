import { AsyncPipe, I18nPluralPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-uncommon-page',
  imports: [I18nPluralPipe, SlicePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  clients = signal<string[]>(
    [
      'Peter',
      'John',
      'Aaron',
      'Juliette'
    ]
  );

  client = signal({
    name: 'Aaron',
    Age: 20,
    City: 'London'
  })

  clientsMap = signal({
    '=0': "we don't have any clients waiting",
    '=1': 'we have one client waiting',
    '=2': 'we have two clients waiting',
    other: 'we have # clients waiting'
  })

  deleteClient(){
    this.clients.update(prev => prev.slice(1));
  }

  promiseValue : Promise<string>= new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve('Promise Successful')
      // reject('Promise failed')
    }, 3000)
  })
}
