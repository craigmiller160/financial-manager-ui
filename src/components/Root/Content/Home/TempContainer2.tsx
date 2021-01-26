import React from 'react';
import { Category } from '../../../../types/category';
import EditableList from '../../../ui/EditableList';

// TODO delete this

const CategoryInfo = ({ item }) => (
    <div className="CategoryInfo">
        <h3>{ item.name }</h3>
        <p>{ item.description ?? 'N/A' }</p>
    </div>
);

const TempContainer2 = () => {
    const categories: Category[] = [
        {
            id: 1,
            name: 'First',
            description: 'The first one'
        },
        {
            id: 2,
            name: 'Second',
            description: 'The second one'
        },
        {
            id: 3,
            name: 'Third'
        }
    ];

    return (
        <div>
            <h1>Temp Container 2</h1>
            <EditableList
                items={ categories }
                getKey={ (item: Category) => item.id }
                viewComponent={}
            />
        </div>
    );
};

export default TempContainer2;
