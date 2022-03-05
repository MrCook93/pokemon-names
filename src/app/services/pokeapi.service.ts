import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class pokeApiService
{

    constructor(
        private httpclient: HttpClient
        )
        {}

    getPokemon(): Observable<any>{

            return this.httpclient.get("https://pokeapi.co/api/v2/pokemon?limit=151")
    }


    getPokemonDetails(pokeurl): Observable<any>{

            
            return this.httpclient.get(pokeurl)
    }



}