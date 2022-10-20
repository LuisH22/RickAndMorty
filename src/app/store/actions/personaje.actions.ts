import { createAction, props } from '@ngrx/store';
import { Character } from './../../models/Character';

export const cargarPersonaje = createAction(
    '[personaje] Cargar personaje',
    props<{ id: number }>()
);

export const cargarPersonajeSuccess = createAction(
    '[personaje] Cargar personaje Success',
    props<{ personaje: Character }>()
);

export const cargarPersonajeError = createAction(
    '[personaje] Cargar personaje Error',
    props<{ payload: any }>()
);

