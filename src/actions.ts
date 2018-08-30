export const CREATE_USER = "ADD_USER"
export const ADD_CHILD = "ADD_TRUSTEE"

export function createUser(name: string, uuid: string) {
    return {
        type: CREATE_USER,
        name: name,
        uuid: uuid
    }
}

export function addChild(parent: string, child: string) {
    return {
        type: ADD_CHILD,
        parent_uuid: parent,
        child_uuid: child
    }
}