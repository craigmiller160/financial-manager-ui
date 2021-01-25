import React from 'react';
import { Category } from '../../../../types/category';
import { Card, IconButton, TextareaAutosize, TextField } from '@material-ui/core';
import './TempContainer.scss';
import { useImmer } from 'use-immer';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

// TODO delete this

// TODO when should changes be saved? On type (with debounce) is good and all, but what about new cateogries? Or changing cateogry name? this will affect ordering

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

    const doExpand = (index: number) =>
        setState((draft) => {
            if (draft.expandedIndex === index) {
                draft.expandedIndex = -1;
            } else {
                draft.expandedIndex = index;
            }
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
                                        />
                                        <TextareaAutosize
                                            name="description"
                                            label="Category Description"
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
                                <IconButton onClick={ () => doExpand(index) }>
                                    {
                                        isExpanded &&
                                        <ExpandLess />
                                    }
                                    {
                                        !isExpanded &&
                                        <ExpandMore />
                                    }
                                </IconButton>
                            </div>
                        </Card>
                    );
                })
            }
        </div>
    );
};

export default TempContainer;



/*
 * {
                categories.map((category) => (
                    <Card key={ category.id } className="Card">
                        <CardHeader
                            title={ category.name }
                            subheader={ category.description }
                        />
                        <CardContent>
                            <Typography variant="h5">{ category.name }</Typography>
                            <Typography variant="body2">{ category.description }</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton>
                                <ExpandMore />
                                <ExpandLess />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            }
 */
