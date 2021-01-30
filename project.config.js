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

const path = require('path');

module.exports = {
    title: 'Financial Manager',
    devServerPort: 3002,
    devServerHttps: true,
    publicPath: '/financial-manager',
    devServerProxy: {
        '/financial-manager/api': {
            target: 'https://localhost:7005',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/financial-manager/api': ''
            },
            logLevel: 'debug'
        },
        '/financial-manager/oauth2': {
            target: 'https://localhost:7003',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/financial-manager/oauth2': ''
            },
            logLevel: 'debug'
        }
    },
    jestSetupFiles: [
        path.resolve(process.cwd(), 'test/setupTests.ts')
    ],
    enzymeReactVersion: 16
};