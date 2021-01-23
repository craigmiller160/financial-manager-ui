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

import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, waitFor, screen } from '@testing-library/react';
import { Router } from 'react-router';
import createMockStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import produce from 'immer';
import userEvent from '@testing-library/user-event';
import * as TE from 'fp-ts/es6/TaskEither';
import * as O from 'fp-ts/es6/Option';
import { mockAuthUser, mockRootState } from '../../../testutils/data/mocks';
import { login, logout } from '../../../../src/services/AuthService';
import FinancialNavbar from '../../../../src/components/Root/FinancialNavbar';

jest.mock('../../../../src/services/AuthService', () => ({
    login: jest.fn(),
    logout: jest.fn()
}));

jest.mock('@material-ui/core/useMediaQuery', () => () => true);

const mockStoreFn = createMockStore([ thunk ]);

const doRender = (history: MemoryHistory, store: MockStore) => waitFor(() => render(
    <Router history={ history }>
        <Provider store={ store }>
            <FinancialNavbar />
        </Provider>
    </Router>
));

describe('FinancialNavbar', () => {
    let testHistory: MemoryHistory;
    beforeEach(() => {
        jest.resetAllMocks();
        testHistory = createMemoryHistory();
    });

    describe('rendering', () => {
        it('renders without admin role', async () => {
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
                draft.auth.userData = O.some(mockAuthUser);
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            expect(screen.queryByText('Transactions'))
                .toBeInTheDocument();
            expect(screen.queryByText('Categories'))
                .not.toBeInTheDocument();
            expect(screen.queryByText('Import'))
                .toBeInTheDocument();
        });

        it('renders with admin role', async () => {
            const newAuthUser = produce(mockAuthUser, (draft) => {
                draft.roles = [
                    'ROLE_ADMIN'
                ];
            });
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
                draft.auth.userData = O.some(newAuthUser);
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            expect(screen.queryByText('Transactions'))
                .toBeInTheDocument();
            expect(screen.queryByText('Categories'))
                .toBeInTheDocument();
            expect(screen.queryByText('Import'))
                .toBeInTheDocument();
        });
    });

    describe('behavior', () => {
        it('login', async () => {
            (login as jest.Mock).mockImplementation(() => () => {}); // eslint-disable-line @typescript-eslint/no-empty-function
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            userEvent.click(screen.getByText('Login'));

            expect(login).toHaveBeenCalled();
        });

        it('logout', async () => {
            (logout as jest.Mock).mockImplementation(() => TE.right(null));
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
                draft.auth.userData = O.some(mockAuthUser);
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            await waitFor(() => userEvent.click(screen.getByText('Logout')));

            expect(logout).toHaveBeenCalled();
            expect(store.getActions()).toEqual([
                {
                    type: 'auth/setUserData',
                    payload: O.none
                }
            ]);
        });

        it('navigate to transactions', async () => {
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
                draft.auth.userData = O.some(mockAuthUser);
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            userEvent.click(screen.getByText('Transactions'));

            expect(testHistory.entries).toHaveLength(2);
            expect(testHistory.entries[1].pathname).toEqual('/transactions');
        });

        it('navigate to categories', async () => {
            const newAuthUser = produce(mockAuthUser, (draft) => {
                draft.roles = [
                    'ROLE_ADMIN'
                ];
            });
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
                draft.auth.userData = O.some(newAuthUser);
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            userEvent.click(screen.getByText('Categories'));

            expect(testHistory.entries).toHaveLength(2);
            expect(testHistory.entries[1].pathname).toEqual('/categories');
        });

        it('navigate to import', async () => {
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
                draft.auth.userData = O.some(mockAuthUser);
            });
            const store = mockStoreFn(newRootState);
            await doRender(testHistory, store);

            userEvent.click(screen.getByText('Import'));

            expect(testHistory.entries).toHaveLength(2);
            expect(testHistory.entries[1].pathname).toEqual('/import');
        });
    });
});
