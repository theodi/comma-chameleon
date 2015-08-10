/**
 * Created by stephenfortune on 10/08/15.
 */
var remote = require('remote');
var dialog = remote.require('dialog');
var fs = require('fs');
var container = document.getElementById("editor");

data = [['', '', ''], ['', '', '']];
var hot = new Handsontable(container, {
    data: data,
    colHeaders: true,
    rowHeaders: true,
    columnSorting: true,
    contextMenu: true
});

function openFile() {
    dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['csv'] }
    ]}, function (fileNames) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];
        fs.readFile(fileName, 'utf-8', function (err, data) {
            csv = $.csv.toArrays(data);
            hot.loadData(csv)
        });
    });
}

function saveFile () {
    dialog.showSaveDialog({ filters: [
        { name: 'text', extensions: ['csv'] }
    ]}, function (fileName) {
        if (fileName === undefined) return;
        debugger;
        fs.writeFile(fileName, hot.getData(), function (err) {
        });
    });
}
