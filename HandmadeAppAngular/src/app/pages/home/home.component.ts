import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products:any =[];
  constructor(private global: GlobalService) {
    this.loadHomePage();
  }

  ngOnInit(): void {}

  loadHomePage() {
    this.global.loadHome().subscribe((res) => {
      this.products=res;
      console.log(res);
    });
  }

  reserve(id:any,product:any){
    this.global.reserveProduct(id,product).subscribe(res=>{
      console.log(res);
    })
  }
}
