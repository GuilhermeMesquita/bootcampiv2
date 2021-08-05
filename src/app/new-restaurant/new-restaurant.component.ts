import { RestaurantsService } from './../shared/restaurants.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {

  arquivo_selecionado: any;
  arquivo_anexado: any;
  siglas: Array<any> = [];
  cidades: Array<any> = [];
  avaliacao: number = 3;
  estrelas_contador: number = 5;
  array_avaliacao: Array<number> = [];

  novo_restaurante = new FormGroup({
    nome: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _http: HttpClient,
    public dialogRef: MatDialogRef<NewRestaurantComponent>,
    private _restaurantes_service: RestaurantsService) { }

  ngOnInit(): void {
    this.siglas = this.data["siglas"];
    for (let index = 0; index < this.estrelas_contador; index++) {
      this.array_avaliacao.push(index);
    }
  }

  onClick(avaliacao: number) {
    this.avaliacao = avaliacao;
    return false;
  }

  showIcon(index: number) {
    if (this.avaliacao >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onFileSelected(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.arquivo_anexado = e.target.files[0];
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (ev) => {
        if (ev.target) {
          this.arquivo_selecionado = ev.target.result;
        }
      }
    }
  }

  searchCity(estado: any) {
    this.cidades = [];
    this._http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.sigla}/distritos`)
      .subscribe((cidades: any) => {
        cidades = cidades.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1)
        cidades.forEach((cidade: any) => {
          this.cidades.push(cidade.nome);
        });
      });
  }

  saveRestaurant() {
    const avaliacao = {
      nome: this.novo_restaurante.value.nome,
      estado: this.novo_restaurante.value.estado,
      cidade: this.novo_restaurante.value.cidade,
      descricao: this.novo_restaurante.value.descricao,
      autor_restaurante: this.data.usuario,
      criado_em: new Date(),
      estrelas: this.avaliacao
    }

    if (this.arquivo_selecionado) {
      this._restaurantes_service.pushFileToStorage(avaliacao, this.arquivo_anexado);
    } else {
      alert("Parece que não foi inserido nenhum arquivo de imagem.");
    }

    this.dialogRef.close(avaliacao);
  }

}
