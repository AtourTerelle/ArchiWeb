import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent{
  EditUserForm: FormGroup;
  item: any;

  constructor (private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router){
    this.EditUserForm = this.fb.group({
      mdp: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.EditUserForm.valid) {
      const userData = {
        pseudo_u: this.route.snapshot.paramMap.get('id'),
        mdp_u: this.EditUserForm.value.mdp,
      };
      const headers = new HttpHeaders()
      this.http.put(`http://localhost:5000/modif_user`, userData, {headers})
        .subscribe(
          response => {
            console.log('Utilisateur modifié avec succès', response);
            this.router.navigate(['home/Users']);
          },
          error => {
            console.error('Erreur lors de la modification de l\'utilisateur', error);
          }
        );
    }
  }
}
