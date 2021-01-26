import React from 'react';
import { Category } from '../../../../types/category';
import { Card, IconButton, TextareaAutosize, TextField, Tooltip } from '@material-ui/core';
import './TempContainer.scss';
import { useImmer } from 'use-immer';
import { Cancel, Delete, Edit, ExpandLess, ExpandMore, Save } from '@material-ui/icons';

// TODO delete this

// TODO when editing another item, warning about existing unsaved changes should be shown

interface State {
    expandedIndex: number;
}

const TempContainer = () => {
    const [ state, setState ] = useImmer<State>({
        expandedIndex: -1
    });

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

    const doEdit = (index: number) =>
        setState((draft) => {
            draft.expandedIndex = index;
        });

    return (
        <div className="TempContainer">
            <h3>Temp Container</h3>
            {
                categories.map((category, index) => {
                    const isExpanded = state.expandedIndex === index;
                    return (
                        <Card className="Card" key={ category.id }>
                            {
                                isExpanded &&
                                    <div className="CategoryEdit">
                                        <TextField
                                            name="name"
                                            label="Category Name"
                                            className="Name"
                                            variant="outlined"
                                        />
                                        <TextField
                                            name="description"
                                            label="Category Description"
                                            multiline
                                            rows={ 5 }
                                            className="Description"
                                            variant="outlined"
                                        />
                                    </div>
                            }
                            {
                                !isExpanded &&
                                <div className="CategoryInfo">
                                    <h3>{ category.name }</h3>
                                    <p>{ category.description ?? 'N/A' }</p>
                                </div>
                            }
                            <div className="Action">
                                {
                                    !isExpanded &&
                                    <Tooltip title="Edit">
                                        <IconButton onClick={ () => doEdit(index) }>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                }
                                {
                                    isExpanded &&
                                    <>
                                        <Tooltip title="Save">
                                            <IconButton>
                                                <Save />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cancel">
                                            <IconButton>
                                                <Cancel />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </div>
    );
};

export default TempContainer;
