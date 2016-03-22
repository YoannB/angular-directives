'use strict';

/**
 * Material Design Input with Label
 *
 <form class="pure-md">
     <div md-input="<model>">
        <input tabindex="0" type="text" data-ng-model="<model>" id="" name="" placeholder="">
     </div>
 </form>
 */
angular.module('mdInput', []);
angular.module('mdInput').directive('mdInput', [
    function() {
        return {
            restrict: 'A',
            scope: {
                mdInput: '='
            },
            link: function(scope, element) {
                // try to find input field...
                var input = element.find('input');
                if (!input.length) {
                    // ... else try to find textarea field
                    input = element.find('textarea');
                }
                var placeholder = input.attr('placeholder');
                var label = element.find('label');
                if (label.length === 0) {
                    label = angular.element('<label>');
                    label.text(placeholder);
                    var idInput = input.attr('id');
                    if (!idInput) {
                        idInput = 'input-'+(new Date()).getTime();
                        input.attr('id', idInput);
                    }
                    label.attr('for',idInput);
                    element.prepend(label,input);
                }
                input.removeAttr('placeholder');
                function fillInput (value) {
                    if (value !== undefined && value !== null && value.toString().length > 0) {
                        element.addClass('md-fill');
                    } else {
                        element.removeClass('md-fill');
                    }
                }
                // watch
                scope.$watch('mdInput', function (newValue) {
                    fillInput(newValue);
                });
                // events
                input.on('change', function () {
                    fillInput(input.val());
                });
                input.on('focus', function () {
                    element.addClass('md-focus');
                });
                input.on('blur', function () {
                    element.removeClass('md-focus');
                    fillInput(input.val());
                });
                // init
                fillInput(input.val());
            }
        };
    }
]);
