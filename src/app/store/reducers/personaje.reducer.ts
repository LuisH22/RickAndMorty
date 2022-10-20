import { createReducer, on } from '@ngrx/store';
import { cargarPersonaje, cargarPersonajeError, cargarPersonajeSuccess } from '../actions';
import { Character } from './../../models/Character';

export interface PersonajeState {
    id: number,
    personaje: Character,
    loading: boolean,
    error: any
}

export const PersonajeInitialState: PersonajeState = {
    id: 0,
    personaje: {},
    loading: false,
    error: null
}

const _PersonajeReducer = createReducer( PersonajeInitialState,

    on( cargarPersonaje, (state, { id }) => ({ 
        ...state, 
        loading: true,
        id: id
    })),
    
    
    on( cargarPersonajeSuccess, (state, { personaje }) => ({ 
        ...state, 
        loading: false,
        personaje: { ...personaje }
    })),

    on( cargarPersonajeError, (state, { payload }) => ({ 
        ...state, 
        loading: false,
        error: payload.error.error
    })),




);

export function PersonajeReducer(state: any, action: any) {
    return _PersonajeReducer(state, action);
}