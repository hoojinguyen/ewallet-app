import UserRepository from "./UserRepository";
import TransactionRepository from './TransactionRepository'

const repositories = {
    users: UserRepository,
    transactions: TransactionRepository
};

export default {
    get: name => repositories[name]
}