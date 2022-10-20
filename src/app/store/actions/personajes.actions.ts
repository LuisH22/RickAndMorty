import { createAction, props } from '@ngrx/store';
import { RespRickAndMorty } from 'src/app/models/RespRickAndMorty';

export const cargarPersonajes = createAction(
    '[personajes] Cargar Personajes',
    props<{ 
        page: number,
        name: string
    }>()
);

export const cargarPersonajesSuccess = createAction(
    '[personajes] Cargar Personajes Success',
    props<{ data: RespRickAndMorty, page: number }>()
);

export const cargarPersonajesError = createAction(
    '[personajes] Cargar Personajes Error',
    props<{ payload: any }>()
);

