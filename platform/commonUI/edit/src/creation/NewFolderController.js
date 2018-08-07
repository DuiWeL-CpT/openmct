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

define(
    [],
    function () {

        /**
         * Controller for the "locator" control, which provides the
         * user with the ability to select a domain object as the
         * destination for a newly-created object in the Create menu.
         * @memberof platform/commonUI/browse
         * @constructor
         */
        function NewFolderController($scope, typeService, $rootScope) {
            
            $scope.createNewFolderClickHandler = function() {
                $scope.createNewFolder = true;
                $scope.validNewFolder = false;
            }
            
            function validateFolderName() {
                console.log($scope.newFolderName);
            }
            
            $scope.createClickHandler = function() {
                console.log($scope.newFolderName);
                //return CreateNewFolderAction($scope.newFolderName);
            }
            
            $scope.folderPattern = typeService.getType('folder').getProperties().filter(
                function (prop) {
                    return prop.propertyDefinition.key === "name";
                }
            )[0].propertyDefinition.pattern;
            
            $scope.cancelClickHandler = function() {
                $scope.createNewFolder = false;
                $scope.newFolder.newFolderName.$setPristine();
                $scope.newFolder.newFolderName.$setUntouched();
                
            }
            
    
            $scope.$watch("newFolderName", validateFolderName);
            
        }
            

        return NewFolderController;
    }
);
