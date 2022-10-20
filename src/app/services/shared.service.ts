import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  showErrorMessage(error: string): Promise<any>{
    return Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          customClass:{
            title: 'title-swal',
            confirmButton: 'confirm-button-swal',
            popup:'container-swal'
          },
          background: '#262626',
        })
  }
 
}
