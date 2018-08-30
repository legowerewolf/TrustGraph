import { createStore } from 'redux';
import { addChild, createUser } from './actions';
import { root } from './reducers';

var store = createStore(root);

var ROOT_USER = {
    name: "ROOT", uuid: "ROOT"
}

var actions = [
    createUser(ROOT_USER.name, ROOT_USER.uuid),
    createUser("1", "1"),
    createUser("2", "2"),
    createUser("3", "3"),
    createUser("4", "4"),
    createUser("5", "5"),
    createUser("6", "6"),
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
})

console.log(store.getState());

console.log(getStats("5"));

function getParents(uuid: string) {
    return store.getState().users.filter(user => user.children.indexOf(uuid) != -1).map(user => user.uuid);
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