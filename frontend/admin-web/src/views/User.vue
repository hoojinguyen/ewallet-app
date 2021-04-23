<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <user-table @viewDetails = "viewUserDetails" title="User List"></user-table>
                </div>
            </div>
            <div class="row mt-5">
            </div>
        </div>

        <Modal @close = "closeModal" :show = "isModalShow">
            <template slot ="header">
                <strong>User Details</strong> 
            </template>

            <div class="container">
                <dl class = "row">
                    <dt class="col-sm-3">Name</dt>
                    <dd class="col-sm-9">{{ userDetails.displayName }}</dd>
                    <dt class="col-sm-3">Username</dt>
                    <dd class="col-sm-9">
                    {{ userDetails.username }}
                    </dd>
                    <dt class="col-sm-3">Status</dt>
                    <dd class="col-sm-9">{{ userDetails.status }}</dd>
                    <dt class="col-sm-3">Wallets</dt>
                    <dd class="col-sm-9">
                        <span v-if="!checkWallets">Chưa có ví</span>
                        <span v-else v-for="wallet in userDetails.wallets" :key="wallet.id"> {{wallet.displayName}}, </span>
                    </dd>
                    <dt v-if="checkWallets" class="col-sm-3">Transactions</dt>
                </dl>
            </div>
            <TransactionDetailsTable v-if="checkWallets" v-for="(wallet) in wallets" :key="wallet.id" :total = wallet.data.total :walletId = wallet.id :title = wallet.title :walletData = wallet.data.items> </TransactionDetailsTable>
        </Modal>

    </div>
</template>
<script>
    import UserTable from './Tables/UserTable'
    import TransactionDetailsTable from './Tables/TransactionDetailsTable'
    import Modal from '../components/Modal'
    import RepositoryFactory from '../repository/RepositoryFactory';

    const userRepository = RepositoryFactory.get('users');
    const transactionRepository = RepositoryFactory.get('transactions');


  export default {
    name: 'tables',
    components: {
      UserTable,
      Modal,
      TransactionDetailsTable
    },
    methods: {
        async viewUserDetails(userId) {
            const { data } = await userRepository.getById(userId);
            this.userDetails = data;

            this.wallets = [];
            await Promise.all(this.userDetails.wallets.map(async element => {
                const { data } = await transactionRepository.getByWalletId(element.id, 5, 1);
                this.wallets.push({data, id: element.id, title: element.displayName})
            }));
            this.isModalShow = true

        },

        closeModal() 
        {
            this.isModalShow = false;
        }
    },

    computed: {
        checkWallets() {
            if (this.userDetails.wallets) {
                return this.userDetails.wallets.length;

            } else {
                return 0;
            }
        }
    },

    data(){
        return {
            total: 0,
            userDetails: {},
            wallets: [],
            isModalShow: false,
        }
    } 
  };
</script>
<style>
    dd {font-weight: 700}
</style>
