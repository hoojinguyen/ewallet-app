<template>
  <b-container class="form-login mt-5">
    <div class="row">
      <div class="col-12 text-center">
        <img src="/images/avatar_wallet_group.png" style="width:200px ; height:200px" alt />
      </div>
      <div class="col-12 text-center mt-3">
        <p style="font-weight:bold; font-size:1.8rem">Đầu tiên hãy tạo cho mình một ví tiền</p>
      </div>
    </div>
    <b-row>
      <b-col cols="0" sm="1" md="2" lg="3"></b-col>
      <b-col cols="12" sm="10" md="8" lg="6">
        <div v-show="isLoading" class="mb-3 text-center">
          <b-spinner type="grow" variant="success" label="Loading..."></b-spinner>
          <b-spinner type="grow" variant="danger" label="Loading..."></b-spinner>
          <b-spinner type="grow" variant="warning" label="Loading..."></b-spinner>
          <div class="mt-2">
            <strong>Loading...</strong>
          </div>
        </div>
        <div class="mb-3">
          <b-alert
            show
            dismissible
            variant="danger"
            v-if="error"
          >Tài khoản hoặc mật khẩu không hợp lệ !</b-alert>
        </div>

        <div class="content container form-test">
          <div class="row my-3">
            <el-dropdown
              trigger="click"
              class="col-4"
              @command="chooseIcon"
              style="padding-left:0px !important;"
            >
              <button class="btn el-dropdown-link w-100" style="border: 1px solid rgba(0,0,0,.12);">
                <img :src="currentIcon" alt="#" class="img-fluid category-icon mb-2" />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(icon, i) in icons" :key="i" :command="icon.name">
                  <img :src="icon.name" alt="#" width="30" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="col-8 group">
              <p class="small mb-1 mt-1">Tên Ví</p>
              <div class="mb-2">
                <input
                  type="text"
                  placeholder="Nhập tên ví"
                  class="input"
                  v-model="formAddWallet.displayName"
                />
              </div>
            </div>
          </div>
          <div class="row my-3">
            <div class="col-12 group" style="padding-left:15px !important;">
              <p class="small mb-1 mt-1">Số dư khởi tạo</p>
              <div class="mb-2">
                <currency-input
                  placeholder="Nhập số dư"
                  class="input"
                  v-model="formAddWallet.balance"
                  currency="VND"
                  locale="vi"
                  :distraction-free="false"
                />
              </div>
            </div>
          </div>
          <div class="mt-3">
            <b-button v-on:click="addNewWallet" class="btnLogin" variant="success">Tạo ví</b-button>
          </div>
        </div>
      </b-col>
      <b-col cols="0" sm="1" md="2" lg="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "createwallet",
  data() {
    return {
      icons: [
        {
          name: "/images/ban_be_va_nguoi_yeu.png"
        },
        {
          name: "/images/bao_hiem.png"
        },
        {
          name: "/images/rut_tien.png"
        },
        {
          name: "/images/cho_vay.png"
        },
        {
          name: "/images/con_cai.png"
        },
        {
          name: "/images/cuoi_hoi.png"
        },
        {
          name: "/images/duoc_tang.png"
        },
        {
          name: "/images/hoa_don_gas.png"
        },
        {
          name: "/images/du_lich.png"
        },
        {
          name: "/images/hoa_don_dien_thoai.png"
        },
        {
          name: "/images/giay_dep.png"
        }
      ],
      formAddWallet: {
        userId: this.$store.state.auth.userId,
        balance: "",
        image: "",
        displayName: ""
      },
      currentIcon: "/images/phu_kien.png"
    };
  },
  computed: {
    error() {
      console.log("error:", this.$store.state.auth.error);
      return this.$store.state.auth.error;
    },
    isLogin() {
      console.log("isLogin:", this.$store.state.auth.loggedIn);
      return this.$store.state.auth.loggedIn;
    },
    isLoading() {
      console.log("isLoading:", this.$store.state.auth.loading);
      return this.$store.state.auth.loading;
    },
    hasWallet() {
      console.log("Has wallet: ", this.$store.state.auth.hasWallet);
      return this.$store.state.auth.hasWallet;
    }
  },
  watch: {
    isLogin(value) {
      console.log("watch");
      if (value === true) {
        if (this.hasWallet) {
          this.$router.push("/");
          location.reload();
        } else {
          this.$router.push("/createwallet");
        }
      } else {
        this.$router.push("/login");
      }
    }
  },
  methods: {
    chooseIcon(icon) {
      this.formAddWallet.image = icon;
      this.currentIcon = icon;
    },
    addNewWallet() {
      if (this.formAddWallet.image) {
        console.log("wallet: ", this.formAddWallet);
      } else {
        this.formAddWallet.image = this.currentIcon;
        console.log("wallet2: ", this.formAddWallet);
      }

      this.$store.dispatch("actionAddNewWallet", this.formAddWallet);
    }
  }
};
</script>

<style lang='scss' scoped>
.group {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.input {
  border: none;
  outline: none;
}
.content-icon {
  width: 80px;
  height: 80px;
}
.category-icon {
  width: 40px;
  height: 40px;
}
.form-login {
  text-align: left;
  .form-test {
    border: 1px solid #eae9e9;
    border-radius: 20px;
    padding: 30px;
  }
}
.btnLogin {
  width: 100%;
}
</style>
