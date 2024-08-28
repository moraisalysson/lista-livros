import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes?'

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> { //<--------------------- OBSERVABLE: ENVIA OS DADOS / É LAZY (PREGUIÇOSO)
      const params = new HttpParams().append('q', valorDigitado);

      return this.http.get<LivrosResultado>(this.API, { params })
      // .pipe( //<----- pipe:  Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.
        // tap((retornoAPI) => console.log("flxo do tap", retornoAPI)), //<----- tap: serve para debugging
        // map(resultado => resultado.items ?? []), //<-- Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.
        // tap(resultado => console.log("resultado", resultado)
      // );
  }
}
