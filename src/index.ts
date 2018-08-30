import { createStore } from 'redux';
import { addChild, addNode } from './actions';
import { TrustGraph } from './graph';
import { root } from './reducers';

var tg = new TrustGraph();

var store = createStore(root);

var ROOT_USER = {
    name: "ROOT", uuid: "ROOT"
}

var actions = [
    addNode(ROOT_USER.name, ROOT_USER.uuid),
    addNode("1", "1"),
    addNode("2", "2"),
    addNode("3", "3"),
    addNode("4", "4"),
    addNode("5", "5"),
    addNode("6", "6"),
    addChild(ROOT_USER.uuid, "1"),
    addChild("1", "5"),
    addChild("5", "6"),
    addChild(ROOT_USER.uuid, "2"),
    addChild("2", "3"),
    addChild("3", "6"),
    addChild("2", "4")
]

actions.forEach((action) => {
    store.dispatch(action);
    tg.dispatchAction(action);
})

console.log("Identical states: ")
console.log(store.getState());
console.log(tg.store.getState());

console.log("Identical roots:")
console.log(store.getState().nodes[0])
console.log(tg.store.getState().nodes[0])

console.log("Identical parents of 5: ")
console.log(getParents("5"));
console.log(tg.getParents(tg.getNodeByID("5")))

console.log("Identical stats: ")
console.log(getStats("5"));
console.log(tg.getStats(tg.getNodeByID("5")))

function getParents(uuid: string) {
    return store.getState().nodes.filter(user => user.children.indexOf(uuid) != -1).map(user => user.uuid);
}

function getStats(uuid: string) {
    let stats = {
        ancestors: getParents(uuid),
        rank: 1,
        isTrusted: false
    }

    //List ancestors and calculate rank
    let lastSize = 0;
    while (stats.ancestors.length != lastSize) {
        lastSize = stats.ancestors.length;

        stats.ancestors.forEach(element => {
            stats.ancestors.push(...getParents(element).filter(ancestor => stats.ancestors.indexOf(ancestor) == -1))
        });

        stats.rank = stats.isTrusted ? stats.rank : stats.rank + 1;
        if (stats.ancestors.indexOf(ROOT_USER.uuid) != -1 && !stats.isTrusted) {
            stats.isTrusted = true;
        }
    }

    return stats
}