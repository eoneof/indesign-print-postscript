function addavar(name, content) {
  // custom forEach ---------------------------------
  function forEach(arr, callback) {
    for (var i = 0, l = arr.length; i < l; i += 1) {
      callback(arr[i]);
    }
  }
  // ------------------------------------------------

  var doc = app.activeDocument;
  var docVars = doc.textVariables;

  var inkStorageContent = [];

  // CREATE DOCUMENT'S VARIABLES
  function checkDocVarExist(varName) {
    return docVars.itemByName(varName).isValid;
  }

  function addDocVar(varName, callback) {
    if (!checkDocVarExist(varName)) {
      var docVarItem = docVars.add({ name: varName });
      callback(docVarItem); // add variable's content
    } else {
      callback(varName); // update variable's content
    }
  }

  function addDocVarContent(docVarItem, content) {
    docVars.itemByName(docVarItem).variableOptions.contents = content;
  }

  function defineDocVar(varName, content) {
    addDocVar(
      varName,
      // callback
      function (docVarItem) {
        addDocVarContent(docVarItem, content);
      },
    );
  }

  defineDocVar('Test name', 'Test Data');
  // create document's variables //
}
