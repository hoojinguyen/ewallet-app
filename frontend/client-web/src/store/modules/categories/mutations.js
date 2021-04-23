import config from '../../../config/config'
export default {
    retrieveCategories: (state, payload) => {
        state.categoryExpense = payload.expense
        state.categoryIncome = payload.income
        state.categoryDebt = payload.debt
        // console.log(payload.expense)
    },
    addNewCategory: (state, payload) => {
        console.log("Mutation: ", payload);

        let listCategory = payload.transactionGroup.displayName == config.nameGroupExpense ? state.categoryExpense : state.categoryIncome;
        console.log(listCategory);
        listCategory.unshift(payload)
    },
    changIdCategory: (state, payload) => {
        let listCategory = payload.transactionGroup == config.nameGroupExpense ? state.categoryExpense : state.categoryIncome;
        listCategory.filter(item => item.id === payload.idOld)
            .map(itemMap => {
                return itemMap.id = payload.idNew;
            });
    },
    updateCategory: (state, payload) => {
        console.log("updateCategory", payload)
    },
    removeCategory: (state, payload) => {
        console.log("removeCategory", payload)
        let transactionGroup = ""
        switch (payload.transactionGroup) {
            case "Chi tiêu":
                transactionGroup = state.categoryExpense
                break;
            case 'Thu nhập':
                transactionGroup = state.categoryIncome
                break;
            default:
                transactionGroup = state.categoryDebt
                break;
        }
        let indexCategory = transactionGroup.findIndex(category => category.id == payload.idCategory);
        transactionGroup.splice(indexCategory, 1);
    },
};