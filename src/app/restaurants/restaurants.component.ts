import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../auth/auth.service';
import { IndividualRestaurantComponent } from './../individual-restaurant/individual-restaurant.component';
import { NewRestaurantComponent } from './../new-restaurant/new-restaurant.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
/**Importação do Serviço */
import { RestaurantsService } from './../shared/restaurants.service';



@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  pesquisar: any;
  usuario_logado: any;
  siglas: Array<any> = [];

  restaurantes: Array<any> = []

  constructor(
    private _http: HttpClient,
    private dialog: MatDialog,
    private _restaurantes_service: RestaurantsService,
    private _auth_service: AuthService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this._auth_service.user$.subscribe(userInfos => {
      this.usuario_logado = userInfos;
    });
    /**Requisição */
    this.listRestaurants();
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

  async listRestaurants() {
    await this._restaurantes_service.listRestaurant()
      .subscribe(rests => {
        this.restaurantes = rests.map(rest => rest);
        this.restaurantes = this.restaurantes.sort((a, b) => b.criado_em.seconds - a.criado_em.seconds);
      });
  }

  newRestaurant() {
    const dialog_ref = this.dialog.open(NewRestaurantComponent, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: this.usuario_logado,
        siglas: this.siglas
      }
    });

    dialog_ref.afterClosed().subscribe((data: any) => {
      this.restaurantes.push(data);
    });

  }

  exit() {
    this._auth_service.exit();
  }

  openRestaurant(restaurante: any) {
    this.dialog.open(IndividualRestaurantComponent, {
      width: "80%",
      height: "98vh",
      data: restaurante,
      panelClass: "custom-dialog-container"
    });
  }

}
