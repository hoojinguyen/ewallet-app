<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">

                    <div class="card-body px-lg-5 py-lg-5">
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.username">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button @click = "login" type="primary" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
</template>
<script>
    import RepositoryFactory from '../repository/RepositoryFactory';

    const userRepository = RepositoryFactory.get('users');

    export default {
        name: 'login',

        methods:{
            async login() {
                const { data } = await userRepository.login(this.model).catch(() => {
                    alert("Username or password is incorrect !")
                    return;
                });
                this.authData = data
                if(this.authData.token){
                    this.setToken();
                    this.$router.push("/dashboard", {param: {test: 1}})
                } 
            },
            setToken() {
                localStorage.token = this.authData.token;
                localStorage.userRole = this.authData.role;
                localStorage.userDisplayName = this.authData.displayName;
                localStorage.firstRefresh = true;
            },

        },
        data() {
            return {
                authData: '',
                model: {
                    username: '',
                    password: ''
                }
            }
        }
  }
</script>
<style>
    .my-4 {
        margin-bottom: 0!important;
    }
</style>
