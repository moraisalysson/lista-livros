import { FormControl } from '@angular/forms';
import { Item, Livro, LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';


const DELAY = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges //é um observable
    .pipe(
      debounceTime(DELAY), //delay para pegar apenas após o user terminar de digitar
      filter((valorDigitado) => valorDigitado.length >= 3), //só fará a requisição se o valor digitado for maior ou igual a 3
      tap(() => console.log('fluxo inicial')),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)), //switchMap: apaga a requisição anterior a cada nova requisição, então só fará a reqisição quando o user parar de digitar
      tap((retornoApi) => console.log(retornoApi)),
      map(resultado => this.livrosResultado = resultado),
      map(resultado => resultado.items ?? []),
      map((items) => this.livrosResultadoParaLivros(items)), //cada Item do array é um Livro
      catchError((erro) => {
        // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!';
        // return EMPTY; //encerra o ciclo de vida do observable
        console.log(erro);
        return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!'))
      })
    )


  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item); //faz a conversão de cada Item do resultadoLivros (acima) para o tipo array de LivroVolumeInfo
    })
  }

}



