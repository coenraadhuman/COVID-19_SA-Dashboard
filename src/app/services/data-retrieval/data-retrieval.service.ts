import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesModel } from '../../models/countries.model';
import { GlobalStatsModel } from '../../models/global-stats.model';
import { SouthAfricaCaseModel } from '../../models/south-africa-case.model';
import { GlobalTimeSeriesModel } from '../../models/global-timeSeries.model';
import { SouthAfricaDeathModel } from '../../models/south-africa-death.model';
import { SouthAfricaProvinceModel } from '../../models/south-africa-province.model';
import { TestDataModel } from '../../models/south-africa-test-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataRetrievalService {
  private countriesUri = 'https://corona.lmao.ninja/v2/countries';
  private overviewTotalsUri = 'https://corona.lmao.ninja/v2/all';
  private southAfricaCasesUri =
    'https://covid-za-api.herokuapp.com/cases/confirmed';
  private globalTimeSeriesUri =
    'https://corona.lmao.ninja/v2/historical?lastdays=all';
  private southAfricaDeathsUri =
    'https://covid-za-api.herokuapp.com/cases/deaths';
  private southAfricaProvinceUri =
    'https://covid-za-api.herokuapp.com/cases/timeline/provincial/cumulative';
  private southAfricaTestDataUri =
    'https://covid-za-api.herokuapp.com/cases/timeline/tests';

  constructor(private http: HttpClient) {}

  private executeRequest<T>(uri: string): Observable<T> {
    return this.http.get<T>(uri, { responseType: 'json' });
  }

  public getLocationsData(): Observable<CountriesModel[]> {
    return this.executeRequest<CountriesModel[]>(this.countriesUri);
  }

  public getTotalsData(): Observable<GlobalStatsModel> {
    return this.executeRequest<GlobalStatsModel>(this.overviewTotalsUri);
  }

  public getSouthAfricaCases(): Observable<SouthAfricaCaseModel[]> {
    return this.executeRequest<SouthAfricaCaseModel[]>(
      this.southAfricaCasesUri
    );
  }

  public getSouthAfricaDeaths(): Observable<SouthAfricaDeathModel[]> {
    return this.executeRequest<SouthAfricaDeathModel[]>(
      this.southAfricaDeathsUri
    );
  }

  public getSouthAfricaProvince(): Observable<SouthAfricaProvinceModel[]> {
    return this.executeRequest<SouthAfricaProvinceModel[]>(
      this.southAfricaProvinceUri
    );
  }

  public getGlobalTimeSeriesData(): Observable<GlobalTimeSeriesModel[]> {
    return this.executeRequest<GlobalTimeSeriesModel[]>(
      this.globalTimeSeriesUri
    );
  }

  public getTestData(): Observable<TestDataModel[]> {
    return this.executeRequest<TestDataModel[]>(this.southAfricaTestDataUri);
  }
}
