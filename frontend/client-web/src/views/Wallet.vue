<template>
  <div class="container">
    <div class="list-category text-right mb-3">
      <el-button
        type="success"
        class="py-2"
        style="outline:none"
        round
        @click="openAddNewWallet"
      >Thêm</el-button>
    </div>

    <div class="list-category shadow">
      <div class="category-title">
        <span>Danh sách ví</span>
      </div>
      <div class="categories" v-for="wallet in walletsList" :key="wallet.id">
        <div class="category-parent">
          <div class="category-item">
            <img :src="wallet.image" class="category-icon" alt />
            <div class="ml-4" style="width:100%">
              <span
                style="font-size:1.2rem"
                class="font-weight-bold text-black-50 float-left"
              >{{wallet.displayName}}</span>
              <span class="float-right ml-2" @click="actionDeleteWallet(wallet.id)">
                <i class="el-icon-delete" style="color:red"></i>
              </span>
              <span class="float-right ml-4" style="color:orange" @click="openUpdateWallet(wallet)">
                <i class="el-icon-edit"></i>
              </span>
              <span style="font-size:0.9rem" class="text-dark float-right">
                Số dư:
                <strong>{{convertCurrency(wallet.accountBalance)}}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Wallet  -->
    <el-dialog width="50%" title="Cập nhật ví" :visible.sync="updateVisible" append-to-body>
      <div class="content container">
        <div class="row my-3">
          <el-dropdown
            trigger="click"
            class="col-4"
            @command="chooseIconUpdate"
            style="padding-left:0px !important;"
          >
            <button class="btn el-dropdown-link w-100" style="border: 1px solid rgba(0,0,0,.12);">
              <img :src="formUpdateWallet.image" alt="#" class="img-fluid category-icon" />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(icon, i) in icons" :key="i" :command="icon.name">
                <img :src="icon.name" alt="#" width="30" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="col-8 group">
            <p class="small mb-1">Tên Ví</p>
            <div class="mb-2">
              <input
                type="text"
                placeholder="Nhập tên ví"
                class="input"
                v-model="formUpdateWallet.displayName"
              />
            </div>
          </div>
        </div>
        <div class="row my-3">
          <div class="col-12 group" style="padding-left:15px !important;">
            <p class="small mb-1">Số dư khởi tạo</p>
            <div class="mb-2">
              <currency-input
                placeholder="Nhập số dư"
                class="input"
                v-model="formUpdateWallet.balance"
                currency="VND"
                locale="vi"
                :distraction-free="false"
              />
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="actionUpdateWallet">Lưu</el-button>
      </span>
    </el-dialog>

    <!-- Add Wallet  -->
    <el-dialog width="50%" title="Tạo mới ví" :visible.sync="addNewVisible" append-to-body>
      <div class="content container">
        <div class="row my-3">
          <el-dropdown
            trigger="click"
            class="col-4"
            @command="chooseIcon"
            style="padding-left:0px !important;"
          >
            <button class="btn el-dropdown-link w-100" style="border: 1px solid rgba(0,0,0,.12);">
              <img :src="currentIcon" alt="#" class="img-fluid category-icon" />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(icon, i) in icons" :key="i" :command="icon.name">
                <img :src="icon.name" alt="#" width="30" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="col-8 group">
            <p class="small mb-1">Tên Ví</p>
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
            <p class="small mb-1">Số dư khởi tạo</p>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="addNewWallet()">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "createwallet",
  mounted() {
    this.$store.dispatch("retrieveWallets");
  },
  data() {
    return {
      addNewVisible: false,
      updateVisible: false,
      walletCurrent: null,
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
        balance: 0,
        image: "",
        displayName: ""
      },
      formUpdateWallet: {
        id: "",
        balance: "",
        image: "",
        displayName: ""
      },
      currentIcon: "/images/ban_be_va_nguoi_yeu.png"
    };
  },
  computed: {
    walletsList() {
      return this.$store.getters.getWalletsList;
    }
  },

  methods: {
    chooseIcon(icon) {
      this.formAddWallet.image = icon;
      this.currentIcon = icon;
    },
    chooseIconUpdate(icon) {
      this.formUpdateWallet.image = icon;
    },
    openAddNewWallet() {
      this.addNewVisible = true;
    },
    openUpdateWallet(wallet) {
      this.updateVisible = true;
      this.walletCurrent = wallet;
      this.formUpdateWallet.id = wallet.id;
      this.formUpdateWallet.balance = wallet.accountBalance;
      this.formUpdateWallet.image = wallet.image;
      this.formUpdateWallet.displayName = wallet.displayName;
    },
    addNewWallet() {
      if (!this.formAddWallet.displayName) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Tên ví không hợp lệ",
          offset: 100
        });
        return;
      } else if (
        this.formAddWallet.balance == "" ||
        this.formAddWallet.balance < 0
      ) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Số dư nhập vào không hợp lệ",
          offset: 100
        });
        return;
      }
      if (this.formAddWallet.image) {
        console.log("wallet: ", this.formAddWallet);
      } else {
        this.formAddWallet.image = this.currentIcon;
        console.log("wallet2: ", this.formAddWallet);
      }
      this.$store.dispatch("actionAddNewWallet", this.formAddWallet);
      this.addNewVisible = false;
      this.$notify.success({
        title: "Thành công !",
        message: "Tạo ví mới thành công ",
        offset: 100
      });
      location.reload();
    },
    actionDeleteWallet(idWallet) {
      let idWalletLocal = localStorage.getItem("walletId");
      if (idWallet == idWalletLocal) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Không thể xóa ví hiện tại",
          offset: 100
        });
        return;
      }
      this.$store.dispatch("actionDeleteWallet", idWallet);
      this.$notify.success({
        title: "Thành công !",
        message: "Xóa ví thành công ",
        offset: 100
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    actionUpdateWallet() {
      this.$store.dispatch("actionUpdateWallet", this.formUpdateWallet);
      this.$notify.success({
        title: "Thành công !",
        message: "Cập nhật ví thành công ",
        offset: 100
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
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

<style lang='scss' scoped>
.group {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.input {
  border: none;
  outline: none;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #5cb87a;
  background-color: #5cb87a;
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
.child-item {
  border-left: 2px dotted rgba(0, 0, 0, 0.12);
  margin-top: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
}
.category-child {
  margin-left: 35px;
}

.category-icon {
  width: 60px;
  height: 60px;
}
.list-category {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  font-size: 14px;
  background: white;
  overflow: hidden;
  border-radius: 15px;
}
.category-title {
  padding: 8px 16px;
  text-align: left;
  font-size: 12px;
  background: #fafafa;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
}
.category-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 13px 26px;
}
.categories {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
  background-color: #fff;
}

.category-item:hover,
.child-item:hover {
  background: rgba(45, 184, 76, 0.08);
}
</style>
