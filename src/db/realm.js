import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class ChildTodo extends Realm.Object {
    static schema = {
        name: "ChildTodo",
        properties: {
            _id: "objectId",
            name: "string",
            parent: "string",
            completionTime: "string?",
            description: "string?",
            completed: "bool"
        },
        primaryKey: "_id",
    }
}

export class Todo extends Realm.Object {
    static schema = {
        name: "Todo",
        properties: {
            _id: "objectId",
            name: "string",
            child: "ChildTodo[]",
            completionTime: "string?",
            description: "string?",
            completed: "bool"
        },
        primaryKey: "_id",
    }
}

export const todoContext = createRealmContext({
    schema: [Todo, ChildTodo],
    deleteRealmIfMigrationNeeded: true
});