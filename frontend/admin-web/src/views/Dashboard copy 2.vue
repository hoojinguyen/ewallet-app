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
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-6 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview 2019</h6>
                                <h5 class="h3 text-white mb-0">Users Created</h5>
                            </div>

                        </div>
                        <line-chart v-if="isChartLoaded"
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-6">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Overview 2019</h6>
                                <h5 class="h3 mb-0">Transaction Created</h5>
                            </div>
                        </div>

                        <bar-chart v-if="isChartLoaded"
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
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
      this.getReportThisYear();
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
          }
        },
        overview: {
          totalUser: '100',
          totalTransaction: '100',
          monthTransactions: '30',
          monthUsers: '10',
        },
        isChartLoaded: false



      };
    },
    methods: {
      async getReportThisYear() {

        let reportData = [];
        let {data} = await userRepository.reportByYear(2019)
        const items = data.items;
        //this.overview.monthUsers = items[date.getMonth()].totalCreatedUsers;
        this.overview.monthUsers = '21';

        items.forEach(item => {
          reportData.push(item.totalCreatedUsers)
        });
        this.bigLineChart.allData[0] = [2,1,3,4,1,2,3,4,5,5,7,1];
        this.initBigChart(0);

        data = await transactionRepository.reportByYear(2019)
        const transactionData = data.data.items;
        reportData = [];
        transactionData.forEach(item => {
          reportData.push(item.totalCreatedTransactions)
        })
        this.redBarChart.chartData.datasets[0].data = reportData;

        this.isChartLoaded =true;
        
      },

      async getOverviewReport() {
        let {data} = await userRepository.getOverviewReport();
        this.overview.totalUser = data.total+""
        data = await transactionRepository.getOverviewReport();
        this.overview.totalTransaction = data.data.total+""


        
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
