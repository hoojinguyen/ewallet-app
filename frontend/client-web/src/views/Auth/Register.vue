<template>
  <b-container class="form-login mt-5">
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
          <b-alert show dismissible variant="danger" v-if="error">Thông tin tài khoản không hợp lệ !</b-alert>
        </div>

        <b-form class="form-test" @submit.prevent="onRegister">
          <b-form-group id="input-group-username" label="Tên tài khoản:" label-for="input-username">
            <b-form-input
              id="input-username"
              v-model="form.username"
              type="text"
              autocomplete="off"
              required
              placeholder="Nhập tên tài khoản"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-displayName" label="Tên hiển thị:" label-for="input-displayName">
            <b-form-input
              id="input-displayName"
              v-model="form.displayName"
              type="text"
              required
              placeholder="Nhập tên hiển thị"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-password"
            label="Mật khẩu:"
            label-for="input-password"
            description="Tối thiệu 8 kí tự"
          >
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              required
              placeholder="Nhập mật khẩu"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-rePassword"
            label="Nhập lại mật khẩu:"
            label-for="input-rePassword"
          >
            <b-form-input
              id="input-rePassword"
              v-model="form.rePassword"
              type="password"
              required
              placeholder="Nhập lại mật khẩu"
            ></b-form-input>
          </b-form-group>

          <div class="mt-3">
            <b-button type="submit" class="btnLogin" variant="success">Đăng ký</b-button>
          </div>
        </b-form>
        <div class="choosen-register mt-4 text-center">
          Bạn đã có tài khảon?
          <b-link href="/login">Đăng nhập ngay</b-link>
        </div>
      </b-col>
      <b-col cols="0" sm="1" md="2" lg="3"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        displayName: "",
        username: "",
        password: "",
        rePassword: ""
      }
    };
  },
  computed: {
    error: {
      get() {
        return this.$store.getters.getError;
      },
      set(value) {
        this.$store.commit("setError", value);
      }
    },
    isLogin() {
   return this.$store.state.auth.loggedIn;
    },
    isLoading() {
       return this.$store.state.auth.loading;
    }
  },
  watch: {
    isLogin(value) {
      console.log("watch");
      if (value) {
        this.$router.push("/createwallet");
      } else {
        this.$router.push("/register");
      }
    }
  },
  methods: {
    onRegister() {
      if (this.form.password !== this.form.rePassword) {
        this.error = "Mật khẩu không đúng, Vui lòng nhập lại!";
      } else {
        this.error = null;
        this.$store.dispatch("actionRegister", {
            displayName: this.form.displayName,
            password: this.form.password,
            username: this.form.username,
          })
      }
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