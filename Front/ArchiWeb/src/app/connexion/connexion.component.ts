import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, provideHttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ConnexionComponent, ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {
  test: string = "Bonjour tout le monde !"

  connexionForm: FormGroup;

  constructor (private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.connexionForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.connexionForm.valid) {
      const userData = {
        pseudo_u: this.connexionForm.value.pseudo,
        mdp_u: this.connexionForm.value.mdp
      };

      const headers = new HttpHeaders()
      
      this.http.post<any>('http://localhost:5000/connexion', userData, {headers})
        .subscribe({
          next: (response) => {
            if(response.token){
              localStorage.setItem('authToken', response.token);
              this.router.navigate(['home'])
              console.log('connexion reussi', response);
            }
            else{
              console.error('Erreur lors de la connexion');
            }
          },
        }
          /*response => {
            if(response.token)
              response.json()
            console.log(response);
            console.log(response.token);
            //localStorage.setItem('authToken', response.token);

            console.log('connexion reussi', response);
          },
          error => {
            console.error('Erreur lors de la connexion', error);
          }*/
        );
    }
  }
  /*form = {
      identifiant : null,
      password: null
  }*/
}
