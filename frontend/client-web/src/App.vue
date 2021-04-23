<template>
  <div
    id="app"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div id="nav" class="fixed-top">
      <li class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <router-link to="/" class="navbar-brand" v-if="isLogin && hasWallet">Trang chủ</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link
                v-if="isLogin && hasWallet"
                to="/transaction"
                class="nav-link"
                active-class="active"
              >Sổ giao dịch</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLogin && hasWallet"
                to="/bookDebt"
                class="nav-link"
                active-class="active"
              >Sổ nợ</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLogin && hasWallet"
                to="/category"
                class="nav-link"
                active-class="active"
              >Nhóm danh mục</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLogin && hasWallet"
                to="/report"
                class="nav-link"
                active-class="active"
              >Báo cáo - Thống kê</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLogin && hasWallet"
                to="/wallet"
                class="nav-link"
                active-class="active"
              >Ví của tôi</router-link>
            </li>
            <li class="nav-item" @click="dialogVisibleMyAccount = true" v-if="isLogin">
              <!-- <router-link
                v-if="isLogin"
                to="/account"
                class="nav-link"
                active-class="active"
              >Tài khoản của tôi</router-link>-->
              <span class="nav-link pt-2">Tài khoản của tôi</span>
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLogin && !hasWallet"
                to="/createwallet"
                class="nav-link"
                active-class="active"
              >Tạo ví mới</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="!isLogin"
                to="/login"
                class="nav-link"
                active-class="active"
              >Đăng nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="!isLogin"
                to="/register"
                class="nav-link"
                active-class="active"
              >Đăng ký</router-link>
            </li>
          </ul>

          <ul class="navbar-nav" v-if="isLogin && hasWallet">
            <li class="nav-item d-flex align-items-center mr-2">
              <div class="dropdown text-light">
                <span
                  class="dropdown-toggle"
                  id="dropdownListWallet"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img :src="iconWalletCurrent" alt="#" width="35" class="mr-1" />
                  {{nameWalletCurrent}}
                </span>
                <div class="dropdown-menu" aria-labelledby="dropdownListWallet">
                  <h6 class="dropdown-header">Danh sách ví</h6>
                  <div class="dropdown-divider"></div>
                  <div
                    class="dropdown-item"
                    v-for="wallet in walletsList"
                    :key="wallet.id"
                    v-on:click="actionChangeWallet(wallet)"
                  >
                    <img
                      :src="wallet.image ? wallet.image : iconWalletDefault"
                      alt
                      style="max-width:40px; max-heigth:40px"
                      class="mr-2"
                    />
                    <span>{{wallet.displayName}}</span> -
                    <span
                      class="pl-2 font-italic text-black-50"
                    >{{convertCurrency(wallet.accountBalance)}}</span>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <h5 class="text-danger pt-2 float-right">
                Số dư:
                <strong class="font-weight-bold">{{accountBalance}}</strong>
              </h5>
            </li>
          </ul>
        </div>
      </li>
    </div>
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view class="mt-5 pt-5" />
    </transition>

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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogVisibleMyAccount: false,
      updateProfileVisible: false,
      resetPasswordVisible: false,
      iconWalletCurrent: this.$store.state.auth.walletIcon,
      iconWalletDefault: "/images/qua_tang_quyen_gop.png",
      nameWalletCurrent: this.$store.state.auth.walletName,
      idWalletCurrent: this.$store.state.auth.walletId,
      passwordOld: "",
      passwordNew: "",
      resetPasswordError: "",
      userNameUpdate: this.$store.state.auth.user.displayName
    };
  },
  computed: {
    walletsList() {
      return this.$store.state.auth.walletsList;
    },
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
      return this.$store.state.auth.user.displayName;
    },
    user() {
      return this.$store.state.auth.user;
    }
  },
  watch: {
    isLogin(value) {
      if (!value) {
        this.$router.push("/login", () => {});
      }
    },
    hasWallet(value) {
      if (!value) {
        this.$router.push("/createwallet", () => {});
      } else {
        this.$router.push("/", () => {});
      }
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
    actionChangeWallet(wallet) {
      this.nameWalletCurrent = wallet.displayName;
      this.iconWalletCurrent = wallet.image;
      this.$store.dispatch("actionChangeWallet", wallet);
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        location.reload();
      }, 1000);
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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: 30px;
  a {
    text-decoration: none;
  }
  .nav-item {
    margin-left: 10px;
  }
  .dropdown {
    cursor: pointer;
    .dropdown-menu {
      min-width: 350px;
    }
    .dropdown-header {
      padding: 15px;
      text-align: center;
      font-size: 16px;
    }
    .dropdown-item {
      padding: 20px;
    }
  }
  .active {
    transition: all 0.5s;
    transform: scale(1.05);
    color: #67c23a;
  }
  .btn-logout {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    font-size: 1.2rem;
    padding-top: 5px;
    color: whitesmoke;
  }
}
</style>
