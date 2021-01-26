import React from 'react';
import './EditableListCard.scss';
import { IconButton, Tooltip } from '@material-ui/core';
import { Cancel, Delete, Edit, Save } from '@material-ui/icons';
import TooltipIconButton from '../TooltipIconButton';

interface Props<T> {
    item: T;
    index: number;
    isEditing: boolean;
    doEdit: (index: number) => void;
}

const EditableListCard = <T extends object>(props: Props<T>) => {
    const {
        isEditing,
        doEdit,
        index
    } = props;

    return (
        <div className="EditableListCard">
            <div className="Content">

            </div>
            <div className="Actions">
                {
                    !isEditing &&
                    <Tooltip title="Edit">
                        <IconButton onClick={ () => doEdit(index) }>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                }
                {
                    isEditing &&
                    <>
                        <TooltipIconButton
                            title="Save"
                            icon={ <Save /> }
                        />
                        <TooltipIconButton
                            title="Cancel"
                            icon={ <Cancel /> }
                        />
                        <TooltipIconButton
                            title="Delete"
                            icon={ <Delete /> }
                        />
                    </>
                }
            </div>
        </div>
    );
};

export default EditableListCard;
