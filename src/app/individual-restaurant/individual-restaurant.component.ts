import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-individual-restaurant',
  templateUrl: './individual-restaurant.component.html',
  styleUrls: ['./individual-restaurant.component.css']
})
export class IndividualRestaurantComponent implements OnInit {

  media_geral: Array<any> = [];
  array_avaliacao: Array<number> = [];
  avaliacao: number = 5;
  estrelas_contador: number = 5;
  avaliacao_usuario: number = 3;
  array_avaliacao_usuario: Array<number> = [];
  array_comentarios_usuarios_avaliacao: Array<number> = [];
  comentario_usuario: any;
  array_comentarios_usuarios: Array<any> = [
    {
      comentario: 'Realmente ótimo restaurante',
      estrelas: 1,
      comentadoEm: new Date()
    }
  ];

  constructor(public dialogRef: MatDialogRef<IndividualRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public restaurante: any,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    for (let index = 0; index < this.estrelas_contador; index++) {
      this.array_avaliacao.push(index);
    }
    for (let index = 0; index < this.estrelas_contador; index++) {
      this.array_avaliacao_usuario.push(index);
    }
    for (let index = 0; index < this.estrelas_contador; index++) {
      this.array_comentarios_usuarios_avaliacao.push(index);
    }
    this.listComments(this.restaurante.estrelas)
  }

  showIcon(contagem: number, index: number) {
    if (contagem >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(avaliacao: number) {
    this.avaliacao_usuario = avaliacao;
    return false;
  }

  sendComment() {
    const comentario = {
      comentario: this.comentario_usuario,
      estrelas: this.avaliacao_usuario,
      comentadoEm: new Date()
    }

    this.array_comentarios_usuarios.push(comentario)
    this.listComments(this.restaurante.estrelas);
  }

  listComments(param: number) {
    this.media_geral = [];
    this.array_comentarios_usuarios.forEach((comentario: any) => {
      this.media_geral.push(comentario.estrelas);
    });
    this.media_geral.push(param);
    const sum = this.media_geral.reduce((a: number, b: number) => a + b, 0);
    const toDisplay = Math.round(sum / this.media_geral.length);
    return this.avaliacao = toDisplay;
  }

}
