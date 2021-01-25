import React from 'react';
import { Category } from '../../../../types/category';
import { Card } from '@material-ui/core';
import './TempContainer.scss';
import { useImmer } from 'use-immer';
import { ExpandMore } from '@material-ui/icons';

// TODO delete this

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

    return (
        <div className="TempContainer">
            <h3>Temp Container</h3>
            {
                categories.map((category) => (
                    <Card className="Card" key={ category.id }>
                        <div className="CategoryInfo">
                            <h3>{ category.name }</h3>
                            <p>{ category.description ?? 'N/A' }</p>
                        </div>
                        <div className="Action">
                            <ExpandMore />
                        </div>
                    </Card>
                ))
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
