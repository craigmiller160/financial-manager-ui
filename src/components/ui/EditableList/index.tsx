import React, { ComponentType } from 'react';
import { useImmer } from 'use-immer';
import EditableListCard from './EditableListCard';
import { ViewComponentType } from '../../../types/editableList';

// TODO tests

interface Props<T> {
    items: T[];
    getKey: (item: T, index: number) => any;
    viewComponent: ViewComponentType<T>;
}

interface State {
    editingIndex: number;
}

const EditableList = <T extends object>(props: Props<T>) => {
    const {
        items,
        getKey,
        viewComponent
    } = props;
    const [ state, setState ] = useImmer<State>({
        editingIndex: -1
    });

    const setEditingIndex = (index: number) =>
        setState((draft) => {
            draft.editingIndex = index;
        });

    return (
        <div>
            {
                items.map((item, index) => {
                    const key = getKey(item, index);
                    const isEditing = state.editingIndex === index;
                    const doEdit = () => setEditingIndex(index);
                    return (
                        <EditableListCard
                            item={ item }
                            isEditing={ isEditing }
                            doEdit={ doEdit }
                            viewComponent={ viewComponent }
                        />
                    );
                })
            }
        </div>
    );
};

export default EditableList;
