<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <staff-table :loadData="loadData" @openModal = "openModal" title="Staff List"></staff-table>
                </div>
            </div>
            <div class="row mt-5">
            </div>

        </div>

        <UserModal  @closeModal = "closeModal" :show = "isModalShow">
            <template slot= header>
                <strong>Thêm User</strong>
            </template>
            <form>
                <BaseInput @input = "getData" name = "displayName" placeholder = "Nguyễn Văn A" label="Họ tên">
                </BaseInput>
                <BaseInput @input = "getData" name = "username" placeholder = "nguyenvana" label="Tên đăng nhập"> 
                </BaseInput>
                <BaseInput @input = "getData" name = "password" placeholder = "**********" type = "password" label="Mật khẩu">
                </BaseInput>
                <div class=  "form-group">
                <label class ="form-control-label">Vai trò</label>
                <select v-model="newUserData.role"  class = "form-control" style = "color: #8898aa; width: 100%; height: calc(1.5em + 1.25rem + 2px); border-radius: 0.375rem; padding-left: 10px; border: 1px solid #cad1d7;font-size: 0.875rem;" name="role">
                    <option value="admin">Admin</option>
                    <option value="supervisor">Supervisor</option>
                </select>
                </div>

                <div style = "height: 30px"></div>

                <BaseButton @click = "saveUser" block>
                    Tạo người dùng
                </BaseButton>
            </form>
        </UserModal>

    </div>
</template>
<script>
  import StaffTable from './Tables/StaffTable'
  import UserModal from '../components/UserModal'
  import BaseInput from '../components/BaseInput'
  import BaseButton from '../components/BaseButton'
  
  import RepositoryFactory from '../repository/RepositoryFactory';

  const userRepository = RepositoryFactory.get('users');

  export default {
    name: 'tables',
    components: {
      StaffTable,
      UserModal,
      BaseInput,
      BaseButton,

    },
    methods: {
        openModal() {
            this.isModalShow = true;
        },
        closeModal() {
            this.isModalShow = false;
        },
        saveUser() {
            userRepository.create(this.newUserData).then((response) => {
                if(response.data.hasData) {
                    alert("Tạo user thành công !");
                    this.loadData = true;
                    this.isModalShow = false;
                }
            })
        },
        getData(value, name) {
            this.newUserData[name] = value
        }
    },
    data() {
        return {
            loadData: false,
            isModalShow: false,
            newUserData: {
                displayName: "",
                username: "",
                password: "",
                role: "admin",
                status: "active"
            }

        }
    }
  };
</script>
<style></style>
