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
import api from '../../src/services/Api';
import { CategoryList } from '../../src/types/category';
import { getAllCategories } from '../../src/services/CategoryService';

const mockApi = new MockAdapter(api.instance);

describe('CategoryService', () => {
    beforeEach(() => {
        mockApi.reset();
    });

    it('getAllCategories', async () => {
        const categoryList: CategoryList = {
            categories: []
        };
        mockApi.onGet('/financial-manage-ui/api/categories')
            .reply(200, categoryList);
        const result = await getAllCategories()();
        expect(result).toEqualRight(categoryList);
    });
});
