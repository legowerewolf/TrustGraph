import { TrustNode } from "./graph";

export const CREATE_USER = "ADD_USER"
export const ADD_CHILD = "ADD_TRUSTEE"

export function addNode(name: string, uuid: string) {
    return {
        type: CREATE_USER,
        name: name,
        uuid: uuid
    }
}

export function addChild(parent: TrustNode, child: TrustNode) {
    return {
        type: ADD_CHILD,
        parent_uuid: parent.uuid,
        child_uuid: child.uuid
    }
}