import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  private lpaises = [
    'Estados Unidos da América',
    'Portugal',
    'Medio Oriente',
    'Rússia',
    'França',
    'Venezuela',
    'África',
    'México',
    'Brasil',
    'Índia'
  ];


  constructor() { }

  ngOnInit() {
  }

}
