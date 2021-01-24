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

import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import theme from './theme';
import Root from './Root';
import store from '../store';

const App = () => (
    <ReduxProvider store={ store }>
        <BrowserRouter basename="/financial-manager">
            <ThemeProvider theme={ theme }>
                <Root />
            </ThemeProvider>
        </BrowserRouter>
    </ReduxProvider>
);

export default App;
