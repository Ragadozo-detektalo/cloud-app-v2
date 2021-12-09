import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AppService } from './app.service';

@Component({
  selector: 'projectmunka-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  chart?: Chart;

  ngOnInit() {
    this.appService.getData().subscribe((data) => {
      this.chart = new Chart({
        title: {
          text: 'Riasztások száma napi bontásban',
        },

        yAxis: {
          title: {
            text: 'Riasztások száma',
          },
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
          },
        },
        xAxis: {
          categories: data[0].data.map(([category]) => category),
        },

        series: data.map((item) => {
          return { ...item, type: 'line' };
        }),
        responsive: {
          rules: [
            {
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      });
    });
  }
}
