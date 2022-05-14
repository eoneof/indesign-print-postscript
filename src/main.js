#target InDesign
#targetengine "postscript" // any name

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

function handleNoInks() {
    alert('There are no inks in the document');
}

// CREATE DOCUMENT'S VARIABLES --------------------
function checkDocVarExist(varName) {
    return docVars.itemByName(varName).isValid;
}

function addDocVar(varName, callback) {
    if (!checkDocVarExist(varName)) {
        var docVarItem = docVars.add({
            name: varName
        });
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
        function(docVarItem) {
            addDocVarContent(docVarItem, content);
        },
    );
}

defineDocVar('Test Name', 'Test Content');
// -------------------- create document's variables

// // TODO: iterate object
// function getDocInks() {
//     var items = doc.inks.everyItem().name; // object
//     alert(items);
//     // return doc.inks.everyItem(); // .name // object
// }

// function putInksToStorage() {
//     forEach(getDocInks(), function(item) {
//         var content = inkStorageContent.push(item.name + ':' + item.angle);
//         return content;
//     });
// }
// alert(putInksToStorage());

// defineDocVar('inkStorage_0', putInksToStorage());

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

// call foreach example
// forEach(nums, function (item) {
//   arr1.push(item);
// });

// // finally convert into object: map ink to angle
// for (var i = 0, l = arr1.length; i < l; i += 1) {
//   var kv = arr1[i].split(':');
//   inkObj[kv[0]] = kv[1];
// }
// alert(inkObj.toSource());
