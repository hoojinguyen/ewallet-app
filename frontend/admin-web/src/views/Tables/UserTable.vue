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
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="userList">
        <template slot="columns">
          <th>#</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Status</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.id}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.username}}
          </td>
          <td>
            {{row.displayName}}
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
                <a  class="dropdown-item" @click.prevent="viewDetails(row.id)" href="#">View Details</a>

              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>
    <div v-if="loadData" style = "display:none">{{fetch()}}</div>

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
    name: 'user-table',
    props: {
      loadData: Boolean,
      type:String,
      title: String,
    },

    created() {
      this.fetch(1);
    },

    methods: {
      async fetch(pageIndex) {
        const { data } = await userRepository.getUser(pageIndex);
        this.userList = data.items;
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
      },

      async viewDetails(userId) {
        this.$emit("viewDetails",userId)
      } 


    },

    data() {
      return {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        userList: []
      }
    },

  }
</script>
<style>
</style>
