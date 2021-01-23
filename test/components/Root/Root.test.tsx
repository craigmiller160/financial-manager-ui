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
import { render, waitFor, screen } from '@testing-library/react';
import createMockStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import produce from 'immer';
import Root from '../../../src/components/Root';
import { mockRootState } from '../../testutils/data/mocks';

jest.mock('../../../src/store/auth/actions', () => ({
    loadAuthUser: jest.fn().mockImplementation(() => () => {}) // eslint-disable-line @typescript-eslint/no-empty-function
}));

const mockStoreFn = createMockStore([ thunk ]);

const doRender = (store: MockStore) => waitFor(() => render(
    <MemoryRouter initialEntries={ [ '/' ] }>
        <Provider store={ store }>
            <Root />
        </Provider>
    </MemoryRouter>
));

describe('Root', () => {
    describe('rendering', () => {
        it('has not checked', async () => {
            const store = mockStoreFn(mockRootState);
            await doRender(store);

            expect(screen.queryByText('Financial Management'))
                .toBeInTheDocument();
            expect(screen.queryByText('Welcome to Financial Manager'))
                .not.toBeInTheDocument();
        });

        it('has checked', async () => {
            const newRootState = produce(mockRootState, (draft) => {
                draft.auth.hasChecked = true;
            });
            const store = mockStoreFn(newRootState);
            await doRender(store);

            expect(screen.queryByText('Financial Management'))
                .toBeInTheDocument();
            expect(screen.queryByText('Welcome to Financial Manager'))
                .toBeInTheDocument();
        });
    });
});
