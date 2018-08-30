import { addChild, addNode } from './actions';
import { TrustGraph } from './graph';

var tg = new TrustGraph();

[
    addNode(tg.ROOT_USER.name, tg.ROOT_USER.uuid),
    addNode("1", "1"),
    addNode("2", "2"),
    addNode("3", "3"),
    addNode("4", "4"),
    addNode("5", "5"),
    addNode("6", "6"),
].forEach((action) => {
    tg.dispatchAction(action);
})

var actions = [
    addChild(tg.ROOT_USER, tg.getNodeByID("1")),
    addChild(tg.getNodeByID("1"), tg.getNodeByID("5")),
    addChild(tg.getNodeByID("5"), tg.getNodeByID("6")),
    addChild(tg.ROOT_USER, tg.getNodeByID("2")),
    addChild(tg.getNodeByID("2"), tg.getNodeByID("3")),
    addChild(tg.getNodeByID("3"), tg.getNodeByID("6")),
    addChild(tg.getNodeByID("2"), tg.getNodeByID("4")),
]
actions.forEach((action) => {
    tg.dispatchAction(action);
})

console.log(tg.store.getState());
console.log(tg.store.getState().nodes[0])
console.log(tg.getParents(tg.getNodeByID("5")))
console.log(tg.getStats(tg.getNodeByID("5")))