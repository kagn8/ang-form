import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  home: IOrder[] = [];
  user!: IUser;

  constructor(private serv: MainServiceService, private route: Router) {}




  ngOnInit(): void {
    
    this.serv
      .getOrders()
      .subscribe(
        (res: any) =>
          (this.home = res.filter((x: IOrder) => x.email == this.user.email))
      );
    this.user = JSON.parse(localStorage.getItem('user')!);

    if (this.user.username == 'admin') {
      this.serv.getOrders().subscribe((res: any) => {
        (this.home = res)
        console.log(res);
        
        // for (const item of this.home) {
          
        // }
      });
    }
  }

  delete(e: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this order?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Order deleted', '', 'success');
        this.serv.deleteOrder(e).subscribe((res) => {
          this.serv.getOrders().subscribe((res: any) => {
            if (this.user.username == 'admin') {
              this.serv.getOrders().subscribe((res: any) => (this.home = res));
            } else
              this.home = res.filter((x: IOrder) => x.email == this.user.email);
          });
        });
      } else if (result.isDenied) {
      }
    });
  }
  viewOrder(e: any) {
    localStorage.removeItem('single');
    localStorage.setItem('single', JSON.stringify(e.id));
    this.serv.numberSub.next(e.id);
    this.route.navigate(['/single']);
  }
}
