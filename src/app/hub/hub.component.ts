import { Component, OnInit } from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {HttpClient} from "@angular/common/http";

export class Sensordata {
  constructor(
    public temperature: number,
    public humidity: number,
    public co2: number,
    public id?: number,
    public timestamp?: Date
  ) {
  }
}

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
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
      this.sendAlert();
      setTimeout(() => this.mode = 'determinate', 1100);
      this.mode = 'indeterminate';
    }, 5000)
  }

  getSensordata() {
    this.http.get<any>('https://www.freshair.host/api/get').subscribe(
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

  sendAlert() {
    if (this.sensordata.co2 >= 1800) {
      alert("The Co2 values have reached a critical point. Please be advised to open the windows!")
      let audio = new Audio();
      audio.src = "../assets/sounds/notification.wav/";
      audio.load();
      audio.play();
    }
  }
}
