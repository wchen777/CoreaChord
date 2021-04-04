import { useEffect } from 'react';
/*
 * Workaround for using external js files in React from
 * https://www.codegrepper.com/code-examples/javascript/load+external+js+file+in+react
 */

const MIDIjsScripts = () => {
  useEffect(() => {
    const importScriptURLs = ["./inc/shim/Base64.js", "./inc/shim/Base64binary.js", "./inc/shim/WebAudioAPI.js",
      "./js/midi/audioDetect.js", "./js/midi/gm.js", "./js/midi/loader.js", "./js/midi/plugin.audiotag.js",
      "./js/midi/plugin.webaudio.js", "./js/midi/plugin.webmidi.js", "./js/util/dom_request_xhr.js",
      "./js/util/dom_request_script.js"];
    const scriptsToRemove = [];

    for (let i = 0; i < importScriptURLs.length; i++) {
      const script = document.createElement('script');

      script.src = importScriptURLs[i];
      script.async = true;

      document.body.appendChild(script);
      scriptsToRemove.push(script);
    }

    return () => {
      for (let i = 0; i < scriptsToRemove.length; i++) {
        document.body.removeChild(scriptsToRemove[i]);
      }
    }
  }, []);
};

export default MIDIjsScripts;