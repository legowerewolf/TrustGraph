import { ADD_TRUSTEE, CREATE_USER } from "./actions";

export function root(state: any = {}, action) {
    return {
        nodes: nodes(state.nodes, action)
    }
}

function nodes(state = [], action) {
    switch (action.type) {
        case CREATE_USER:
            return [...state, { name: action.name, uuid: action.uuid, children: [] }]
        case ADD_TRUSTEE:
            return state.map((user) => {
                if (user.uuid == action.parent.uuid) {
                    return { ...user, children: [...user.children, action.child] }
                }
                return user
            })
    }
}