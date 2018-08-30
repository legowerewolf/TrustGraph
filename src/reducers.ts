import { ADD_CHILD, CREATE_USER } from "./actions";

export function root(state: any = {}, action) {
    return {
        users: users(state.users, action)
    }
}

function users(state = [], action) {
    switch (action.type) {
        case CREATE_USER:
            return [...state, { name: action.name, uuid: action.uuid, children: [] }]
        case ADD_CHILD:
            return state.map((user) => {
                if (user.uuid == action.parent_uuid) {
                    return { ...user, children: [...user.children, action.child_uuid] }
                }
                return user
            })
    }
}