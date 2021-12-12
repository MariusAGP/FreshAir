import { Component, OnInit } from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {HttpClient} from "@angular/common/http";
import {HubComponent, Sensordata} from "../hub/hub.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  mode: ProgressSpinnerMode = 'determinate';
  value1 = 90;
  value2 = 50;
  value3 = 20;
  interval: any;
  sensordata: Sensordata;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSensordata();
    this.interval = setInterval(() => {
      this.getSensordata();
      setTimeout(() => this.mode = 'determinate', 1100);
      this.mode = 'indeterminate';
    }, 5000)
  }

  getSensordata() {
    this.http.get<any>('http://freshair.host/api/get').subscribe(
      response => {
        console.log(response);
        this.sensordata = response[0];
        this.value1 = this.sensordata.temperature;
        this.value2 = this.sensordata.humidity;
        this.value3 = this.calcCo2(this.sensordata.co2);
      }
    );
  }

  calcCo2(co2: number): number{
    let min_Range = 0;
    let max_Range = 1200;

    let result = ((co2 - min_Range) * 100) / (max_Range - min_Range);
    return result;
  }

}
