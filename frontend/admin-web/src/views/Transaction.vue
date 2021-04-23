<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <transaction-table title="Transaction List"></transaction-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import TransactionTable from './Tables/TransactionTable'
  export default {
    name: 'tables',
    components: {
      TransactionTable
    }
  };
</script>
<style></style>
