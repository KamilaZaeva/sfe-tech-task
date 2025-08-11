import { Component, inject, OnInit } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsersFacadeService } from '../../../core/facades/users-facade.service';

@Component({
  selector: 'app-users-list-page',
  imports: [UsersListComponent, MatButton],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
})
export class UsersListPageComponent implements OnInit {
  facade = inject(UsersFacadeService);
  router = inject(Router);

  ngOnInit(): void {
    this.facade.loadUsers();
  }

  goToNew(): void {
    void this.router.navigate(['/users/create']);
  }

  goToEdit(id: number): void {
    void this.router.navigate(['/users', id]);
  }
}
