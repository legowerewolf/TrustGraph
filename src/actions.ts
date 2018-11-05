import { TrustNode } from "./graph";

export const CREATE_USER = "ADD_USER";
export const ADD_TRUSTEE = "ADD_TRUSTEE";
export const REMOVE_NODE = "REMOVE_NODE";
export const REMOVE_TRUSTEE = "REMOVE_TRUSTEE";

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

export function removeNode(node: TrustNode) {
    return {
        type: REMOVE_NODE,
        node: node
    }
}

export function removeChild(parent: TrustNode, child: TrustNode) {
    return {
        type: REMOVE_TRUSTEE,
        parent: parent,
        child: child.uuid
    }
}