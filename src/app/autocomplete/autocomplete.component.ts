import { Component, OnInit } from '@angular/core';

export const options = [
  {firstName: 'Koo', lastName: 'Koo Last'},
  {firstName: 'Moo', lastName: 'Moo Last'},
  {firstName: 'Foo', lastName: 'Foo Last'},
  {firstName: 'Zoo', lastName: 'Zoo Last'}
];
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
options = options;
  constructor() { }

  ngOnInit() {
  }
setFormData(e) {
    console.log(e)
}
}
