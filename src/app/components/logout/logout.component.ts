import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user: User = new User();
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      console.log(user.json());
      localStorage.setItem('token', user.json().auth_token);
      this.router.navigateByUrl('/status');
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
