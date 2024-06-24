import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataTranferServiceService } from '../data-tranfer-service.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  EditUserForm: FormGroup;
  item: any;

  constructor (private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router, private dataTransfertService : DataTranferServiceService){
    this.EditUserForm = this.fb.group({
      mdp: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.item = this.dataTransfertService.getItem();
    if (this.item) {
      this.EditUserForm.patchValue({
        mdp: this.item.mdp_u,
        role: this.item.role_u
      });
    }
  }

  onSubmit() {
    if (this.EditUserForm.valid) {
      const userData = {
        mdp_u: this.EditUserForm.value.mdp,
        role_u: this.EditUserForm.value.role
      };
      const headers = new HttpHeaders()
      this.http.put(`http://localhost:5000/modif_user/${this.route.snapshot.paramMap.get('id')}`, userData, {headers})
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
