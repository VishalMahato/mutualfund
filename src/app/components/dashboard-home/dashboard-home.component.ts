import { Component, OnInit } from '@angular/core';

import { MutualFundService } from 'src/app/services/mutual-fund.service';

import { ApiService } from 'src/app/services/api.service';

import { Router } from '@angular/router';

import { AnimationOptions } from 'ngx-lottie';

import { AnimationItem } from 'lottie-web';

import { AllfundService } from 'src/app/services/allfund.service';

@Component({
  selector: 'app-dashboard-home',

  templateUrl: './dashboard-home.component.html',

  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  mutualFunds: any;

  flag: any;

  error: any;

  detailList: any[] = [];

  allBottomDetail: any[] = [];

  data: any;
  showAllfund:boolean=false;

  constructor(
    private api: ApiService,
    private router: Router,
    private fund: AllfundService
  ) {}

  ngOnInit() {
    this.api.getTopDetail().subscribe((res) => {
      this.detailList = res;

      console.log(this.detailList);

      this.loadMutualFunds();
    });

    this.api.getBottomDetail().subscribe((res) => {
      this.allBottomDetail = res;
    });

  }

  showAllMutualfund(){
    this.showAllfund =! this.showAllfund


  }

  fetchById(schemaId: number): void {
    this.api.detailById(schemaId).subscribe((data) => {
      this.data = data;

      console.log(data[27]);
    });
  }

  options: AnimationOptions = {
    path: '../../../assets/135363-mutual-funds-investment.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  loadMutualFunds() {
    this.fund
      .getMutualFunds()

      .subscribe((data: any[]) => {
        this.mutualFunds = data;
      });
  }
}
