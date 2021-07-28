import { IndividualRestaurantComponent } from './../individual-restaurant/individual-restaurant.component';
import { NewRestaurantComponent } from './../new-restaurant/new-restaurant.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  pesquisar: any;
  siglas: Array<any> = [];

  restaurantes: Array<any> = [
    {
      nome: "Grupo iv2",
      estado: "São Paulo",
      cidade: "Jundiaí",
      descricao: "Restaurante com muita qualidade",
      autor_restaurante: "Guilherme Rocha",
      criado_em: new Date(),
      estrelas: 5
    }
  ]

  constructor(private _http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this._http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5/estados').subscribe((res: any) => {
      let estados = res;
      estados = estados.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1);
      estados.forEach((estados: any) => {
        this.siglas.push({
          nome: estados["nome"],
          sigla: estados["sigla"]
        })
      });

    });
  }

  newRestaurant() {
    console.log("new Restaurant");
  }

  exit() {
    console.log("bye Restaurant");
  }

}
