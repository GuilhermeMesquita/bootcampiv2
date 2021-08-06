import { AuthService } from './../auth/auth.service';
import { RestaurantsService } from './../shared/restaurants.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-individual-restaurant',
  templateUrl: './individual-restaurant.component.html',
  styleUrls: ['./individual-restaurant.component.css']
})
export class IndividualRestaurantComponent implements OnInit {

  usuario_logado: any;

  media_geral: Array<any> = [];
  array_avaliacao: Array<number> = [];
  avaliacao: number = 5;
  estrelas_contador: number = 5;
  avaliacao_usuario: number = 3;
  array_avaliacao_usuario: Array<number> = [];
  array_comentarios_usuarios_avaliacao: Array<number> = [];
  comentario_usuario: any;
  array_comentarios_usuarios: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<IndividualRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public restaurante: any,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _restaurants_service: RestaurantsService,
    private _auth_service: AuthService) { }

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

    this._auth_service.user$.subscribe(userInfos => {
      this.usuario_logado = userInfos;
    });

    this.listComments(this.restaurante.estrelas);

    this._auth_service.user$
      .subscribe(userInfos => {
        this.usuario_logado = userInfos;
      });
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
    this._restaurants_service.createUserComment(this.restaurante.id, this.usuario_logado.uid, {
      comentario: this.comentario_usuario,
      estrelas: this.avaliacao_usuario,
      comentado_em: new Date(),
      autor: {
        nome: this.usuario_logado.displayName,
        foto: this.usuario_logado.photoURL,
        uid: this.usuario_logado.uid
      }
    }).then(() => this.comentario_usuario = "");
  }

  listComments(param: number) {
    this.media_geral = [];
    this._restaurants_service.listRestaurantComment(this.restaurante.id)
      .subscribe(comentarios => {
        this.array_comentarios_usuarios = comentarios.map(comentario => comentario);
        comentarios.forEach(comentario => {
          return this.media_geral.push(comentario["estrelas"]);
        });
        this.media_geral.push(param);
        const sum = this.media_geral.reduce((a: number, b: number) => a + b, 0);
        const toDisplay = Math.round(sum / this.media_geral.length);
        return this.avaliacao = toDisplay;
      });
    this.array_comentarios_usuarios.forEach((comentario: any) => {
      this.media_geral.push(comentario["estrelas"]);
    });
    this.media_geral.push(param);
    const sum = this.media_geral.reduce((a: number, b: number) => a + b, 0);
    const toDisplay = Math.round(sum / this.media_geral.length);
    return this.avaliacao = toDisplay;
  }

  formatDate(seconds: number) {
    const data = new Date(seconds * 1000).toLocaleDateString();
    const horario = new Date(seconds * 1000).toLocaleTimeString();

    return `${data} às ${horario}`;
  }

  deleteComment(comentario: any) {
    if (window.confirm('Deseja mesmo excluir esse comentário?')) {
      this._restaurants_service.deleteComment(this.restaurante.id, comentario.autor.uid);
      this.snackBar.open('Comentário excluido com sucesso.', 'X', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000
      });
    }
  }

}
