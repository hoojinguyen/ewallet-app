<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
      </div>
    </div>

    <div v-if="isHasData > 0" class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list" 
                  :data="transactionList">
        <template slot="columns">
          <th>Wallet</th>
          <th>Type</th>
          <th>Created At</th>
          <th>Amount</th>
        </template>

        <template slot-scope="{row}">
          <td>
            {{row.wallet.displayName}}
          </td>
          <td>
            {{row.transactionType.displayName}}
          </td>
          <td>
            {{formatDate(row.createdAt)}}
          </td>
          <td>
            {{formatMoney(row.money, row.transactionType.isMoneyAdd)}}
          </td>
        </template>

      </base-table>
    </div>

    <div class ="text-center" v-else>
      Không có giao dịch nào
    </div>

    <div  class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination v-if="isHasData" :value = "currentPage" @changePage="changePage" :total = "totalResult" :perPage="pageSize"></base-pagination>
    </div>

  </div>
</template>
<script>

  import RepositoryFactory from '../../repository/RepositoryFactory';
  import moment from 'moment'

  const transactionRepository = RepositoryFactory.get('transactions');

  export default {
    name: 'transaction-table',
    props: {
      total: Number,
      walletData: Array,
      walletId: String,
      type: {
        type: String
      },
      title: String
    },

    computed: {
      isHasData() {
        return this.walletData.length;
      }
    },
    methods: {

      formatMoney(amount, isMoneyAdd) {
        return (isMoneyAdd ? "+ " : "- ") + amount.toString() + " VND"
      },
      formatDate(date) {
        return moment.utc(date).format("HH:mm:ss DD-MM-YYYY")
      },
      async fetch(pageIndex) {
        this.isLoading = true;
        const { data } = await transactionRepository.getByWalletId(this.walletId, this.pageSize, pageIndex);
        this.isLoading = false;
        this.transactionList = data.items;
        this.totalResult = data.total;
      },

      async updateStatus(id, status) {
        const dataUpdate = {
          "id": id,
          "status": status,
        }
        const { data } = await transactionRepository.update(dataUpdate);
        if (data.hasData) {
          this.fetch();
        }
      },
      async deleteUser(userId){
        const { data } = await transactionRepository.delete(userId);
          if (data.hasData) {
          this.fetch();
        }
      },

      async changePage(pageIndex) {
        this.fetch(pageIndex)
        this.currentPage = pageIndex;
      }
    },

    data() {
      return {
        currentPage: 1,
        totalResult: this.total,

        pageSize: 5,
        transactionList: this.walletData

      }
    }
  }
</script>
<style>

</style>
