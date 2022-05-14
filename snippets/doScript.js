#target indesign
#targetengine "myScript" // any name

#include "./path/to/myScript.js"

app.doScript(myScriptMethod(), ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, 'myScript undo name');
