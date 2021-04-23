<template>
	<el-card class="box-card w-100">
		<div slot="header" class="clearfix">
			<span class="txt-day">{{ detailTime.day }}</span>
			<span class="txt-date">{{ detailTime.weekDay }}, {{ detailTime.monthAndYear }}</span>
			<span class="txt-money-total">{{ detailTime.sumMoney }}</span>
		</div>
		<el-row v-for="(item, index) in dataTransaction" :key="index">
			<a href="#" v-on:click="openDetailTransaction(item, detailTime.fullday)">
				<span class="icon-category">
					<img :src="item.image" alt />
				</span>
				<div class="anon" style="float:left ; margin-top:0px">
					<p class="txt-name-category">{{ item.name }}</p>
					<p class="txt-description">{{ item.description }}</p>
				</div>
				<span class="txt-money-transaction text-primary" v-if="item.isMoneyAdd">+ {{ item.money }}</span>
				<span class="txt-money-transaction text-danger" v-else>- {{ item.money }}</span>
			</a>
		</el-row>
	</el-card>
</template>

<script>
export default {
	name: 'list-item-transaction',
	props: {
		dataTransaction: {
			type: Array,
			default: []
		},
		detailTime: {
			type: Object,
			default: ''
		}
	},
	data() {
		return {
			name: 'bao_hiem',
			icon: '/images/ca_phe.png'
		};
	},
	computed: {},
	methods: {
		// openDetailTransaction() {
		//   alert("ahihi");
		// }
		openDetailTransaction(transaction, timeOfTransaction) {
			this.$emit('openDetailTransactionEvent', {
				transaction,
				timeOfTransaction
			});
		}
	}
};
</script>
<style lang="scss">
.el-row {
	margin: -20px;
	margin-bottom: 20px;
	padding: 20px;
	&:last-child {
		margin-bottom: 0;
	}
	&:hover {
		background: rgba(45, 184, 76, 0.08);
	}
}
.el-col {
	border-radius: 4px;
}
.bg-purple-dark {
	background: #99a9bf;
}
.bg-purple {
	background: #d3dce6;
}
.bg-purple-light {
	background: #e5e9f2;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}
.clearfix:after {
	clear: both;
}

.box-card {
	width: 480px;
	a {
		color: black;
	}
	a:hover {
		color: #5cb87a;
	}
	.icon-category {
		float: left;
		padding: 3px 0;
		font-size: 1.8rem;
		font-weight: bold;
		img {
			width: 50px;
			height: 50px;
		}
	}
	.txt-day {
		float: left;
		padding: 3px 0;
		font-size: 1.8rem;
		font-weight: bold;
	}
	.txt-date {
		float: left;
		padding: 10px 25px;
	}
	.txt-money-total {
		float: right;
		padding: 10px 25px;
		font-weight: bold;
	}
	.txt-money-transaction {
		float: right;
		padding: 10px 25px;
		font-weight: bold;
		margin-top: 10px;
	}
	.txt-name-category {
		margin-top: 10px;
		margin-left: 30px;
		margin-bottom: 5px;
		text-align: left;
		font-size: 1.2rem;
		font-weight: bold;
	}
	.txt-description {
		margin-top: 0px;
		margin-left: 30px;
		font-size: 1rem;
		margin-bottom: 5px;
		text-align: left;
	}
}
</style>
