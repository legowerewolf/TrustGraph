import { createStore, Store } from "redux";
import { arrayContains } from "./helpers";
import { root_reducer } from "./reducers";
import { GraphAction, StoreShape } from "./types";

export class TrustGraph {
    store: Store<StoreShape>;
    ROOT_USER: string;

    static directions = {
        UP: 1,
        DOWN: 0
    }

    constructor() {
        this.store = createStore(root_reducer);
    }

    dispatchAction(action: GraphAction) {
        this.store.dispatch(action);
    }

    getDirect(node: string, direction: number): string[] {
        return this.store.getState().relationships
            .filter(relationship => relationship[direction] == node)
            .map(relationship => relationship[1 - direction]);
    }

    getAll(node: string, direction: number): string[] {
        let nodes = this.getDirect(node, direction);
        for (let lastLength = -1; nodes.length > lastLength;) {
            lastLength = nodes.length;
            nodes.forEach(element => {
                nodes.push(...this.getDirect(element, direction).filter(newAncestor => !arrayContains(nodes, newAncestor)))
            });
        }
        return nodes;
    }

    getSeperation(nodeA: string, nodeB: string, direction: number): number {
        let nodes = this.getDirect(nodeA, direction);
        let generations = 1;
        for (let lastLength = -1; nodes.length > lastLength && !arrayContains(nodes, nodeB); generations++) {
            lastLength = nodes.length;
            nodes.forEach(element => {
                nodes.push(...this.getDirect(element, direction).filter(newAncestor => !arrayContains(nodes, newAncestor)))
            });
        }
        return arrayContains(nodes, nodeB) ? generations : null;
    }
}