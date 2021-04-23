<template>
  <div class="container">
    <h1 class="mt-3 mb-5">Danh sách nhóm giao dịch</h1>
    <div class="list-category text-right mb-3">
      <el-button type="success" class="py-2" round @click="openAddNewCategory">Thêm</el-button>
    </div>

    <!-- Danh sách -->
    <div class="list-category shadow">
      <!-- KHOAN CHI  -->
      <div class="category-title">
        <span>Khoản chi</span>
      </div>
      <div class="categories" v-for="expense in dataCategoryExpense" :key="expense.id">
        <div class="category-parent">
          <div class="category-item" @click="openDetailCategory(expense)">
            <img :src="expense.image" class="category-icon" alt />
            <div class="ml-4">{{ expense.displayName }}</div>
          </div>
        </div>
        <div
          class="category-child"
          v-if="!expense.childrenTransactionTypes || expense.childrenTransactionTypes.length != 0"
        >
          <div
            class="child-item"
            v-for="childExpense in expense.childrenTransactionTypes"
            :key="childExpense.id"
            @click="openDetailCategory(childExpense, expense.transactionGroup)"
          >
            <img :src="childExpense.image" alt="#" class="category-icon" />
            <div class="ml-2">{{ childExpense.displayName }}</div>
          </div>
        </div>
      </div>

      <!-- KHOAN THU -->
      <div class="category-title">
        <span>Khoản thu</span>
      </div>
      <div class="categories" v-for="income in dataCategoryIncome" :key="income.id">
        <div class="category-parent">
          <div class="category-item" @click="openDetailCategory(income)">
            <img :src="income.image" class="category-icon" alt />
            <div class="ml-4">{{ income.displayName }}</div>
          </div>
        </div>
        <div
          class="category-child"
          v-if="!income.childrenTransactionTypes || income.childrenTransactionTypes.length != 0"
        >
          <div
            class="child-item"
            v-for="childIncome in income.childrenTransactionTypes"
            :key="childIncome.id"
            @click="openDetailCategory(childIncome, income.transactionGroup)"
          >
            <img :src="childIncome.image" alt="#" class="category-icon" />
            <div class="ml-2">{{ childIncome.displayName }}</div>
          </div>
        </div>
      </div>

      <!-- VAY/NO  -->
      <div class="category-title">
        <span>VAY / Nợ</span>
      </div>
      <div class="categories" v-for="debt in dataCategoryDebt" :key="debt.id">
        <div class="category-parent">
          <div class="category-item" @click="openDetailCategory(debt)">
            <img :src="debt.image" class="category-icon" alt />
            <div class="ml-4">{{ debt.displayName }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal chi tiết -->
    <el-dialog
      title="Chi tiết về nhóm"
      :visible.sync="dialogVisible"
      width="70%"
      v-if="currentCategory"
    >
      <div class="content">
        <div class="container d-flex align-items-center">
          <!-- <img :src="currentCategory.image" alt="#" class="content-icon" /> -->
          <img :src="currentCategory.image" class="category-icon" alt />
          <div class="ml-4 text-left">
            <h5 class="title mb-2 font-weight-bold">{{ currentCategory.displayName }}</h5>
            <p class="mb-1">{{walletName}}</p>
            <span
              class="tag text-uppercase py-1 px-3"
            >{{ currentCategory.transactionGroup.displayName}}</span>
          </div>
        </div>
      </div>

      <!-- Modal sửa  -->
      <el-dialog width="50%" title="Sửa nhóm" :visible.sync="updateVisible" append-to-body>
        <div class="content container">
          <!-- Radio  -->
          <div class="d-flex">
            <div class="custom-control custom-radio mr-3">
              <input
                v-model="formUpdateCategory.transactionGroup.displayName"
                value="Chi tiêu"
                type="radio"
                id="radioExpense"
                name="customRadio"
                class="custom-control-input"
                :disabled="true"
              />
              <label class="custom-control-label" for="radioExpense">Chi tiêu</label>
            </div>
            <div class="custom-control custom-radio mr-3">
              <input
                v-model="formUpdateCategory.transactionGroup.displayName"
                value="Thu nhập"
                type="radio"
                id="radioIncome"
                name="customRadio"
                class="custom-control-input"
                :disabled="true"
              />
              <label class="custom-control-label" for="radioIncome">Thu nhập</label>
            </div>
          </div>

          <!-- Dropdown image  -->
          <div class="row my-3">
            <el-dropdown trigger="click" class="col-4" @command="chooseIconUpdate">
              <button class="btn el-dropdown-link w-100" style="border: 1px solid rgba(0,0,0,.12);">
                <img :src="formUpdateCategory.image" alt="#" class="img-fluid category-icon" />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(category, i) in listCategories"
                  :key="i"
                  :command="category.image"
                >
                  <img :src="category.image" alt="#" width="30" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="col-8 group">
              <p class="small mb-1">Tên nhóm</p>
              <div class="mb-2">
                <input
                  type="text"
                  placeholder="Tên nhóm"
                  class="input"
                  v-model="formUpdateCategory.displayName"
                />
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-6">
              <p class="text-secondary mb-2">Ví</p>
              <el-select
                placeholder="Select"
                v-model="formUpdateCategory.walletId"
                class="border-0 w-100"
                :disabled="true"
              >
                <el-option
                  :label="wallet.displayName"
                  :value="wallet.id"
                  v-for="wallet in walletsList"
                  :key="wallet.id"
                ></el-option>
              </el-select>
            </div>
            <div class="col-6">
              <p class="text-secondary mb-2">Nhóm cha</p>
              <el-select
                v-model="formUpdateCategory.idParentCategory"
                placeholder="Select"
                class="border-0 w-100"
                :disabled="true"
              >
                <el-option
                  :label="parentCategory.displayName"
                  :value="parentCategory.id"
                  v-for="parentCategory in checkListCategoryParentUpdate"
                  :key="parentCategory.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">Hủy</el-button>
          <el-button type="success" @click="updateCategory()">Lưu</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="deleteCategory(currentCategory.id, currentCategory.transactionGroup.displayName)"
        >Xóa</el-button>
        <el-button type="success" @click="openUpdateCategory()">Sửa</el-button>
      </span>
    </el-dialog>

    <!-- Modal Thêm mới  -->
    <el-dialog width="50%" title="Thêm nhóm mới" :visible.sync="addNewVisible" append-to-body>
      <div class="content container">
        <!-- Radio  -->
        <div class="d-flex">
          <div class="custom-control custom-radio mr-3">
            <input
              v-model="formAddNewCategory.transactionGroup.displayName"
              value="Chi tiêu"
              type="radio"
              id="radioExpense"
              name="customRadio"
              class="custom-control-input"
            />
            <label class="custom-control-label" for="radioExpense">Chi tiêu</label>
          </div>
          <div class="custom-control custom-radio mr-3">
            <input
              v-model="formAddNewCategory.transactionGroup.displayName"
              value="Thu nhập"
              type="radio"
              id="radioIncome"
              name="customRadio"
              class="custom-control-input"
            />
            <label class="custom-control-label" for="radioIncome">Thu nhập</label>
          </div>
        </div>

        <!-- Dropdown image  -->
        <div class="row my-3">
          <el-dropdown trigger="click" class="col-4" @command="chooseIcon">
            <button class="btn el-dropdown-link w-100" style="border: 1px solid rgba(0,0,0,.12);">
              <img :src="currentImage" alt="#" class="img-fluid category-icon" />
              <i class="el-icon-arrow-down el-icon--right"></i>
            </button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(category, i) in listCategories"
                :key="i"
                :command="category.image"
              >
                <img :src="category.image" alt="#" width="30" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="col-8 group">
            <p class="small mb-1">Tên nhóm</p>
            <div class="mb-2">
              <input
                type="text"
                placeholder="Tên nhóm"
                class="input"
                v-model="formAddNewCategory.displayName"
              />
            </div>
          </div>
        </div>

        <div class="row my-3">
          <div class="col-6">
            <p class="text-secondary mb-2">Ví</p>
            <el-select
              placeholder="Select"
              v-model="formAddNewCategory.walletId"
              class="border-0 w-100"
              :disabled="true"
            >
              <el-option
                :label="wallet.displayName"
                :value="wallet.id"
                v-for="wallet in walletsList"
                :key="wallet.id"
              ></el-option>
            </el-select>
          </div>
          <div class="col-6">
            <p class="text-secondary mb-2">Nhóm cha</p>
            <el-select
              v-model="formAddNewCategory.idParentCategory"
              placeholder="Select"
              class="border-0 w-100"
            >
              <el-option
                :label="parentCategory.displayName"
                :value="parentCategory.id"
                v-for="parentCategory in checkListCategoryParent"
                :key="parentCategory.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">Hủy</el-button>
        <el-button type="success" @click="addNewCategory()">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { log } from "util";
import config from "../config/config";

export default {
  data() {
    return {
      listCategories: [
        {
          image: "/images/ban_be_va_nguoi_yeu.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/bao_hiem.png",
          title: "Bảo hiểm",
          child: []
        },
        {
          image: "/images/rut_tien.png",
          title: "Chi phí",
          child: []
        },
        {
          image: "/images/cho_vay.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/con_cai.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/cuoi_hoi.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/duoc_tang.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/hoa_don_gas.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/du_lich.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/hoa_don_dien_thoai.png",
          title: "Bạn bè & người yêu",
          child: []
        },
        {
          image: "/images/giay_dep.png",
          title: "Bạn bè & người yêu",
          child: []
        }
      ],
      formAddNewCategory: {
        id: "12345",
        displayName: "",
        transactionGroup: {
          displayName: "Chi tiêu",
          id: ""
        },
        idParentCategory: undefined,
        image: "/images/an_uong.png",
        isMoneyAdd: null,
        walletId: this.$store.state.transactions.walletId
      },
      formUpdateCategory: {
        id: "",
        displayName: "",
        transactionGroup: {
          displayName: "",
          id: ""
        },
        idParentCategory: undefined,
        image: "/images/an_uong.png",
        isMoneyAdd: null,
        walletId: null
      },
      addNewVisible: false,
      dialogVisible: false,
      currentCategory: null,
      currentImage: "/images/ban_be_va_nguoi_yeu.png",
      innerVisible: false,
      updateVisible: false
    };
  },
  mounted() {
    let walletId = localStorage.getItem("walletId");
    this.$store.dispatch("retrieveCategories", walletId);
    this.$store.dispatch("retrieveWallets");
  },
  computed: {
    ...mapGetters({
      walletName: "getWalletName",
      dataCategoryIncome: "getCategoryIncome",
      dataCategoryExpense: "getCategoryExpense",
      dataCategoryDebt: "getCategoryDebt"
    }),
    walletsList() {
      return this.$store.state.auth.walletsList;
    },
    checkListCategoryParent() {
      if (
        this.formAddNewCategory.transactionGroup.displayName ==
        config.nameGroupExpense
      ) {
        this.formAddNewCategory.transactionGroup.displayName =
          config.nameGroupExpense;
        this.formAddNewCategory.transactionGroup.id = config.idGroupExpense;
        this.formAddNewCategory.isMoneyAdd = true;
        return this.dataCategoryExpense;
      } else {
        this.formAddNewCategory.transactionGroup.displayName =
          config.nameGroupIncome;
        this.formAddNewCategory.transactionGroup.id = config.idGroupIncome;
        this.formAddNewCategory.isMoneyAdd = false;
        return this.dataCategoryIncome;
      }
    },
    checkListCategoryParentUpdate() {
      if (
        this.formUpdateCategory.transactionGroup.displayName ==
        config.nameGroupExpense
      ) {
        this.formUpdateCategory.transactionGroup.displayName =
          config.nameGroupExpense;
        this.formUpdateCategory.transactionGroup.id = config.idGroupExpense;
        this.formUpdateCategory.isMoneyAdd = true;
        return this.dataCategoryExpense;
      } else {
        this.formUpdateCategory.transactionGroup.displayName =
          config.nameGroupIncome;
        this.formUpdateCategory.transactionGroup.id = config.idGroupIncome;
        this.formUpdateCategory.isMoneyAdd = false;
        return this.dataCategoryIncome;
      }
    }
  },
  methods: {
    ...mapActions({
      actionAddNewCategory: "actionAddNewCategory",
      actionUpdateCategory: "actionUpdateCategory",
      actionRemoveCategory: "actionRemoveCategory"
    }),
    openDetailCategory(category, transactionGroup) {
      this.dialogVisible = true;
      this.currentCategory = category;
      console.log(this.currentCategory);
      if (!this.currentCategory.transactionGroup) {
        this.currentCategory.transactionGroup = transactionGroup;
      }
      this.currentImage = category.image;
    },
    openAddNewCategory() {
      this.addNewVisible = true;
    },
    openUpdateCategory() {
      this.updateVisible = true;
      this.formUpdateCategory.id = this.currentCategory.id;
      this.formUpdateCategory.displayName = this.currentCategory.displayName;
      this.formUpdateCategory.idParentCategory = this.currentCategory.parentTransactionTypeId;
      this.formUpdateCategory.image = this.currentCategory.image;
      this.formUpdateCategory.isMoneyAdd = this.currentCategory.isMoneyAdd;
      this.formUpdateCategory.walletId = this.$store.state.transactions.walletId;
      this.formUpdateCategory.transactionGroup.displayName = this.currentCategory.transactionGroup.displayName;
      this.formUpdateCategory.transactionGroup.id = this.currentCategory.transactionGroup.id;
    },
    addNewCategory() {
      if (this.formAddNewCategory.displayName == "") {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Bạn chưa nhập tên nhóm",
          offset: 100
        });
        return;
      } else if (!this.formAddNewCategory.walletId) {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Chưa chọn ví.",
          offset: 100
        });
        return;
      }
      this.actionAddNewCategory(this.formAddNewCategory);

      this.addNewVisible = false;
      this.$notify.success({
        title: "Thành công !",
        message: "Thêm nhóm thành công ",
        offset: 100
      });
    },
    deleteCategory(idCategory, transactionGroup) {
      this.$notify.success({
        title: "Thành công !",
        message: "Xóa danh mục thành công ... ",
        offset: 100
      });
      this.actionRemoveCategory({ idCategory, transactionGroup });
      this.dialogVisible = false;
    },
    updateCategory() {
      if (this.formUpdateCategory.displayName == "") {
        this.$notify.error({
          title: "Lỗi !!!",
          message: "Tên nhóm không hợp lệ",
          offset: 100
        });
        return;
      }
      this.actionUpdateCategory(this.formUpdateCategory);
      this.updateVisible = false;
      this.$notify.success({
        title: "Thành công !",
        message: "Cập nhật nhóm danh mục thành công ",
        offset: 100
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    changeImage(image) {
      this.currentImage = image;
      console.log(image);
    },
    chooseIcon(image) {
      this.formAddNewCategory.image = image;
      this.currentImage = image;
    },
    chooseIconUpdate(image) {
      console.log("image", image);
      this.formUpdateCategory.image = image;
      this.currentImage = image;
    }
  }
};
</script>

<style lang="css" scoped>
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
  width: 40px;
  height: 40px;
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
  padding: 8px 16px;
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
