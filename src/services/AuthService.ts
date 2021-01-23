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

import * as TE from 'fp-ts/es6/TaskEither';
import { pipe } from 'fp-ts/es6/pipeable';
import { isAxiosError } from '@craigmiller160/ajax-api-fp-ts';
import { AuthCodeLogin, AuthUser } from '../types/auth';
import api from './Api';

export const logout = (): TE.TaskEither<Error, void> =>
    pipe(
        api.get<void>({
            uri: '/oauth/logout',
            errorMsg: 'Error logging out'
        }),
        TE.map((res) => res.data)
    );

export const login = (): TE.TaskEither<Error, AuthCodeLogin> =>
    pipe(
        api.post<void, AuthCodeLogin>({
            uri: '/oauth/authcode/login',
            errorMsg: 'Error getting login URL'
        }),
        TE.map((res) => res.data),
        TE.map((authCodeLogin: AuthCodeLogin) => {
            window.location.assign(authCodeLogin.url);
            return authCodeLogin;
        })
    );

export const getAuthUser = (): TE.TaskEither<Error, AuthUser> =>
    pipe(
        api.get<AuthUser>({
            uri: '/oauth/user',
            errorMsg: 'Error getting authenticated user',
            suppressError: (ex: Error) => {
                if (isAxiosError(ex)) {
                    return ex.response?.status === 401;
                }
                return false;
            }
        }),
        TE.map((res) => res.data)
    );
