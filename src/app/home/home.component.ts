import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { userData } from '../interfaces/userData';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  search: FormControl = new FormControl("")
  displayedColumns: string[] = ['id', 'full_name', 'email', 'position'];
  dataSource: MatTableDataSource<userData>;
  lastSearchEmployees: userData[];
  historySearch: userData[] = [];
  showLastSearch: boolean;

  constructor(
    private router: Router,
    private ds: DataService) {
    let showLastsearch_ = this.router.getCurrentNavigation().extras.state;
    if (showLastsearch_) {
      this.historySearch = JSON.parse(sessionStorage.getItem("lastSearch"));
      this.historySearch ? this.showLastSearch = true : this.showLastSearch = false;
    }
  }

  ngOnInit(): void {
    this.ds.getUsers()
      .subscribe((_users: userData[]) => {
        this.dataSource = new MatTableDataSource(_users);
      })
  }

  applyFilter() {
    if (!this.search.value) {
      this.search.markAsTouched();
      return;
    }

    const filterValue = this.search.value;
    this.dataSource.filterPredicate = ((data: userData, filter: string): boolean => {
      return data.Id.toLowerCase().includes(filter) || data.Full_Name.toLowerCase().includes(filter) ||
        data.Email.toLowerCase().includes(filter) || data.Position.toLowerCase().includes(filter)
    })
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.lastSearchEmployees = this.dataSource.filteredData;
    if (this.lastSearchEmployees.length > 0) {
      sessionStorage.setItem("lastSearch", JSON.stringify(this.lastSearchEmployees));
    }
  }

  userInfo(user: userData) {
    console.log(user);
    this.router.navigate(['/user', user.Id])
  }

}
