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
import Transactions from '../../../../../src/components/Root/Content/Transactions';

const doRender = () => waitFor(() => render(
    <Transactions />
));

describe('Transactions', () => {
    describe('rendering', () => {
        it('renders', async () => {
            await doRender();
            expect(screen.queryByText('Transactions'))
                .toBeInTheDocument();
        });
    });
});
