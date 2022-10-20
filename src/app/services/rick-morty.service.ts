import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespRickAndMorty } from '../models/RespRickAndMorty';
import { Character } from './../models/Character';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private baseUrl: string = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getCharacters(page: number = 1, name: string = ''){
    return this.http.get<RespRickAndMorty>(`${this.baseUrl}/character?page=${page}&name=${name}`,  this.httpOptions);
  }

  getOneCharacter(id:number){
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`, this.httpOptions);
  }
}
