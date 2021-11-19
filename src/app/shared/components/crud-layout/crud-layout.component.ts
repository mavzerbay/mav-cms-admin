import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mav-crud-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.scss']
})
export class CrudLayoutComponent implements OnInit {
  datasource!: any[];

  customers!: any[];

  totalRecords!: number;

  cols!: any[];

  loading!: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private http: HttpClient
  ) { }

  ngOnInit() {
    //datasource imitation
    this.getCustomersLarge().then(data => {
      this.datasource = data;
      this.totalRecords = data.length;
    });

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  getCustomersLarge() {
    return this.http.get<any>('assets/customers-large.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      if (this.datasource) {
        this.customers = this.datasource.slice(event.first, ((event.first ?? 0) + (event.rows ?? 0)));
        this.loading = false;
      }
    }, 1000);
  }
}
