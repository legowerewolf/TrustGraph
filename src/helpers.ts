export function arrayIsIdentical(arr1: any[], arr2: any[]) {
    return !arr1.find((value, index) => value !== arr2[index])
}

export function arrayContains(arr: any[], elem: any) {
    return arr.findIndex(q_elem => q_elem == elem) != -1;
}