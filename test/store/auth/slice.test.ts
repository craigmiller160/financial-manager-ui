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

import * as O from 'fp-ts/es6/Option';
import authSlice, { initialState } from '../../../src/store/auth/slice';
import { mockAuthUser } from '../../testutils/data/mocks';

describe('auth slice', () => {
    it('setUserData', () => {
        const result = authSlice.reducer(initialState, authSlice.actions.setUserData(O.some(mockAuthUser)));
        expect(result).toEqual({
            userData: O.some(mockAuthUser),
            hasChecked: true
        });
    });
});
