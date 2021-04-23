import Repository from './repository'

const resource = "/transactions";

export default {
    get(pageSize = 10, pageIndex) {

        const param = `?sortBy=createdAt&sortType=desc&relations=wallet.user&relations=transactionType&pageSize=${pageSize}&pageIndex=${pageIndex}`
        return Repository.get(`${resource}${param}`);
    },

    getById(userId) {
        return Repository.get(`${resource}/${userId}`);
    },

    getByWalletId(walletId, pageSize, pageIndex) {
        return Repository.get(`${resource}?sortBy=createdAt&sortType=desc&walletId=${walletId}&relations=wallet.user&pageIndex=${pageIndex}&pageSize=${pageSize}&relations=transactionType`)


    },
    delete(userId) {
        return Repository.delete(`${resource} / ${userId}`);
    },
    getOverviewReport() {
        return Repository.get(`${resource}`);
    },
    reportByYear(year) {
        return Repository.get(`${resource}/reportByYear?year=${year}`)
    },


}