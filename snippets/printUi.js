var myDoc = app.activeDocument;
var appVars = myDoc.textVariables;
var inkList = myDoc.inks.everyItem().name;
var dialogCheckList = [];

var outputDialog = app.dialogs.add({
  name: 'Output',
  canCancel: true,
});

var dlgBlock1 = outputDialog.dialogColumns.add();
var dlgBlock2 = dlgBlock1.dialogRows.add();
var dlgBlock3 = dlgBlock2.dialogColumns.add();
var dlgCheck = dlgBlock3.checkboxControls.add(createCheckboxes());

function createCheckboxes() {
  for (i = 0; i < inkList.length; i++) {
    dialogCheckList.push(
      dlgBlock3.checkboxControls.add({
        staticLabel: inkList[i],
        checkedState: false,
      }),
    );
    dialogCheckList.push(
      dlgBlock3.angleEditboxes.add({
        staticLabel: inkList[i],
        editValue: 180,
      }),
    );
  }
}

// with (outputDialog.dialogColumns.add()) {
//   with (dialogRows.add()) {
//     with (dialogColumns.add()) {
//       for (i = 0; i < inkList.length; i++) {
//         with (dialogRows.add())
//           //.push adds items to an array
//           dialogCheckList.push(
//             checkboxControls.add({
//               staticLabel: inkList[i],
//               checkedState: false,
//             }),
//           );
//         dialogCheckList.push(
//           angleEditboxes.add({
//             staticLabel: inkList[i],
//             editValue: 180,
//           }),
//         );
//       }
//     }
//   }
// }

outputDialog.show();
