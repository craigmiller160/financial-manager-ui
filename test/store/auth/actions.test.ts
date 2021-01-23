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

import * as TE from 'fp-ts/es6/TaskEither';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as O from 'fp-ts/es6/Option';
import { getAuthUser } from '../../../src/services/AuthService';
import { mockAuthUser } from '../../testutils/data/mocks';
import { loadAuthUser } from '../../../src/store/auth/actions';

jest.mock('../../../src/services/AuthService', () => ({
    getAuthUser: jest.fn()
}));

const mockStore = createMockStore<any, ThunkDispatch<any, any, any>>([ thunk ])({});

describe('auth actions', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockStore.clearActions();
    });

    it('loadAuthUser success', async () => {
        (getAuthUser as jest.Mock).mockImplementation(() => TE.right(mockAuthUser));
        await mockStore.dispatch(loadAuthUser());
        expect(mockStore.getActions()).toEqual([
            {
                type: 'auth/setUserData',
                payload: O.some(mockAuthUser)
            }
        ]);
    });

    it('loadAuthUser error', async () => {
        (getAuthUser as jest.Mock).mockImplementation(() => TE.left(new Error()));
        await mockStore.dispatch(loadAuthUser());
        expect(mockStore.getActions()).toEqual([
            {
                type: 'auth/setUserData',
                payload: O.none
            }
        ]);
    });
});
