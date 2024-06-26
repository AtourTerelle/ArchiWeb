import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, provideHttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {

  connexionForm: FormGroup;

  erreur: boolean = false;

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
          .subscribe(
            response => {
              if(response.token && response.role){
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('role', response.role);
                localStorage.setItem('name', response.name);
                this.router.navigate(['home']);
              }
              
            },
            error => {
              this.erreur = true;
            }
        );
    }
  }
}
