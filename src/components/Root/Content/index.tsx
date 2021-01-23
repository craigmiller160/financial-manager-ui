/*
 * financial-manager-ui
 * Copyright (C) 2020 Craig Miller
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

import React from 'react';
import Container from '@material-ui/core/Container';
import './Content.scss';
import ProtectedRoute, { Rule } from '@craigmiller160/react-protected-route';
import { ReduxAlert } from '@craigmiller160/react-material-ui-common';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { hasAdminRole, isAuthorized } from '../../../store/auth/selectors';
import Transactions from './Transactions';
import Categories from './Categories';
import Home from './Home';
import Import from './Import';

interface RuleProps {
    isAuth: boolean;
    isAdmin: boolean;
}

const Content = () => {
    const isAuth = useSelector(isAuthorized);
    const isAdmin = useSelector(hasAdminRole);

    const ruleProps: RuleProps = {
        isAuth,
        isAdmin
    };

    const isAuthRule: Rule<RuleProps> = {
        allow: (allowProps?: RuleProps) => allowProps?.isAuth ?? false,
        redirect: '/'
    };

    const isAdminRule: Rule<RuleProps> = {
        allow: (allowProps?: RuleProps) => allowProps?.isAdmin ?? false,
        redirect: '/'
    };

    return (
        <Container className="Content">
            <ReduxAlert id="global-alert" />
            <Switch>
                <ProtectedRoute
                    path="/transactions"
                    component={ Transactions }
                    ruleProps={ ruleProps }
                    rules={ [
                        isAuthRule
                    ] }
                />
                <ProtectedRoute
                    path="/import"
                    component={ Import }
                    ruleProps={ ruleProps }
                    rules={ [
                        isAuthRule
                    ] }
                />
                <ProtectedRoute
                    path="/categories"
                    component={ Categories }
                    ruleProps={ ruleProps }
                    rules={ [
                        isAuthRule,
                        isAdminRule
                    ] }
                />
                <Route
                    path="/"
                    exact
                    component={ Home }
                />
                <Redirect to="/" />
            </Switch>
        </Container>
    );
};

export default Content;
