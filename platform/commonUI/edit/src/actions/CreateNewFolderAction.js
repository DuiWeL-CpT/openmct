/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2018, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/


define([

],
    function (

    ) {

        /**
         * The "Save" action; the action triggered by clicking Save from
         * Edit Mode. Exits the editing user interface and invokes object
         * capabilities to persist the changes that have been made.
         * @constructor
         * @implements {Action}
         * @memberof platform/commonUI/edit
         */
        function  CreateNewFolderAction(
            policyService,
            dialogService,
            typeService,
            context,
            name
        ) {
            this.parent = (context || {}).domainObject;
            this.policyService = policyService;
            this.typeService = typeService;
            this.type = typeService.getType('folder');
            this.name = name;
        }
        
        CreateNewFolderAction.prototype.perform = function () {
            
            var parent = this.parent,
                policyService = this.policyService,
                typeService = this.typeService,
                newModel = this.type.getInitialModel(),
                folderType = typeService.getType('folder');
                name = this.name;
                newObject;
        
            newModel.type = folderType.getKey();
            newObject = parent.getCapability('instantiation').instantiate(newModel);
            newObject.useCapability('mutation', function (model) {
                newModel.location = parent.getId();
            });
            newModel.name = name;
            
        
            function validateLocation(parent, policyService) {
                return parent && policyService.allow(
                    "composition",
                    parent,
                    typeService.getType('folder')
                );
            }

            function persistAndReturn(domainObject) {
                return domainObject.getCapability('persistence')
                    .persist()
                    .then(function () {
                        return domainObject;
                    });
            }
            
            function addToParent(populatedObject) {
                parent.getCapability('composition').add(populatedObject);
                return persistAndReturn(parentObject);
            }
            
            
            return persistAndReturn(newModel).then(addToParent);
        }


        /**
         * Check if this action is applicable in a given context.
         * This will ensure that a domain object is present in the context,
         * and that this domain object is in Edit mode.
         * @returns true if applicable
         */
        CreateNewFolderAction.appliesTo = function (context) {
            var parent = (context || {}).domainObject;
                
            return parent && parent.hasCapability('editor');
        };

        return CreateNewFolderAction;
    }
);
