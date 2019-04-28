import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from './services/service.service';
import set = Reflect.set;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  // @ViewChild('baseCanvas') canvas: ElementRef;
  loading = false;
  lineChartColors;
  coinData;
  showTwoLine = false;
  showTreeLine = false;
  showTrashBtn = false;
  page = 1;
  pageSize = 50;
  collectionSize;
  value0 = '1h';
  value1 = '1d';
  value2 = '7d';
  select0: string;
  select1: string;
  select2: string;
  select10: string;
  select11: string;
  select12: string;
  input0;
  input1;
  input2;
  showAlert = false;
  alertType: string;
  message = '';


  chartOptions = {
    borderColor: 'red',
  };

  chartLabels = ['1', '2', '3', '4'];

  constructor(private service: ServiceService) {
    this.service.getAllCoins().subscribe(x => {
      this.coinData = x;
      this.collectionSize = this.coinData.length;
      this.loading = true;
    }, error => this.loading = true);
  }

  get countries() {
    console.log('Ne zaman çalışacak bu ?');
    return this.coinData
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    /*
    const gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#CDFFC4');
    gradient.addColorStop(1, '#EBFFE8');
    this.lineChartColors = [
      {
        backgroundColor: gradient,
        borderColor: 'red'
      }
    ];
    */
  }

  addLine(data) {
    switch (data) {
      case 2:
        this.showTwoLine = true;
        break;
      case 3:
        this.showTreeLine = true;
        break;
      default:
        break;
    }
  }

  deleteLine(data) {
    switch (data) {
      case 2:
        this.showTwoLine = false;
        this.showTreeLine = false;
        break;
      case 3:
        this.showTreeLine = false;
        break;
      default:
        break;
    }
  }

  filters(s, i, s2) {
    const datas = {
      percentChange7d: false,
      percentage7d: 5,
      percentType7d: 'PROFIT',
      percentChange1d: false,
      percentage1d: 5,
      percentType1d: 'PROFIT',
      percentChange1h: false,
      percentage1h: 5,
      percentType1h: 'PROFIT'
    };
    switch (s) {
      case '1d':
        datas.percentChange1d = true;
        datas.percentage1d = i;
        datas.percentType1d = s2;
        break;
      case '1h':
        datas.percentChange1h = true;
        datas.percentage1h = i;
        datas.percentType1h = s2;
        break;
      case '7d':
        datas.percentChange7d = true;
        datas.percentage7d = i;
        datas.percentType7d = s2;
        break;
      default:
        break;
    }
    return datas;
  }

  alertShow(message: string, type: string) {
    this.message = message
    this.showAlert = true;
    this.alertType = type;
    setTimeout(() => {this.showAlert = false; }, 5000);
  }

  filterCoins() {
    let datas;
    if (this.select0 && this.input0 && this.select10) {
        datas = this.filters(this.select0, this.input0, this.select10);
        if (this.select1 && this.input1 && this.select11) {
          datas = this.filters(this.select1, this.input1, this.select11);
          if (this.select2 && this.input2 && this.select12) {
            datas = this.filters(this.select2, this.input2, this.select12);
          } else {
            if (this.select2 && this.input2 && this.select12) {
              this.alertShow('This row is not included in the filtering because all values ​​in the third row are not entered', 'warning');
            }
          }
        } else {
          if (this.select1 || this.input1 || this.select11) {
            this.alertShow('This row is not included in the filtering because all values ​​in the second row are not entered', 'warning');
          }
        }
    } else {
      this.alertShow('Please complete all row information', 'danger');
    }
    this.service.filterCoins(JSON.stringify(datas)).subscribe(x => {
      this.coinData = x;
      this.collectionSize = this.coinData.length;
    });
  }
}
