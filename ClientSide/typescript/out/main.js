"use strict";
var btnArray = [];
var Button = /** @class */ (function () {
    function Button(studentId, name) {
        var _a;
        this.studentId = studentId;
        this.name = name;
        this.btn = document.getElementById('btnTs');
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.create);
    }
    Button.prototype.create = function () {
        var input = document.getElementById('inputTs');
        var tableBody = document.getElementById('tableBody');
        var studentId = btnArray.length + 1;
        var name = "".concat(input === null || input === void 0 ? void 0 : input.value);
        //New Row
        var newRow = document.createElement('tr');
        newRow.innerHTML = "\n            <td>".concat(studentId, "</td>\n            <td>").concat(name, "</td>\n            <td><button class=\"editBtn\">Edit</button></td>\n            <td><button class=\"deleteBtn\">Delete</button></td>\n        ");
        //Edit Button
        var editBtn = newRow.querySelector('.editBtn');
        if (editBtn) {
            editBtn.addEventListener('click', function () {
                console.log("Edit");
            });
        }
        //Delete Button
        var deleteBtn = newRow.querySelector('.deleteBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
                console.log("Delete");
            });
        }
        //Append Row
        if (tableBody) {
            console.log("hej");
            tableBody.appendChild(newRow);
        }
        var newBtn = new Button(studentId, name);
        btnArray.push(newBtn);
    };
    return Button;
}());
var aa = new Button(1, 'a');
