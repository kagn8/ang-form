import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Iuser';
import { MainServiceService } from 'src/app/services/main-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isUserLogged: boolean = false;
  user!: IUser | null;


  constructor(private serv: MainServiceService, private route: Router) {}

  ngOnInit(): void {
    this.route.navigate(['/']);
    if (localStorage.getItem('user')) {
      this.serv.subject.next(true);
      this.isUserLogged = true;
    }

    this.serv.obs.subscribe((res) => {
      this.isUserLogged = res;
    });


  }

  logOut() {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Do it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this.serv.subject.next(false);
        this.route.navigate(['/']);
        Swal.fire('Logged-out', 'Log-in to continue', 'success');
      }
    });
  }
}
