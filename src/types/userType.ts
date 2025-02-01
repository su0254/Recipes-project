
export type UserType = {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    address?: string,
    phone?: string
}

export type Action = {
    type: 'ADD_USER',
    data: Partial<UserType> & { email?: string } & { password?: string } & { id?: number }
} | {
    type: 'DELETE_USER',
    data: Partial<UserType> & { email?: string }
} | {
    type: 'UPDATE',
    data: UserType
} | {
    type: 'GET',
    data: Partial<UserType> & { email?: string }
} 

export default (state: UserType, action: Action) => {
    switch (action.type) {
        case 'ADD_USER':
            console.log(state, action);
            return { ...state, ...action.data }
        case 'DELETE_USER':
            return state
        case 'UPDATE':
            return { ...state, ...action.data }
        default:// 'GET':
            return state
    }
}