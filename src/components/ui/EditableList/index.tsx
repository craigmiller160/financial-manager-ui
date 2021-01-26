import React from 'react';
import { useImmer } from 'use-immer';

// TODO tests

interface Props<T> {
    items: T[];
    getKey: (item: T, index: number) => any;
}

interface State {
    expandedIndex: number;
}

const EditableList = <T extends object>(props: Props<T>) => {
    const [ state, setState ] = useImmer<State>({
        expandedIndex: -1
    });


};

export default EditableList;
