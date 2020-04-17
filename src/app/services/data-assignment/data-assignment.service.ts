import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRetrievalService } from '../data-retrieval/data-retrieval.service';
import { DataStoreService } from '../data-store/data-store.service';
import { DataTransformingService } from '../data-transforming/data-transforming.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AssignGlobalStats } from '../../store/global-stats/global-stats.actions';
import { AssignSouthAfricaCountriesModel } from '../../store/south-africa-case/south-africa-case.actions';
import { AssignSouthAfricaTestDataModel } from '../../store/south-africa-test/south-africa-test.actions';

@Injectable({
  providedIn: 'root',
})
export class DataAssignmentService {
  private subscriptionTwo: Subscription;
  private subscriptionThree: Subscription;
  private subscriptionFour: Subscription;
  private subscriptionFive: Subscription;
  private subscriptionSix: Subscription;
  private subscriptionSeven: Subscription;

  constructor(
    private dataRetrieval: DataRetrievalService,
    public dataStore: DataStoreService,
    private dataTransforming: DataTransformingService,
    private store: Store<AppState>
  ) {}

  public getTotalsData() {
    this.subscriptionTwo = this.dataRetrieval
      .getTotalsData()
      .subscribe((retrievedData) => {
        this.store.dispatch(new AssignGlobalStats(retrievedData));
        this.subscriptionTwo.unsubscribe();
      });
  }

  public getSouthAfricaCaseDetailsData() {
    this.subscriptionThree = this.dataRetrieval
      .getSouthAfricaCases()
      .subscribe((retrievedData) => {
        this.store.dispatch(
          new AssignSouthAfricaCountriesModel({
            southAfricaRawCaseData: [...retrievedData],
            southAfricaCaseDetails: this.dataTransforming.aggregateSouthAfricaCases(
              retrievedData
            ),
          })
        );
        this.subscriptionThree.unsubscribe();
      });
  }

  public getTimelineData() {
    this.subscriptionFour = this.dataRetrieval
      .getGlobalTimeSeriesData()
      .subscribe((retrievedData) => {
        this.dataStore.timelineDataCopy = this.dataTransforming.getAggregatedTimelineData(
          retrievedData
        );
        this.dataStore.timelineData.next(
          this.dataTransforming.getAggregatedTimelineData(retrievedData)
        );

        const object = this.dataTransforming.getGlobalAggregatedData(
          this.dataStore.timelineDataCopy
        );
        this.dataStore.globalTimelineData.next(object);
        this.dataStore.globalTimelineDataCopy = object;

        this.subscriptionFour.unsubscribe();
      });
  }

  public getSouthAfricaTestData() {
    this.subscriptionFive = this.dataRetrieval
      .getTestData()
      .subscribe((retrievedData) => {
        this.store.dispatch(
          new AssignSouthAfricaTestDataModel(
            this.dataTransforming.getMostRecentTestData(retrievedData)
          )
        );
        this.subscriptionFive.unsubscribe();
      });
  }

  public getSouthAfricaDeathsDetailsData() {
    this.subscriptionSix = this.dataRetrieval
      .getSouthAfricaDeaths()
      .subscribe((retrievedData) => {
        this.dataStore.southAfricaDeathDetails = retrievedData;
        retrievedData.forEach((x) => {
          this.dataStore.southAfricaProvinceTableDetails.forEach((y) => {
            if (x.province === y.key) {
              y.totalDeaths += 1;
            }
          });
        });
        this.dataStore.isDeathDetailsLoaded = true;
        this.subscriptionSix.unsubscribe();
      });
  }

  public getSouthAfricaProvinceDetailsData() {
    this.subscriptionSeven = this.dataRetrieval
      .getSouthAfricaProvince()
      .subscribe((retrievedData) => {
        retrievedData = retrievedData.sort(
          (a, b) =>
            (b.provinces.gauteng === '' ? 0 : Number(b.provinces.gauteng)) -
            (a.provinces.gauteng === '' ? 0 : Number(a.provinces.gauteng))
        );
        this.dataStore.southAfricaProvinceDetails = retrievedData;
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[0].totalCases = Number(
          retrievedData[0].provinces.gauteng
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[1].totalCases = Number(
          retrievedData[0].provinces.western_cape
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[2].totalCases = Number(
          retrievedData[0].provinces.kwazulu_natal
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[3].totalCases = Number(
          retrievedData[0].provinces.free_state
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[4].totalCases = Number(
          retrievedData[0].provinces.mpumlanga
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[5].totalCases = Number(
          retrievedData[0].provinces.north_west
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[6].totalCases = Number(
          retrievedData[0].provinces.limpopo
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[7].totalCases = Number(
          retrievedData[0].provinces.eastern_cape
        );
        // tslint:disable-next-line:max-line-length
        this.dataStore.southAfricaProvinceTableDetails[8].totalCases = Number(
          retrievedData[0].provinces.northern_cape
        );
        this.dataStore.southAfricaProvinceTableDetails[9].totalCases = Number(
          retrievedData[0].provinces.unknown
        );
        this.dataStore.isProvinceDetailsLoaded = true;
        this.subscriptionSeven.unsubscribe();
      });
  }
}
