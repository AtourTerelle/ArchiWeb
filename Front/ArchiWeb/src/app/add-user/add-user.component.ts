import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders, provideHttpClient} from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})

export class AddUserComponent {

  addUserForm: FormGroup;

  Name: string = "Milo Pauchet"

  constructor (private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.addUserForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const userData = {
        pseudo_u: this.addUserForm.value.pseudo,
        mdp_u: this.addUserForm.value.mdp,
        role_u: this.addUserForm.value.role
      };
      const headers = new HttpHeaders()
      this.http.post('http://localhost:5000/add_user', userData, {headers})
        .subscribe(
          response => {
            console.log('Utilisateur ajouté avec succès', response);
            this.router.navigate(['home/Users']);
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
          }
        );
    }
  }
}
