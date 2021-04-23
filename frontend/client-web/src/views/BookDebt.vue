<template>
  <div>
    <div class="row m-0">
      <div class="col-12 main-content">
        <div class="transaction-display">
          <el-tabs v-model="activeMonth" @tab-click="handleClick" :stretch="true">
            <el-tab-pane name="lastMonth" label="Trả nợ">
              <p v-if="dataDebtCollection.length == 0">Chưa có giao dịch nào!</p>
              <list-item-transaction
                v-else
                class="item-transaction"
                v-for="(item,index) in dataDebtCollection"
                :key="index"
                :dataTransaction="item.listTransaction"
                :detailTime="item.detailTime"
                v-on:openDetailTransactionEvent="openDetailTransaction"
              />
            </el-tab-pane>
            <el-tab-pane name="currentMonth" label="Thu nợ">
              <p v-if="dataRepayment.length == 0">Chưa có giao dịch nào!</p>
              <list-item-transaction
                v-else
                class="item-transaction"
                v-for="(item,index) in dataRepayment"
                :key="index"
                :dataTransaction="item.listTransaction"
                :detailTime="item.detailTime"
                v-on:openDetailTransactionEvent="openDetailTransaction"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- Modal chi tiet  -->
    <el-dialog
      title="Chi tiết giao dịch"
      :lock-scroll="scrollDialog"
      :visible.sync="dialogVisible"
      width="80%"
      v-if="currentTransaction"
    >
      <div class="content">
        <div class="container d-flex align-items-start">
          <!-- <img :src="currentCategory.image" alt="#" class="content-icon" /> -->
          <img :src="currentTransaction.image" class="content-icon" alt />
          <div class="ml-4 text-left" style="width:400px">
            <h4 class="title mb-2 font-weight-bold">{{ currentTransaction.name }}</h4>
            <p class="mb-1" style="font-size:1.2rem">{{currentTransaction.walletName}}</p>
            <span class="text-uppercase" style="opacity:0.5;font-size:1.2rem">{{timeOfTransaction}}</span>
            <hr class="mt-3 mb-3" />
            <p class="mb-2" style="font-size:1.2rem">
              <u>Ghi chú:</u>
              {{currentTransaction.description}}
            </p>
            <p
              class="font-weight-bold text-primary"
              style="font-size:2rem"
              v-if="currentTransaction.isMoneyAdd"
            >+ {{currentTransaction.money}}</p>
            <p
              class="font-weight-bold text-danger"
              style="font-size:2rem"
              v-else
            >- {{currentTransaction.money}}</p>
            <div v-if="currentTransaction.isUserRelated">
              <button
                class="btn btn-sm btn-success mr-3"
                v-on:click="cashBack"
                v-if="currentTransaction.moneyRemain != 0"
              >Trả lại</button>
              <button
                class="btn btn-sm btn-success"
                v-on:click="tableListCashBackOnclick(currentTransaction.id)"
              >Danh sách giao dịch</button>
              <div class="mt-3">
                <el-progress
                  style="width:400px"
                  :stroke-width="24"
                  :percentage="percentDebt"
                  status="success"
                ></el-progress>
              </div>
            </div>
            <div class="mt-3" v-if="currentTransaction.isUserRelated">
              <p class="text-black-50" style="font-size:1.2rem">
                Đã trả:
                <strong>{{convertCurrency(currentTransaction.moneyPaid)}}</strong>
              </p>
              <strike
                class="text-black-50 text-danger"
                style="font-size:1.2rem"
                v-if="currentTransaction.moneyRemain == 0"
              >Còn nợ: {{convertCurrency(currentTransaction.moneyRemain)}}</strike>
              <p class="text-black-50" style="font-size:1.2rem" v-else>
                Còn nợ:
                <strong>{{convertCurrency(currentTransaction.moneyRemain)}}</strong>
              </p>
            </div>
          </div>
          <div class="ml-5 text-right" v-if="cashBackInput && currentTransaction.isUserRelated">
            <currency-input
              v-focus
              placeholder="Nhập số tiền trả lại"
              size="medium"
              style="width:300px !important; padding:10px;  "
              v-model="cashBackMoney"
              v-on:keyup.enter="cashBackAction(currentTransaction)"
              currency="VND"
              locale="vi"
              :distraction-free="false"
            />
            <el-button
              type="primary"
              icon="el-icon-check"
              class="ml-3"
              circle
              style="outline: none;"
              v-on:click="cashBackAction(currentTransaction)"
            ></el-button>
          </div>
          <!-- DANH SACH GIAO DICH CON  -->
          <div
            v-if="tableListCashBack && currentTransaction.isUserRelated"
            class="ml-5 text-left"
            style="width:500px"
          >
            <h3 v-if="dataTransactionDebt.length != 0">Danh sách giao dịch trả lại</h3>
            <h3 v-if="dataTransactionDebt.length == 0">Chưa có giao dịch nào!</h3>
            <el-table
              v-if="dataTransactionDebt.length != 0"
              :data="dataTransactionDebt"
              height="250"
              style="width: 500px"
            >
              <el-table-column prop="date" label="Ngày trả" width="180"></el-table-column>
              <el-table-column prop="name" label="Người trả" width="180"></el-table-column>
              <el-table-column prop="money" label="Số tiền"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- Modal sua -->
      <el-dialog title="Cập nhật giao dịch" :visible.sync="innerVisible" width="50%" append-to-body>
        <el-form :model="formUpdate" label-position="right" label-width="100px">
          <div class="row">
            <div class="col-4">
              <el-form-item label="Ví: " :label-width="formLabelWidth">
                <el-select v-model="formUpdate.walletId" placeholder="Chọn ví" :disabled="true">
                  <el-option
                    :label="wallet.displayName"
                    :value="wallet.id"
                    v-for="wallet in walletsList"
                    :key="wallet.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-8">
              <el-form-item label="Chọn nhóm:" :label-width="formLabelWidth">
                <el-dropdown
                  trigger="click"
                  class="col-8 float-left"
                  v-on:command="changeCategoryActionUpdate"
                  @visible-change="onToggleListCategory()"
                >
                  <img
                    :src="formUpdate.categoryDetail.image"
                    alt="icon"
                    style="width:40px; height:40px"
                  />
                  <span
                    style="font-size:1rem"
                    class="ml-2 text-primary font-weight-bold"
                    v-if="formUpdate.categoryDetail.isMoneyAdd"
                  >{{formUpdate.categoryDetail.nameCategory}}</span>
                  <span
                    style="font-size:1rem"
                    class="ml-2 text-danger font-weight-bold"
                    v-else
                  >{{formUpdate.categoryDetail.nameCategory}}</span>
                  <el-dropdown-menu slot="dropdown">
                    <p class="ml-2 text-danger font-weight-bold">Khoản Chi</p>
                    <el-dropdown-item
                      v-for="expense in dataCategoryExpense"
                      :key="expense.id"
                      :command="{idCategory: expense.id,nameCategory: expense.displayName, image: expense.image, isMoneyAdd:expense.isMoneyAdd}"
                      :disabled="true"
                    >
                      <img
                        :src="expense.image"
                        alt="icon"
                        style="width:20px; height:20px"
                        class="mr-2"
                      />
                      <span>{{expense.displayName}}</span>
                    </el-dropdown-item>
                    <p class="ml-2 text-primary font-weight-bold">Khoản Thu</p>
                    <el-dropdown-item
                      v-for="income in dataCategoryIncome"
                      :key="income.id"
                      :command="{idCategory: income.id,nameCategory: income.displayName, image: income.image, isMoneyAdd:income.isMoneyAdd}"
                      :disabled="true"
                    >
                      <img
                        :src="income.image"
                        alt="icon"
                        style="width:20px; height:20px"
                        class="mr-2"
                      />
                      <span>{{income.displayName}}</span>
                    </el-dropdown-item>

                    <p class="ml-2 text-warning font-weight-bold">Vay/Nợ</p>
                    <el-dropdown-item
                      v-for="debt in dataCategoryDebt"
                      :key="debt.id"
                      :command="{idCategory: debt.id,nameCategory: debt.displayName, image: debt.image, isMoneyAdd:debt.isMoneyAdd}"
                      :disabled="true"
                    >
                      <img
                        :src="debt.image"
                        alt="icon"
                        style="width:20px; height:20px"
                        class="mr-2"
                      />
                      <span>{{debt.displayName}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <el-form-item label="Số tiền: " :label-width="formLabelWidth">
                <currency-input
                  v-focus
                  placeholder="Nhập số dư"
                  class="pl-3"
                  v-model="formUpdate.money"
                  currency="VND"
                  locale="vi"
                  :distraction-free="false"
                  :disabled="disableInputMoney"
                />
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="Với" :label-width="formLabelWidth">
                <el-input type="text" placeholder="Với một ai đó" v-model="formUpdate.contact"></el-input>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="Ngày" :label-width="formLabelWidth">
                <el-date-picker
                  type="date"
                  placeholder="Chọn ngày"
                  v-model="formUpdate.date"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="col-row">
            <el-form-item label="Ghi chú: " :label-width="formLabelWidth">
              <el-input type="textarea" v-model="formUpdate.description"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">Hủy</el-button>
          <el-button type="success" v-on:click="updateTransaction">Lưu</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteCurrentTransaction(currentTransaction.id)">Xóa</el-button>
        <el-button type="success" @click="openUpdateTransaction()">Sửa</el-button>
      </span>
    </el-dialog>
    <!-- Modal sua -->
  </div>
</template>
<script>
import ListItemTransaction from "../components/ListItemTransaction.vue";
import config from "../config/config.js";

import { mapGetters, mapActions } from "vuex";
import { log } from "util";

export default {
  name: "transaction",
  components: {
    ListItemTransaction
  },
  created() {},
  mounted() {
    this.$store.dispatch("retrieveTransactionsDebt", this.walletIdTest2);
    this.$store.dispatch("retrieveCategories", this.walletIdTest2);
    this.$store.dispatch("retrieveWallets");
  },
  data() {
    return {
      walletIdTest2: this.$store.state.transactions.walletId,
      activeMonth: "currentMonth",
      transactionDetail: {
        name: "An uong"
      },
      scrollDialog: false,
      cashBackInput: false,
      cashBackMoney: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      innerVisible: false,
      currentTransaction: {},
      timeOfTransaction: null,
      nameCategoryCurrent: "Ăn uống",
      imageCategoryCurrent: "/images/an_uong.png",
      isMoneyAddCurrent: false,
      formUpdate: {
        id: "",
        categoryDetail: {
          idCategory: "",
          nameCategory: "",
          image: "",
          isMoneyAdd: ""
        },
        walletId: this.$store.state.transactions.walletId,
        money: 0,
        date: "",
        contact: "",
        description: ""
      },
      formLabelWidth: "120px",
      tableListCashBack: false,
      toogleListCategory: false,
      diabledCategory: false,
      disableInputMoney: false
    };
  },
  computed: {
    ...mapGetters({
      dataCategoryIncome: "getCategoryIncome",
      dataCategoryExpense: "getCategoryExpense",
      dataCategoryDebt: "getCategoryDebt",
      dataTransactionDebt: "getTransactionDebt",
      dataDebtCollection: "getDataDebtCollection",
      dataRepayment: "getDataRepayment"
    }),
    percentDebt() {
      let moneyPaid = this.currentTransaction.moneyPaid;
      let moneyInt = this.currentTransaction.moneyInt;
      return moneyPaid >= moneyInt ? 100 : (moneyPaid / moneyInt) * 100;
    },
    walletsList() {
      return this.$store.state.auth.walletsList;
    }
  },
  methods: {
    ...mapActions({
      actionUpdateTransaction: "actionUpdateTransaction",
      actionRemoveTransaction: "actionRemoveTransaction",
      actionCashBackMoney: "actionCashBackMoney",
      actionGetTransactionDebt: "actionGetTransactionDebt"
    }),
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onToggleListCategory() {
      this.toogleListCategory = !this.toogleListCategory;
    },
    updateTransaction() {
      console.log("update", this.formUpdate);
      if (!this.formUpdate.categoryDetail) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Bạn chưa chọn nhóm giao dịch",
          offset: 100
        });
        return;
      } else if (this.formUpdate.money == "" || this.formUpdate.money < 0) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Số tiền nhập vào không đúng",
          offset: 100
        });
        return;
      }
      this.actionUpdateTransaction(this.formUpdate);
      this.innerVisible = false;
      this.dialogVisible = false;
      this.$notify.success({
        title: "Thành công !",
        message: "Cập nhật giao dịch thành công ",
        offset: 100
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    deleteCurrentTransaction(idTransaction) {
      this.$notify.success({
        title: "Thành công !",
        message: "Xóa giao dịch thành công ... ",
        offset: 100
      });
      this.actionRemoveTransaction(idTransaction);
      this.dialogVisible = false;
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    openDetailTransaction(item) {
      this.cashBackInput = false;
      this.tableListCashBack = false;
      this.currentTransaction = item.transaction;
      this.timeOfTransaction = item.timeOfTransaction;
      this.dialogVisible = true;
    },
    changeCategoryActionAdd(value) {
      this.formAddNew.categoryDetail = value;
      this.nameCategoryCurrent = value.nameCategory;
      this.imageCategoryCurrent = value.image;
      this.isMoneyAddCurrent = value.isMoneyAdd;
    },
    changeCategoryActionUpdate(value) {
      this.formUpdate.categoryDetail = value;
    },
    openUpdateTransaction() {
      this.innerVisible = true;
      this.formUpdate.id = this.currentTransaction.id;
      this.formUpdate.walletId = this.currentTransaction.walletId;
      this.formUpdate.categoryDetail.idCategory = this.currentTransaction.idCategory;
      this.formUpdate.categoryDetail.nameCategory = this.currentTransaction.name;
      this.formUpdate.categoryDetail.image = this.currentTransaction.image;
      this.formUpdate.categoryDetail.isMoneyAdd = this.currentTransaction.isMoneyAdd;
      this.formUpdate.money = this.currentTransaction.moneyInt;
      this.formUpdate.date = this.currentTransaction.createdAt;
      this.formUpdate.contact = this.currentTransaction.relatedUserName;
      this.formUpdate.description = this.currentTransaction.description;

      let nameTemp = this.currentTransaction.name;
      if (
        nameTemp == config.repaymentName ||
        nameTemp == config.debtCollectionName ||
        nameTemp == config.loanName ||
        nameTemp == config.borrowName
      ) {
        this.diabledCategory = true;
        this.disableInputMoney = true;
      } else {
        this.diabledCategory = false;
        this.disableInputMoney = false;
      }
    },
    cashBack() {
      this.tableListCashBack = false;
      this.cashBackInput = !this.cashBackInput;
    },
    tableListCashBackOnclick(idTransactionParent) {
      this.tableListCashBack = !this.tableListCashBack;
      this.cashBackInput = false;
      this.actionGetTransactionDebt(idTransactionParent);
    },
    cashBackAction(currentTransaction) {
      if (this.cashBackMoney > currentTransaction.moneyRemain) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Số tiền trả lại không hợp lệ",
          offset: 100
        });
        return;
      }
      if (!this.cashBackMoney) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Số tiền trả lại không hợp lệ",
          offset: 100
        });
        return;
      }
      this.actionCashBackMoney({
        currentTransaction,
        cashBackMoney: this.cashBackMoney
      });
      this.cashBackMoney = 0;
      this.$notify.success({
        title: "Thành công !",
        message: "Tạo giao dịch thành công !",
        offset: 100
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    receiveDataTransaction() {},
    convertCurrency(money) {
      let monyeFormart = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND"
      }).format(money);
      return monyeFormart;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  max-width: 650px;
  margin: 0 auto;
}
.transaction-display {
  text-align: center !important;
  .item-transaction {
    margin-top: 20px;
  }
}
.tag {
  background: #f25a5a;
  border-radius: 15px;
  font-size: 10px;
  color: white;
  font-weight: bold;
}
.content-icon {
  width: 80px;
  height: 80px;
}
</style>