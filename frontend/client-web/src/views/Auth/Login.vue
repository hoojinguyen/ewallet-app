<template>
  <b-container
    class="form-login mt-5"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <div class="row">
      <div class="col-12 text-center">
        <img src="/images/avatar_wallet.png" alt />
      </div>
      <div class="col-12 text-center mt-3">
        <p style="font-weight:bold; font-size:1.8rem">eWallet - Quản lí ví tiền</p>
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
          <b-alert show dismissible variant="danger" v-if="error">{{nameError}}</b-alert>
        </div>

        <b-form class="form-test" @submit.prevent="onLogin">
          <b-form-group id="input-group-1" label="Tên tài khoản:" label-for="input-displayName">
            <b-form-input
              id="input-displayName"
              v-model="form.displayName"
              type="text"
              required
              placeholder="Nhập tên tài khoản"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-password" label="Mật khẩu:" label-for="input-password">
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              required
              placeholder="Nhập mật khẩu"
            ></b-form-input>
          </b-form-group>

          <div class="mt-2 row">
            <div class="col-6">
              <b-form-checkbox
                id="checkbox-remember"
                v-model="form.remeber"
                name="checkbox-remember"
                value="accepted"
                unchecked-value="not_accepted"
              >Ghi nhớ mật khẩu</b-form-checkbox>
            </div>
            <div class="col-6">
              <b-link class="float-right">Quên mật khẩu?</b-link>
            </div>
          </div>

          <div class="mt-3">
            <b-button type="submit" class="btnLogin" variant="success">Đăng nhập</b-button>
          </div>
        </b-form>
        <div class="choosen-register mt-4 text-center">
          Bạn chưa có tài khoản?
          <b-link href="/register">Đăng kí ngay</b-link>
        </div>
      </b-col>
      <b-col cols="0" sm="1" md="2" lg="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      form: {
        displayName: "",
        name: "",
        remember: ""
      },
      fullscreenLoading: true
    };
  },
  mounted() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 1000);
  },
  computed: {
    error() {
      console.log("error:", this.$store.state.auth.error);
      return this.$store.state.auth.error;
    },
    nameError() {
      console.log("error:", this.$store.state.auth.nameError);
      return this.$store.state.auth.nameError;
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
    },
    userActive() {
      console.log("Has wallet: ", this.$store.state.auth.userActive);
      return this.$store.state.auth.userActive;
    }
  },
  watch: {
    isLogin(value) {
      console.log("watch");
      if (value === true) {
        if (this.hasWallet) {
          this.$router.push("/");
        } else {
          this.$router.push("/createwallet");
        }
      } else {
        this.$router.push("/login");
      }
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch("actionLogin", {
        displayName: this.form.displayName,
        password: this.form.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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