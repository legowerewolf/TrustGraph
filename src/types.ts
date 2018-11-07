import { Action } from "redux";

export interface GraphAction extends Action {
    type: string;
    parent?: string;
    child?: string;
}

export type Relationship = [string, string];

export interface StoreShape {
    relationships: Relationship[]
}