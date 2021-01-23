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

import { MockStore } from 'redux-mock-store';
import { AxiosError } from 'axios';
import * as O from 'fp-ts/es6/Option';
import store from '../../src/store';
import ajaxErrorHandler from '../../src/services/errorHandler';
import { ErrorResponse } from '../../src/types/api';

jest.mock('../../src/store', () => {
    const createMockStore = jest.requireActual('redux-mock-store').default;
    return createMockStore([])({});
});

const mockStore = store as MockStore;

describe('errorHandler', () => {
    beforeEach(() => {
        mockStore.clearActions();
    });

    it('handle axios error, not 401', () => {
        const axiosError: AxiosError<string> = {
            name: 'AxiosError',
            message: 'The error message',
            config: {},
            response: {
                status: 500,
                statusText: 'Error',
                config: {},
                data: 'Response message',
                headers: {}
            },
            isAxiosError: true,
            toJSON: () => ({})
        };
        ajaxErrorHandler(500, axiosError, 'The Message');
        expect(mockStore.getActions()).toEqual([
            {
                type: 'alert/showErrorAlert',
                payload: 'The Message Status: 500 Message: "Response message"'
            }
        ]);
    });

    it('handle axios error with ErrorResponse payload, not 401', () => {
        const axiosError: AxiosError<ErrorResponse> = {
            name: 'AxiosError',
            message: 'The error message',
            config: {},
            response: {
                status: 500,
                statusText: 'Error',
                config: {},
                data: {
                    status: 500,
                    message: 'Response message'
                },
                headers: {}
            },
            isAxiosError: true,
            toJSON: () => ({})
        };
        ajaxErrorHandler(500, axiosError, 'The Message');
        expect(mockStore.getActions()).toEqual([
            {
                type: 'alert/showErrorAlert',
                payload: 'The Message Status: 500 Message: Response message'
            }
        ]);
    });

    it('handle axios 401 error', () => {
        const axiosError: AxiosError<string> = {
            name: 'AxiosError',
            message: 'The error message',
            config: {},
            response: {
                status: 401,
                statusText: 'Error',
                config: {},
                data: 'Response message',
                headers: {}
            },
            isAxiosError: true,
            toJSON: () => ({})
        };
        ajaxErrorHandler(401, axiosError, 'The Message');
        expect(mockStore.getActions()).toEqual([
            {
                type: 'alert/showErrorAlert',
                payload: 'The Message Status: 401 Message: "Response message"'
            },
            {
                type: 'auth/setUserData',
                payload: O.none
            }
        ]);
    });

    it('handle other error', () => {
        ajaxErrorHandler(500, new Error('This is the error'), 'A Message');
        expect(mockStore.getActions()).toEqual([
            {
                type: 'alert/showErrorAlert',
                payload: 'A Message Message: This is the error'
            }
        ]);
    });
});
