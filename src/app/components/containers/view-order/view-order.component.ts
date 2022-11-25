import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { IOrder } from 'src/app/iorder';
import { IUser } from 'src/app/Iuser';
import { MainServiceService } from 'src/app/services/main-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  item = localStorage.getItem('order');
  home!:IOrder[];
  user!:IUser;

  constructor(private serv: MainServiceService, private route:Router) {}

  ngOnInit(): void {
    
    if (this.item != null) {
      this.serv.home = JSON.parse(this.item);
      this.home = this.serv.home
    
    } else {
      this.home = [];
    }
    this.user= JSON.parse(localStorage.getItem('user')!)
    this.home = this.home.filter(x => x.email == this.user.email)
   
  }

  delete(e: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this order?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Order deleted', '', 'success')
        this.home.splice(this.home.indexOf(e), 1);
        this.serv.home = this.home
        localStorage.removeItem('order');
        localStorage.setItem('order', JSON.stringify(this.home));
      } else if (result.isDenied) {
        
      }
    })
   
  }
  viewOrder(e: any) {
    localStorage.removeItem('single');
    localStorage.setItem('single', JSON.stringify(e));
    this.route.navigate(['/single'])
  }
}
