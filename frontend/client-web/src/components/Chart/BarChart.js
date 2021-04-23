import { Bar } from '../BaseCharts'
import moment from 'moment-timezone'
import axios from 'axios'
import config from '../../config/config'


export default {
    extends: Bar,
    props: {
        isMoneyAddBarChart: {
            type: Boolean,
            default: false
        },
        labelBarChart: {
            type: String,
            default: 'Tổng Thu'
        },
        backGroundBarChart: {
            type: String,
            default: "Green"
        },
    },
    mounted() {
        let date = moment.utc().format();
        let date12 = moment.utc().format();
        let date11 = moment(date).subtract(1, 'months').utc().format();
        let date10 = moment(date).subtract(2, 'months').utc().format();
        let date9 = moment(date).subtract(3, 'months').utc().format();
        let date8 = moment(date).subtract(4, 'months').utc().format();
        let date7 = moment(date).subtract(5, 'months').utc().format();
        let date6 = moment(date).subtract(6, 'months').utc().format();
        let date5 = moment(date).subtract(7, 'months').utc().format();
        let date4 = moment(date).subtract(8, 'months').utc().format();
        let date3 = moment(date).subtract(9, 'months').utc().format();
        let date2 = moment(date).subtract(10, 'months').utc().format();
        let date1 = moment(date).subtract(11, 'months').utc().format();

        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const dateList = [date1, date2, date3, date4, date5, date6, date7, date8, date9, date10, date11, date12]
        const walletId = localStorage.getItem('walletId')
        Promise.all(
            dateList.map(
                dt => axios.get(`/transactions/reportTotalByMonth?date=${dt}&walletId=${walletId}&isMoneyAdd=${this.isMoneyAddBarChart}`)
                    .then(returnVal => returnVal.data.totalMoney)
            )
        )
            .then(dataArr => {
                this.renderChart({
                    labels: ['Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1'],
                    datasets: [
                        {
                            label: [this.labelBarChart],
                            backgroundColor: this.backGroundBarChart,
                            data: dataArr
                        }
                    ]
                }, { responsive: true, maintainAspectRatio: false })
            })
    },

}   