<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total users created"
                                type="gradient-red"
                                :sub-title="overview.totalUser"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0">
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total transactions"
                                type="gradient-orange"
                                :sub-title="overview.totalTransaction"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Users created this month"
                                type="gradient-green"
                                :sub-title="overview.monthUsers"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Transactions this month"
                                type="gradient-info"
                                :sub-title="overview.monthTransactions"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
            <div class= "form-group col-4 mt-4">
                <label style = "color: white" class ="form-control-label">Report Year</label>
                <select @change="reportYear()" v-model="overview.reportYear" class = "form-control" style = "color: #8898aa; width: 100%; height: calc(1.5em + 1.25rem + 2px); border-radius: 0.375rem; padding-left: 10px; border: 1px solid #cad1d7;font-size: 0.875rem;" name="role">
                    
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>

                </select>
                </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">

            <div class="row">
                <div class="col-xl-6 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview {{overview.reportYear}}</h6>
                                <h5 class="h3 text-white mb-0">Users Created</h5>
                            </div>

                        </div>
                        <line-chart v-if="isChartLoaded"
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                                :key="overview.reportYear"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-6">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Overview {{overview.reportYear}}</h6>
                                <h5 class="h3 mb-0">Transaction Created</h5>
                            </div>
                        </div>

                        <bar-chart v-if="isChartLoaded"
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                                :key="redBarChart.renderKey"
                        >
                        </bar-chart>
                    </card>
                </div>
            </div>
            <!-- End charts-->

        
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import RepositoryFactory from '../repository/RepositoryFactory';

  const userRepository = RepositoryFactory.get('users');
  const transactionRepository = RepositoryFactory.get('transactions');


  export default {
    components: {
      LineChart,
      BarChart,
    },
    created() {
      if(localStorage.firstRefresh == 'true'){
        localStorage.firstRefresh = false;
        this.$router.go()
      }
      this.getReportByYear(2019);
      this.getOverviewReport();
    },
    computed:{
      redBarData() {
        return this.redBarChart.chartData
      }
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [2,1,3,4,1,2,3,4,5,5,7,1]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Created Transactions',
              data: [2,1,3,4,1,2,3,4,5,5,7,1]
            }]
          },
          renderKey: 1
        },
        overview: {
          totalUser: '100',
          totalTransaction: '100',
          monthTransactions: '30',
          monthUsers: '10',
          reportYear: '2019',
        },
        isChartLoaded: false



      };
    },
    methods: {
      async reportYear() {
        await this.getReportByYear(this.overview.reportYear)
        this.redBarChart.renderKey++;

      },
      async getReportByYear(reportYear) {

          let reportData = [];
        let {data} = await userRepository.reportByYear(reportYear)
        const items = data.items;
        this.overview.monthUsers = '21';

        items.forEach(item => {
          reportData.push(item.totalCreated)
        });
        this.bigLineChart.allData[0] = reportData;

        this.initBigChart(0);

        data = await transactionRepository.reportByYear(reportYear)
        const transactionData = data.data.items;
        reportData = [];
        transactionData.forEach(item => {
          reportData.push(item.totalCreated)
        })
        this.redBarChart.chartData.datasets[0].data = reportData;

        

        this.isChartLoaded =true;
        
      },

      async getOverviewReport() {
        let {data} = await userRepository.getOverviewReport();
        this.overview.totalUser = data.total+""
        data = await transactionRepository.getOverviewReport();
        this.overview.totalTransaction = data.data.total+""
        const date = new Date();
        data = await userRepository.reportByYear(date.getFullYear());
        this.overview.monthUsers = data.data.items[date.getMonth()].totalCreated.toString();
        data = await transactionRepository.reportByYear(date.getFullYear());
        this.overview.monthTransactions = data.data.items[date.getMonth()].totalCreated.toString();
        
      },

      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Users Created',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    mounted() {
    }
  };
</script>
<style></style>
