import Repository from './repository'

const resource = "/users";

export default {
    getStaff(pageIndex) {
        return Repository.get(`${resource}?fields=id&fields=displayName&fields=role&pageIndex=${pageIndex}&pageSize=10&sortBy=displayName&sortType=asc&roles=supervisor&roles=admin&fields=username&fields=status`);
    },
    getUser(pageIndex) {
        return Repository.get(`${resource}?fields=id&fields=displayName&fields=role&pageIndex=${pageIndex}&pageSize=10&sortBy=displayName&sortType=asc&roles=guest&fields=username&fields=status`);
    },
    getById(userId) {
        return Repository.get(`${resource}/${userId}?fields=id&fields=displayName&relations=wallets&fields=status&fields=username`);
    },

    login(loginPayload) {
        return Repository.post(`${resource}/login`, loginPayload)
    },

    reportByYear(year) {
        return Repository.get(`${resource}/reportByYear?year=${year}`)
    },

    getOverviewReport() {
        return Repository.get(`${resource}`)
    },
    create(userPayload) {
        return Repository.post(`${resource}`, userPayload)
    },
    update(userPayload) {
        return Repository.patch(`${resource}`, userPayload);
    },
    delete(userId) {
        return Repository.delete(`${resource}/${userId}`);
    }

}