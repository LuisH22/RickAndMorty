import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Character } from './../../models/Character';
import { AppState } from './../../store/app.reducers';
import { cargarPersonaje } from './../../store/actions';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  id: number;
  character!: Character;
  cargando: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
      private activatedRoute: ActivatedRoute,
      private store: Store<AppState>,
      private sharedService: SharedService,
      private router: Router
    ) { 
      this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.listenerData();
    this.getCharacter();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listenerData(): void{
    this.subscription = this.store.select('personaje')
      .subscribe(({personaje, loading, error}) => {
        console.log('Get one personaje ', personaje)
        if (error){
          this.sharedService.showErrorMessage(error)
            .then((val) => {
              if (val) this.router.navigate(['/home']);
            })
        }
        this.character = personaje;
        this.cargando = loading
      })
  }

  getCharacter(){
    this.store.dispatch( 
      cargarPersonaje({id: this.id})
    )
  }

}
