import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { userData } from '../interfaces/userData';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],

})
export class PersonInfoComponent implements OnInit {

  userData: userData;
  constructor(
    private route: ActivatedRoute,
    private ds: DataService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let userId = param.get('id');
      this.ds.getUserInfo(userId)
        .subscribe(user => this.userData = user)
    })
  }

}


