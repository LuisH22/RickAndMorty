import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as personajesActions from '../actions/personajes.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RickMortyService } from './../../services/rick-morty.service';
import { RespRickAndMorty } from './../../models/RespRickAndMorty';



@Injectable()
export class PersonajesEffects {

    constructor(
        private actions$: Actions,
        private rickMortyService :RickMortyService
    ){}


    cargarPersonajes$ = createEffect(
        () => this.actions$.pipe(
            ofType( personajesActions.cargarPersonajes ),
            mergeMap(
                ( actions ) => this.rickMortyService.getCharacters(actions.page, actions.name)
                    .pipe(
                        map( (resp: RespRickAndMorty) => personajesActions.cargarPersonajesSuccess({ data: resp, page: actions.page }) ),
                        catchError( err => of(personajesActions.cargarPersonajesError({ payload: err })) )
                    )
            )
        )
    );

}