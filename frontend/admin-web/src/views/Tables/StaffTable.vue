<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" @click="$emit('openModal')" size="sm">Add new</base-button>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="staffList">
        <template slot="columns">
          <th>#</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Status</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <td>
            {{row.id}}
          </td>
          <td>
            {{row.username}}
          </td>
          <td>
            {{row.displayName}}
          </td>
          <td>
            {{row.role}}
          </td>
          <td>
            {{row.status}}
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a v-if="row.status === 'active'" @click.prevent="updateStatus(row.id, 'locked')" class="dropdown-item" href="#">Lock</a>
                <a v-else @click.prevent="updateStatus(row.id, 'active')" class="dropdown-item" href="#">Active</a>
                <a  class="dropdown-item" @click.prevent="deleteUser(row.id)" href="#">Delete</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>
    <div v-if="loadData" style = "display:none">{{fetch(currentPage)}}</div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :value = "currentPage" @changePage="changePage" :total = "total" :perPage="pageSize"></base-pagination>
    </div>

  </div>
</template>
<script>


  import RepositoryFactory from '../../repository/RepositoryFactory';

  const userRepository = RepositoryFactory.get('users');

  export default {
    name: 'staff-table',
    props: {
      loadData: Boolean,
      type:String,
      title: String,
    },

    created() {
      this.fetch(1);
    },

    computed: {

    },

    methods: {
      async fetch(pageIndex) {

        const { data } = await userRepository.getStaff(pageIndex);

        this.staffList = data.items;
        this.total = data.total
      },

      async updateStatus(id, status) {

        const dataUpdate = {
          "id": id,
          "status": status,
        }
        const { data } = await userRepository.update(dataUpdate);
        if (data.hasData) {
          this.fetch(this.currentPage);
        }
      },
      async deleteUser(userId){
        const { data } = await userRepository.delete(userId);
          if (data.hasData) {
          this.fetch(this.currentPage);
        }
      },
        async changePage(pageIndex) {
        this.fetch(pageIndex)
        this.currentPage = pageIndex;
      }


    },

    data() {
      return {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        staffList: []
      }
    },

  }
</script>
<style>
</style>
