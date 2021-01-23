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
import createMockStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import * as O from 'fp-ts/es6/Option';
import produce from 'immer';
import { mockAuthUser, mockRootState } from '../../../testutils/data/mocks';
import Content from '../../../../src/components/Root/Content';

const mockStoreFn = createMockStore([ thunk ]);

const doRender = (history: MemoryHistory, store: MockStore) => waitFor(() => render(
    <Router history={ history }>
        <Provider store={ store }>
            <Content />
        </Provider>
    </Router>
));

const adminUser = produce(mockAuthUser, (draft) => {
    draft.roles = [
        'ROLE_ADMIN'
    ];
});
const isAuthRootState = produce(mockRootState, (draft) => {
    draft.auth.userData = O.some(mockAuthUser);
});
const isAdminRootState = produce(mockRootState, (draft) => {
    draft.auth.userData = O.some(adminUser);
});

describe('Content', () => {
    let testHistory: MemoryHistory;
    beforeEach(() => {
        testHistory = createMemoryHistory();
    });

    describe('rendering', () => {
        it('shows home page', async () => {
            const store = mockStoreFn(mockRootState);
            await doRender(testHistory, store);

            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });

        it('shows transactions page', async () => {
            const store = mockStoreFn(isAuthRootState);
            testHistory.push('/transactions');
            await doRender(testHistory, store);

            expect(screen.queryByText('Transactions'))
                .toBeInTheDocument();
        });

        it('redirects from transactions to home if not authorized', async () => {
            const store = mockStoreFn(mockRootState);
            testHistory.push('/transactions');
            await doRender(testHistory, store);

            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });

        it('shows import page', async () => {
            const store = mockStoreFn(isAuthRootState);
            testHistory.push('/import');
            await doRender(testHistory, store);

            expect(screen.queryByText('Import'))
                .toBeInTheDocument();
        });

        it('redirects from import to home if not authorized', async () => {
            const store = mockStoreFn(mockRootState);
            testHistory.push('/import');
            await doRender(testHistory, store);

            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });

        it('shows categories page', async () => {
            const store = mockStoreFn(isAdminRootState);
            testHistory.push('/categories');
            await doRender(testHistory, store);

            expect(screen.queryByText('Categories'))
                .toBeInTheDocument();
        });

        it('redirects from categories to home if not authorized', async () => {
            const store = mockStoreFn(isAuthRootState);
            testHistory.push('/categories');
            await doRender(testHistory, store);

            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });

        it('redirects from categories to home if not admin', async () => {
            const store = mockStoreFn(mockRootState);
            testHistory.push('/categories');
            await doRender(testHistory, store);

            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });

        it('redirects to home if unknown uri', async () => {
            const store = mockStoreFn(isAuthRootState);
            testHistory.push('/abcdefg');
            await doRender(testHistory, store);

            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });
    });
});
