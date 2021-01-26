import React, { ComponentType } from 'react';
import './EditableListCard.scss';
import { IconButton, Tooltip } from '@material-ui/core';
import { Cancel, Delete, Edit, Save } from '@material-ui/icons';
import TooltipIconButton from '../TooltipIconButton';
import { ViewComponentType } from '../../../types/editableList';

interface Props<T> {
    item: T;
    isEditing: boolean;
    doEdit: () => void;
    viewComponent: ViewComponentType<T>;
}

const EditableListCard = <T extends object>(props: Props<T>) => {
    const {
        isEditing,
        doEdit,
        viewComponent,
        item
    } = props;

    const ViewComponent = viewComponent;

    return (
        <div className="EditableListCard">
            <div className="Content">
                <ViewComponent item={ item } />
            </div>
            <div className="Actions">
                {
                    !isEditing &&
                    <Tooltip title="Edit">
                        <IconButton onClick={ doEdit }>
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
