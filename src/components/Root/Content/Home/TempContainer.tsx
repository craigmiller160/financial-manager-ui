import React from 'react';
import { Category } from '../../../../types/category';
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import './TempContainer.scss';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

// TODO delete this

const TempContainer = () => {
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
                        <h3>Hello World</h3>
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
