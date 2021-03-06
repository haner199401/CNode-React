import React  from  'react';
import Router from 'react-router';
import $      from 'jquery';
import Routes from './routes.jsx';

const CLIENT_VARIABLENAME = '__REACT_ENGINE__';

var _window;
var _document;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    _window = window;
    _document = document;
}


document.addEventListener('DOMContentLoaded', function onLoad() {
    Router.run(Routes, Router.HistoryLocation, function onRouterRun(Root, state) {
        var props = _window[CLIENT_VARIABLENAME];
        if (props) {
            var componentInstance = React.createElement(Root, props);
            React.render(componentInstance, _document);
            _window[CLIENT_VARIABLENAME] = null;
        } else {
            $.get(state.path).then(function (data) {
                var componentInstance = React.createElement(Root, data);
                React.render(componentInstance, _document);
            });
        }
    });
});