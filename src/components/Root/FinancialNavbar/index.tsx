/*
 * financial-manager-ui
 * Copyright (C) 2021 Craig Miller
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, NavbarItem } from '@craigmiller160/react-material-ui-common';
import * as TE from 'fp-ts/es6/TaskEither';
import { pipe } from 'fp-ts/es6/pipeable';
import * as O from 'fp-ts/es6/Option';
import { hasAdminRole, isAuthorized } from '../../../store/auth/selectors';
import { RootState } from '../../../store';
import { login, logout } from '../../../services/AuthService';
import authSlice from '../../../store/auth/slice';

const FinancialNavbar = () => {
    const isAuth = useSelector(isAuthorized);
    const dispatch = useDispatch();
    const hasChecked = useSelector((state: RootState) => state.auth.hasChecked);
    const isAdmin = useSelector<RootState, boolean>(hasAdminRole);

    let items: NavbarItem[] = [
        {
            to: '/transactions',
            text: 'Transactions'
        },
        {
            to: '/import',
            text: 'Import'
        }
    ];
    if (isAdmin) {
        items = [
            items[0],
            {
                to: '/categories',
                text: 'Categories'
            },
            items[1]
        ];
    }

    const doLogout = useCallback(pipe(
        logout(),
        TE.map(() => dispatch(authSlice.actions.setUserData(O.none)))
    ), []);

    return (
        <Navbar
            isAuth={ isAuth }
            showAuthBtn={ hasChecked }
            login={ login() }
            logout={ doLogout }
            title="Financial Manager"
            items={ items }
        />
    );
};

export default FinancialNavbar;
