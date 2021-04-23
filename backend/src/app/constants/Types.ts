export class Types {
	public static USER_SVC = Symbol('IUserService')
	public static USER_REPO = Symbol('IUserRepository')

	public static WALLET_TYPE_SVC = Symbol('IWalletTypeService')
	public static WALLET_TYPE_REPO = Symbol('IWalletTypeRepository')

	public static WALLET_SVC = Symbol('IWalletService')
	public static WALLET_REPO = Symbol('IWalletRepository')

	public static TRANSCTN_GROUP_SVC = Symbol('ITransactionGroupService')
	public static TRANSCTN_GROUP_REPO = Symbol('ITransactionGroupRepository')

	public static TRANSCTN_TYPE_SVC = Symbol('ITransactionTypeService')
	public static TRANSCTN_TYPE_REPO = Symbol('ITransactionTypeRepository')

	public static TRANSCTN_SVC = Symbol('ITransactionService')
	public static TRANSCTN_REPO = Symbol('ITransactionRepository')
}
