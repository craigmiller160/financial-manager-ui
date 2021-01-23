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

import MockAdapter from 'axios-mock-adapter';
import { mockCsrfPreflight } from '@craigmiller160/ajax-api-fp-ts/lib/test-utils';
import api from '../../src/services/Api';
import { getAuthUser, login, logout } from '../../src/services/AuthService';
import { AuthCodeLogin, AuthUser } from '../../src/types/auth';

const mockApi = new MockAdapter(api.instance);

describe('AuthService', () => {
    beforeEach(() => {
        mockApi.reset();
    });

    it('logout', async () => {
        mockApi.onGet('/financial-manage-ui/api/oauth/logout')
            .reply(200);
        const result = await logout()();
        expect(result).toBeRight();
    });

    it('login', async () => {
        const uri = '/financial-manage-ui/api/oauth/authcode/login';
        const authCodeLogin: AuthCodeLogin = {
            url: 'ABCDEFG'
        };
        mockCsrfPreflight(mockApi, uri);
        mockApi.onPost(uri)
            .reply(200, authCodeLogin);
        const result = await login()();
        expect(result).toEqualRight(authCodeLogin);
        expect(window.location.assign).toHaveBeenCalledWith(authCodeLogin.url);
    });

    it('getAuthUser', async () => {
        const authUser: AuthUser = {
            username: 'username',
            firstName: 'firstName',
            lastName: 'lastName',
            roles: []
        };
        mockApi.onGet('/financial-manage-ui/api/oauth/user')
            .reply(200, authUser);
        const result = await getAuthUser()();
        expect(result).toEqualRight(authUser);
    });
});
