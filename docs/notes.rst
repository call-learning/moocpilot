Development notes
--


Adding testURL parameter to package.json, prevents issue with JSDOM, see https://github.com/jsdom/jsdom/issues/2304


Integrate the application into edX
--

::
    <p>Add the content you want students to see on this page.</p>
    <div id="root"></div>
    <script>
    global._babelPolyfill = false;
    moocpilotfrontendbaseurl='http://moocpilotv2-frontend.local/';
    </script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
    <script src="http://moocpilotv2-frontend.local/runtime.js" crossorigin></script>
    <script src="http://moocpilotv2-frontend.local/vendors~moocpilot-frontend.js" crossorigin></script>
    <script src="http://moocpilotv2-frontend.local/moocpilot-frontend.js" crossorigin></script>
::


::
    <div id="root"></div>
    <script>
        global._babelPolyfill = false;
        moocpilotfrontendbaseurl='https://call-learning.github.io/moocpilot/ressources/';
    </script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://call-learning.github.io/moocpilot/ressources/runtime.js" crossorigin></script>
    <script src="https://call-learning.github.io/moocpilot/ressources/vendors~moocpilot-frontend.js" crossorigin></script>
    <script src="https://call-learning.github.io/moocpilot/ressources/moocpilot-frontend.js" crossorigin></script>
::
