/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from './util';

const taskId: string = 'launchFunctionApp';
const tasksJson: {} = {
    version: '2.0.0',
    tasks: [
        {
            taskName: localize('azFunc.launchFuncApp', 'Launch Function App'),
            identifier: taskId,
            type: 'shell',
            command: 'func host start',
            isBackground: true,
            presentation: {
                reveal: 'silent'
            },
            problemMatcher: [
                {
                    owner: 'azureFunctions',
                    pattern: [
                        {
                            regexp: '\\b\\B',
                            file: 1,
                            location: 2,
                            message: 3
                        }
                    ],
                    background: {
                        activeOnStart: true,
                        beginsPattern: '^.*Stopping host.*',
                        endsPattern: '^.*Job host started.*'
                    }
                }
            ]
        }
    ]
};

const launchJson: {} = {
    version: '0.2.0',
    configurations: [
        {
            name: localize('azFunc.attachToFunc', 'Attach to Azure Functions'),
            type: 'node',
            request: 'attach',
            port: 5858,
            protocol: 'inspector',
            preLaunchTask: taskId
        }
    ]
};

function stringifyJSON(data: {}): string {
    return JSON.stringify(data, null, '    ');
}

export function getTasksJson(): string {
    return stringifyJSON(tasksJson);
}

export function getLaunchJson(): string {
    return stringifyJSON(launchJson);
}
