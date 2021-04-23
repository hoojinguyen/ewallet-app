<template>
  <div class="wrap-home">
    <div class="home">
      <router-link to="/transaction" class="box box--transaction" tag="div">Sổ giao dịch</router-link>
      <router-link to="/bookDebt" class="box box--transactionDebt" tag="div">Sổ nợ</router-link>
      <router-link to="/category" class="box box--category" tag="div">Nhóm danh mục</router-link>
      <router-link to="/report" class="box box--report" tag="div">Báo cáo - Thống kê</router-link>
      <router-link to="/wallet" class="box box--wallet" tag="div">Ví của tôi</router-link>
      <span
        @click="dialogVisibleMyAccount = true"
        class="box box--account"
        tag="div"
      >Tài khoản của tôi</span>
      <router-link to="/createwallet" class="box box--new" tag="div">Tạo ví mới</router-link>
    </div>
    <!-- Dialog Tai khoan cua toi -->
    <el-dialog
      title="Tài khoản của tôi"
      :visible.sync="dialogVisibleMyAccount"
      width="40%"
      center
      v-if="isLogin"
    >
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="row">
            <div class="col-2">
              <img src="/images/avatar_user.png" alt />
            </div>
            <div class="col-8 ml-4">
              <div class="mt-0">
                <span>Tên hiển thị:</span>
                <strong class="pl-2">{{user ? user.displayName : ''}}</strong>
              </div>
              <div class="mt-2">
                <span>Số dư ví hiện tại:</span>
                <strong class="pl-2 text-uppercase">{{accountBalance}}</strong>
              </div>
              <div class="mt-2">
                <span>Tổng tiền tất cả các ví:</span>
                <strong class="pl-2 text-uppercase">{{totalAccountBalance}}</strong>
              </div>
              <div class="mt-2">
                <span>Trạng thái:</span>
                <strong class="pl-2 text-uppercase">{{user ? user.status : ''}}</strong>
              </div>
              <div class="mt-2">
                <span>Ngày khởi tạo:</span>
                <strong class="pl-2">{{user ? user.createdAt : ''}}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2"></div>

        <!-- Dialog reset password  -->
        <el-dialog
          width="30%"
          title="Đổi mật khẩu"
          :visible.sync="resetPasswordVisible"
          append-to-body
        >
          <el-input placeholder="Nhập mật khẩu cũ" v-model="passwordOld" clearable></el-input>
          <el-input placeholder="Nhập mật khẩu mới" v-model="passwordNew" class="mt-3" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetPasswordVisible = false">Hủy</el-button>
            <el-button type="success" @click="actionResetPassword">Xác nhận</el-button>
          </span>
        </el-dialog>
        <!-- Dialog reset password  -->
        <!-- Dialog update profile  -->
        <el-dialog
          width="30%"
          title="Cập nhật tài khoản"
          :visible.sync="updateProfileVisible"
          append-to-body
        >
          <b-form-group id="input-group-1" label="Tên tài khoản:" label-for="input-displayName">
            <b-form-input
              id="input-displayName"
              v-model="userNameUpdate"
              type="text"
              required
              placeholder="Nhập tên tài khoản"
            ></b-form-input>
          </b-form-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateProfileVisible = false">Hủy</el-button>
            <el-button type="success" @click="actionUpdateProfile">Lưu</el-button>
          </span>
        </el-dialog>
        <!-- Dialog update profile  -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onUpdateProfile" round>Cập nhật thông tin</el-button>
        <el-button type="warning" @click="onResetPassword" round>Đổi mật khẩu</el-button>
        <el-button type="danger" @click="onLogout" round>Đăng xuất</el-button>
      </span>
    </el-dialog>
    <!-- Dialog Tai khoan cua toi -->
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      dialogVisibleMyAccount: false,
      updateProfileVisible: false,
      resetPasswordVisible: false,
      passwordOld: "",
      passwordNew: "",
      resetPasswordError: "",
      userNameUpdate: this.$store.state.auth.user.displayName
    };
  },
  mounted() {
    this.$store.dispatch("retrieveWallets");
    let refresh = localStorage.getItem("refresh");
    if (refresh === null) {
      console.log("refresh lai");
      location.reload();
      localStorage.setItem("refresh", "1");
    }
  },
  computed: {
    accountBalance() {
      return this.$store.getters.getAccountBalance;
    },
    totalAccountBalance() {
      return this.$store.getters.getTotalAccountBalance;
    },
    isLogin() {
      return this.$store.state.auth.loggedIn;
    },
    hasWallet() {
      return this.$store.state.auth.hasWallet;
    },
    username() {
      return this.$store.state.auth.username;
    },
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    onLogout() {
      this.dialogVisibleMyAccount = false;
      this.$store.dispatch("actionLogout");
      this.$router.push("/login");
    },
    onUpdateProfile() {
      this.updateProfileVisible = true;
    },
    onResetPassword() {
      this.resetPasswordVisible = true;
    },
    actionUpdateProfile() {
      if (this.userNameUpdate.length <= 0) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Tên tài khoản không hợp lệ!",
          offset: 100
        });
        return;
      }
      this.$store.dispatch("actionUpdateProfile", {
        displayName: this.userNameUpdate
      });
      this.$notify.success({
        title: "Thành công !",
        message: "Thay đổi thông tin thành công ! ",
        offset: 100
      });
      this.updateProfileVisible = false;
      this.dialogVisibleMyAccount = false;
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    actionResetPassword() {
      if (this.passwordNew == this.passwordOld) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Mật khẩu mới không được trùng mật khẩu cũ",
          offset: 100
        });
        return;
      }
      if (this.passwordNew.length < 5) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Mật khẩu mới không được nhỏ hơn 5 kí tự",
          offset: 100
        });
        return;
      }
      this.$store
        .dispatch("actionResetPassword", {
          passwordOld: this.passwordOld,
          passwordNew: this.passwordNew
        })
        .then(res => {
          this.$notify.success({
            title: "Thành công !",
            message: "Thay đổi mật khẩu thành công ! ",
            offset: 100
          });
          this.resetPasswordVisible = false;
          this.passwordNew = "";
          this.passwordOld = "";
          return;
        })
        .catch(err => {
          this.$notify.error({
            title: "Lỗi !!!",
            message: "Mật khẩu hiện tại không chính xác",
            offset: 100
          });
          return;
        });
    },
    convertCurrency(amount) {
      let moneyFormat = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND"
      }).format(amount);
      return moneyFormat;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap-home {
  margin-top: -25px;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fafafa;
}
.home {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 55px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.box {
  width: 180px;
  height: 180px;
  padding: 20px;
  margin: 0 10px;
  margin-bottom: 20px;
  border-radius: 30px;
  transition: all 0.5s;
  cursor: pointer;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 70px;
  background-position: 90% 90%;
  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
  }
  &--transaction {
    background-color: #378fec;
    background-image: url("/images/transaction.png");
  }
  &--transactionDebt {
    background-color: #c72c41;
    background-image: url("/images/transactionDebt2.png");
  }
  &--category {
    background-color: #22b644;
    background-image: url("/images/category.png");
  }
  &--report {
    background-color: #f89a2f;
    background-image: url("/images/report.png");
  }
  &--wallet {
    background-color: #e64172;
    background-image: url("/images/wallet.png");
  }
  &--account {
    background-color: #20c997;
    background-image: url("/images/account-home.png");
  }
  &--new {
    background-color: #6f42c1;
    background-image: url("/images/new-wallet-home.png");
  }
}
</style>
