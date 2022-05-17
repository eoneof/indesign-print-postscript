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
// STORE DOCUMENT'S INKS PROPERTIES INTO TEXT VARIABLE

var doc = app.activeDocument;
var docVars = doc.textVariables;

var inksAngles = [];
var modifiedInks = [];

// function handleNoInks() {
//     alert('There are no inks in the document');
// }

// CREATE DOCUMENT'S TEXT VARIABLES --------------------
function isExistVar(docVarName) {
    return docVars.itemByName(docVarName).isValid;
}

function createDocVar(docVarName, content, callback) {
    var docVarItem = docVars.add({
        name: docVarName
    });
    callback(docVarItem.name, content); // add variable's content
}

function modifyDocVarContent(docVarItem, content) {
    docVars.itemByName(docVarItem).variableOptions.contents = content;
}

function defineDocVar(docVarName, content) {
    if (!isExistVar(docVarName)) {
        createDocVar(
            docVarName,
            content,
            /* callback */
            function(name, content) {
                modifyDocVarContent(name, content);
            },
        );
    } else {
        return
        // modifyDocVarContent(docVarName, content);
    }
}

// defineDocVar('_Test Name', 'Mock Data');

// -------------------- create document's variables

function storeInksAngles() {
    var items = doc.inks // object
    iterateObject(items, /* callback */ function(item) {
        inksAngles.push(item.name + ":" + item.angle)
    })
    return inksAngles.toString()
}

defineDocVar('inksAngles', storeInksAngles());

// ------------------------------------------------
// READ PROPS FROM VAR

var storedAngles = docVars.itemByName('inksAngles').variableOptions.contents.split(',')

// alert(storedAngles[3])

// // convert string into array
// for (var i = 0, l = storedInkItem.length; i < l; i += 1) {
//   arr1.push(storedInkItem[i]);
// }

// call iterateArray example
// iterateArray(nums, function (item) {
//   arr1.push(item);
// });

// finally convert into object: map ink to angle
for (var i = 0, l = arr1.length; i < l; i += 1) {
    var kv = arr1[i].split(':');
    inkObj[kv[0]] = kv[1];
}
alert(inkObj.toSource());
