<template>
  <div class="container-fluid">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="right">Tổng Chi Tiêu theo nhóm</el-radio-button>
      <el-radio-button label="left">Tổng Thu Chi trong năm</el-radio-button>
    </el-radio-group>
    <el-tabs
      :tab-position="tabPosition"
      style="height: 100%; max-width:100%"
      v-if="tabPosition =='left'"
    >
      <el-tab-pane>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-5">
            <bar-chart
              :isMoneyAddBarChart="isMoneyAddIncomeBarChart"
              :labelBarChart="labelIncomeBarChart"
              :backGroundBarChart="backGroundIncomeBarChart"
            />
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-5">
            <bar-chart
              :isMoneyAddBarChart="isMoneyAddExpenseBarChart"
              :labelBarChart="labelExpenseBarChart"
              :backGroundBarChart="backGroundExpenseBarChart"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-tabs
      :tab-position="tabPosition"
      style="height: 100%; max-width:100%"
      v-if="tabPosition=='right'"
    >
      <el-tab-pane>
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <el-date-picker
              v-model="dateReportPieChart"
              style="width: 100%;"
              type="date"
              placeholder="Select date and time"
              :default-time="dateCurent"
              @change="changeDateTime($event)"
            ></el-date-picker>
          </div>
          <div class="col-4"></div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-5">
            <doughnut-chart :isMoneyAddPieChart="isMoneyAddIncomePieChar" />
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-5">
            <doughnut-chart :isMoneyAddPieChart="isMoneyAddExpensePieChar" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BarChart from "../components/Chart/BarChart";
import DoughnutChart from "../components/Chart/DoughnutChart";
import PieChart from "../components/Chart/PieChart";
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import axios from "axios";
import config from "../config/config";

export default {
  components: {
    BarChart,
    PieChart,
    DoughnutChart
  },
  mounted() {
    this.$store.dispatch("retrieveWallets");
    let dateNow = moment.utc().format();
    this.dateReportPieChart = localStorage.getItem("timeReportPieChart");
  },
  data() {
    return {
      tabPosition: "right",
      isMoneyAddIncomeBarChart: true,
      isMoneyAddExpenseBarChart: false,
      labelIncomeBarChart: "Tổng thu nhập",
      labelExpenseBarChart: "Tổng Chi tiêu",
      backGroundIncomeBarChart: "#0275d8",
      backGroundExpenseBarChart: "#d9534f",
      isMoneyAddIncomePieChar: true,
      isMoneyAddExpensePieChar: false,
      dateReportPieChart: ""
    };
  },
  computed: {
    ...mapGetters({
      dataChartBar: "getDataReport",
      dataPieExpense: "getDataReportPieExpense",
      dataPieIncome: "getDataReportPieIncome"
    }),
    dateFormat() {
      return moment.utc(this.dateReportPieChart).format();
    },
    dateCurent() {
      return moment.utc().format();
    }
  },
  methods: {
    changeDateTime(value) {
      let dataFormat = moment.utc(this.dateReportPieChart).format();
      localStorage.setItem("timeReportPieChart", dataFormat);
      location.reload();
    }
  }
};
</script>

<style>
</style>