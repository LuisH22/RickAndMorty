import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.reducers';
import { Subscription } from 'rxjs';
import { cargarPersonajes } from './../../store/actions';
import { Character } from './../../models/Character';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  favArray = [];
  page: number = 0;
  cargando: boolean = false;
  lastPage: number = 1;
  form!: FormGroup;
  searchButton: boolean = false;
  showBtnTop: boolean = false;
  top: number = 0;
  subscription: Subscription = new Subscription();


  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.listenerData();
    this.getInfo();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listenerData(): void{
    this.subscription = this.store.select('personajes')
      .subscribe(({
        personajes, 
        page, 
        totalPages, 
        loading,
        error
      }) => {
        if(error) this.sharedService.showErrorMessage(error);
        this.lastPage = totalPages;
        this.cargando = loading;
        if(personajes && (page == this.page))  {
          this.characters = this.characters.concat(personajes);
      }
    })
  }

  createForm(): void{
    this.form = new FormGroup({
      name: new FormControl('', 
          [Validators.minLength(3), 
          Validators.required]
        ),
    });
  }

  get nameRequired(){ return this.form.get('name')?.invalid }
  
  getInfo(): void{
    this.page++;
    if(this.cargando){return} 
    if(this.page > this.lastPage) {return}
    let name = this.form.get('name')?.value;
    this.store.dispatch( cargarPersonajes({page: this.page, name}) )
  }

  backTop(): void{
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  onScroll(): void{
    this.getInfo()
  }

  search(): void{
    this.page = 0;
      this.characters = [];
    if(this.form.valid){
      this.searchButton = true;
      this.getInfo()
    }
  }

  showAll(): void{
    this.searchButton = false;
    this.page = 0;
    this.characters = [];
    this.form.get('name')?.setValue('');
    this.getInfo();
  }

  @HostListener('window:scroll', ['$event'])
  listenerScroll(): void{
    let pos = (document.documentElement.scrollTop || document.body.scrollTop)

    this.top = pos;
    if(this.top > 1500){
      this.showBtnTop = true;
    }else{
      this.showBtnTop = false;
    }
  }

}
