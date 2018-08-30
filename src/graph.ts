import { Action, createStore, Store } from "redux";
import { root } from "./reducers";

export interface TrustNode {
    name: string;
    uuid: string;
    children: Array<TrustNode>;
}

export class TrustGraph {
    store: Store;
    ROOT_USER: TrustNode;

    constructor() {
        this.store = createStore(root);
        this.ROOT_USER = { name: "ROOT", uuid: "ROOT", children: new Array<TrustNode>() }
    }

    dispatchAction(action: Action) {
        this.store.dispatch(action);
    }

    getNodeByID(uuid: string): TrustNode {
        return this.store.getState().nodes.find((node) => { return node.uuid == uuid });
    }

    getParents(node: TrustNode) {
        return this.store.getState().nodes.filter(user => user.children.indexOf(node.uuid) != -1);
    }

    getStats(node: TrustNode) {
        let stats = {
            ancestors: this.getParents(node),
            rank: 1,
            isTrusted: false
        }

        //List ancestors and calculate rank
        let lastSize = 0;
        while (stats.ancestors.length != lastSize) {
            lastSize = stats.ancestors.length;

            stats.ancestors.forEach(element => {
                stats.ancestors.push(...this.getParents(element).filter(ancestor => stats.ancestors.indexOf(ancestor) == -1))
            });

            stats.rank = stats.isTrusted ? stats.rank : stats.rank + 1;
            if (stats.ancestors.map(n => n.uuid).indexOf(this.ROOT_USER.uuid) != -1 && !stats.isTrusted) {
                stats.isTrusted = true;
            }
        }

        return stats
    }
}