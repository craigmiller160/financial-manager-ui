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
import produce from 'immer';
import { hasAdminRole, isAuthorized } from '../../../src/store/auth/selectors';
import { mockAuthUser, mockRootState } from '../../testutils/data/mocks';

describe('auth selectors', () => {
    it('isAuthorized true', () => {
        const newRootState = produce(mockRootState, (draft) => {
            draft.auth.userData = O.some(mockAuthUser);
        });
        const result = isAuthorized(newRootState);
        expect(result).toEqual(true);
    });

    it('isAuthorized false', () => {
        const result = isAuthorized(mockRootState);
        expect(result).toEqual(false);
    });

    it('hasAdminRole true', () => {
        const newAuthUser = produce(mockAuthUser, (draft) => {
            draft.roles = [
                'ROLE_ADMIN'
            ];
        });
        const newRootState = produce(mockRootState, (draft) => {
            draft.auth.userData = O.some(newAuthUser);
        });
        const result = hasAdminRole(newRootState);
        expect(result).toEqual(true);
    });

    it('hasAdminRole false', () => {
        const newRootState = produce(mockRootState, (draft) => {
            draft.auth.userData = O.some(mockAuthUser);
        });
        const result = hasAdminRole(newRootState);
        expect(result).toEqual(false);
    });
});
