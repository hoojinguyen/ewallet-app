import { Doughnut } from '../BaseCharts'
import moment from 'moment-timezone'
import axios from 'axios'
import config from '../../config/config'

export default {
    extends: Doughnut,
    data() {
        return {
            valuePie: [],
            labelPie: [],
            colorPie: []
        }
    },
    props: {
        isMoneyAddPieChart: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);
        let date = localStorage.getItem('timeReportPieChart')

        let valuePie = []
        let labelPie = []
        let colorPie = []
        const walletId = localStorage.getItem('walletId')
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`/transactions/reportByTransactionTypes?date=${date}&walletId=${walletId}&isMoneyAdd=${this.isMoneyAddPieChart}`)
            .then(res => {
                if (res.data.items.length <= 0) {
                    valuePie = [100]
                    labelPie = ['Chưa có giao dịch']
                    colorPie = [randomColor()]
                }
                else {
                    res.data.items.map(item => {
                        labelPie.push(item.transactionType.displayName);
                        valuePie.push(item.totalMoney);
                        colorPie.push(randomColor())
                    })
                }
                this.renderChart({
                    labels: labelPie,
                    datasets: [
                        {
                            backgroundColor: colorPie,
                            data: valuePie
                        }
                    ]
                }, { responsive: true, maintainAspectRatio: false })

            })
            .catch(error => {
            })
    }
}