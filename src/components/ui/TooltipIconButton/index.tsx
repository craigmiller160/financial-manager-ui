import React, { ComponentType, ElementType } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// TODO tests
// TODO move to material ui common

interface Props {
    title: string;
    onClick?: () => void;
    icon: JSX.Element
}

const TooltipIconButton = (props: Props) => (
    <Tooltip title={ props.title }>
        <IconButton onClick={ props.onClick }>
            { props.icon }
        </IconButton>
    </Tooltip>
);

export default TooltipIconButton;
