import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';


@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  user: User = new User();
  isLoggedIn: boolean = false;
  constructor(private router: Router, private auth: AuthService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        console.log(user.json());
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  onLogout(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        console.log(user.json());
        localStorage.removeItem(user.json().auth_token);
        this.router.navigateByUrl('/login');
        })
        .catch((err) => {
      console.log(err);
      });
    }
  }
}
