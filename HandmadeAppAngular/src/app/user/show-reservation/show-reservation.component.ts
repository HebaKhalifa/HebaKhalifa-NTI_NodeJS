import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-show-reservation',
  templateUrl: './show-reservation.component.html',
  styleUrls: ['./show-reservation.component.css'],
})
export class ShowReservationComponent implements OnInit {
  constructor(private global: GlobalService, private _activated: ActivatedRoute) {
   let id= _activated.snapshot.paramMap.get('id');
    this.showReservation(id);
  }

  ngOnInit(): void {}

  showReservation(id: any) {
    this.global.showReservation(id).subscribe((res) => {
      console.log(res);
    });
  }
}
