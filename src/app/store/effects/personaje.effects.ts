import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as personajeActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RickMortyService } from '../../services/rick-morty.service'



@Injectable()
export class PersonajeEffects {

    constructor(
        private actions$: Actions,
        private rickMortyService: RickMortyService
    ){}


    cargarpersonaje$ = createEffect(
        () => this.actions$.pipe(
            ofType( personajeActions.cargarPersonaje ),
            mergeMap(
                ( action ) => this.rickMortyService.getOneCharacter( action.id )
                    .pipe(
                        map( personaje => personajeActions.cargarPersonajeSuccess({ personaje }) ),
                        catchError( err => of(personajeActions.cargarPersonajeError({ payload: err })) )
                    )
            )
        )
    );

}