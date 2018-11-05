import { addChild, addNode, removeChild, removeNode } from './actions';
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

var relationships = [
    addChild(tg.ROOT_USER, tg.getNodeByID("1")),
    addChild(tg.getNodeByID("1"), tg.getNodeByID("5")),
    addChild(tg.getNodeByID("5"), tg.getNodeByID("6")),
    addChild(tg.ROOT_USER, tg.getNodeByID("2")),
    addChild(tg.getNodeByID("2"), tg.getNodeByID("3")),
    addChild(tg.getNodeByID("3"), tg.getNodeByID("6")),
    addChild(tg.getNodeByID("2"), tg.getNodeByID("4"))
];
relationships.forEach((action) => { tg.dispatchAction(action); })

console.log(tg.store.getState());
tg.dispatchAction(removeChild(tg.getNodeByID("5"), tg.getNodeByID("5")))
tg.dispatchAction(removeNode(tg.getNodeByID("6")));

console.log(tg.store.getState());
console.log(tg.getNodeByID("5").children)