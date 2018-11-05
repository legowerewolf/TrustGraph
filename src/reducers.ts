import { ADD_TRUSTEE, CREATE_USER, REMOVE_NODE, REMOVE_TRUSTEE } from "./actions";

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
        case REMOVE_TRUSTEE:
            return state.map((user) => {
                if (user.uuid == action.parent.uuid) {
                    return { ...user, children: user.children.filter(child => child.uuid != action.child.uuid) }
                }
                return user
            })
        case REMOVE_NODE:
            return state.filter((node) => {
                return node.uuid != action.node.uuid;
            })
    }
}