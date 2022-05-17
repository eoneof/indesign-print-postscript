#target InDesign
#targetengine "postscript" // any name

// ------------------------------------------------
// ITERATE

// custom `forEach()` 
function iterateArray(arr, callback) {
    for (var i = 0, l = arr.length; i < l; i += 1) {
        callback(arr[i]);
    }
}

/// custom `for (var ... in ...)`
function iterateObject(obj, callback) {
    for (var i = 0, l = obj.count(); i < l; i += 1) {
        callback(obj[i])
    }
}

// ------------------------------------------------

var doc = app.activeDocument;
var docVars = doc.textVariables;

var initialInks = [];
var modifiedInks = [];

function handleNoInks() {
    alert('There are no inks in the document');
}

// CREATE DOCUMENT'S TEXT VARIABLES --------------------
function isExistVar(docVarName) {
    return docVars.itemByName(docVarName).isValid;
}

function createDocVar(docVarName, content, callback) {
    if (!isExistVar(docVarName)) {
        var docVarItem = docVars.add({
            name: docVarName
        });
        callback(docVarItem, content); // add variable's content
    } else {
        callback(docVarName, content); // update variable's content
    }
}

function modifyDocVarContent(docVarItem, content) {
    docVars.itemByName(docVarItem).variableOptions.contents = content;
}

function defineNewDocVar(docVarName, content) {
    createDocVar(
        docVarName,
        content,
        /* callback */ function(docVarItem, content) {
            modifyDocVarContent(docVarName, content);
        },
    );
}

// defineNewDocVar('_Test Name', 'Mock Data');

// -------------------- create document's variables

function getDocInks() {
    var items = doc.inks // object
    iterateObject(items, /* callback */ function (item) {
        initialInks.push(item.name + ":" + item.angle)
    })
        return initialInks.toString()
}

defineNewDocVar('initialInks', getDocInks());

// var c = doc.inks.itemByName('Process Cyan');
// alert(c.angle);

// // var storedInkItem = inkValues.variableOptions.contents.split(',');
// var arr1 = [];
// var inkObj = {};
// var init = { c: 1, m: 2, y: 3, k: 4 };

// // convert string into array
// for (var i = 0, l = storedInkItem.length; i < l; i += 1) {
//   arr1.push(storedInkItem[i]);
// }

// call iterateArray example
// iterateArray(nums, function (item) {
//   arr1.push(item);
// });

// // finally convert into object: map ink to angle
// for (var i = 0, l = arr1.length; i < l; i += 1) {
//   var kv = arr1[i].split(':');
//   inkObj[kv[0]] = kv[1];
// }
// alert(inkObj.toSource());
