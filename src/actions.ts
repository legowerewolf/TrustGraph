import { TrustNode } from "./graph";

export const CREATE_USER = "ADD_USER"
export const ADD_TRUSTEE = "ADD_TRUSTEE"

export function addNode(name: string, uuid: string) {
    return {
        type: CREATE_USER,
        name: name,
        uuid: uuid
    }
}

export function addChild(parent: TrustNode, child: TrustNode) {
    return {
        type: ADD_TRUSTEE,
        parent: parent,
        child: child.uuid
    }
}