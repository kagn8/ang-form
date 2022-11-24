import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  item = localStorage.getItem('order');
  home!:any[]

  constructor() { }

  ngOnInit(): void {
   

    if (this.item != null) {
      this.home = JSON.parse(this.item);
      console.log(this.home);
      
    
      
    }else{
      this.home = [];
    }
  
  }
 

  delete(e:any){
    // console.log(this.home);
    console.log(this.home.indexOf(e));
    console.log(e);
    
    this.home.splice(this.home.indexOf(e), 1)
    console.log(this.home);
    localStorage.removeItem('order');
    localStorage.setItem('order', JSON.stringify(this.home))
    
    
    
  }
}
