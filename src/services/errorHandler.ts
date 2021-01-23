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

import { DefaultErrorHandler } from '@craigmiller160/ajax-api-fp-ts/';
import { showErrorReduxAlert } from '@craigmiller160/react-material-ui-common';
import { AxiosError, AxiosResponse } from 'axios';
import { none } from 'fp-ts/es6/Option';
import MessageBuilder from '../utils/MessageBuilder';
import store from '../store';
import { ErrorResponse } from '../types/api';
import authSlice from '../store/auth/slice';

const isErrorResponse = (data?: any): data is ErrorResponse =>
    data?.status !== undefined && data?.message !== undefined;

const getFullErrorResponseMessage = (errorMsg: string, response: AxiosResponse) => {
    const { status } = response;
    if (isErrorResponse(response.data)) {
        const { message } = response.data;
        return new MessageBuilder(errorMsg)
            .append(`Status: ${status}`)
            .append(`Message: ${message}`)
            .message;
    }
    return new MessageBuilder(errorMsg)
        .append(`Status: ${status}`)
        .append(`Message: ${JSON.stringify(response.data)}`)
        .message;
};

const getFullErrorMessage = (errorMsg: string, error: Error) =>
    new MessageBuilder(errorMsg)
        .append(`Message: ${error.message}`)
        .message;

const ajaxErrorHandler: DefaultErrorHandler = (status: number, error: Error, requestMessage?: string): void => {
    if (process.env.NODE_ENV !== 'production') {
        console.error(error);
    }

    if (status > 0 && (error as AxiosError).response) {
        const response: AxiosResponse = (error as AxiosError).response!!;
        const fullMessage = getFullErrorResponseMessage(requestMessage ?? '', response);
        store.dispatch(showErrorReduxAlert(fullMessage));

        if (status === 401) {
            store.dispatch(authSlice.actions.setUserData(none));
        }
    } else {
        const fullMessage = getFullErrorMessage(requestMessage ?? '', error);
        store.dispatch(showErrorReduxAlert(fullMessage));
    }
};

export default ajaxErrorHandler;
