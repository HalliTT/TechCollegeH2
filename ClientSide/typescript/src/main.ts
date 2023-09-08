interface iBtn {
    studentId: number;
    name: string;
}

let btnArray: any = [];

class Button implements iBtn{
    btn = document.getElementById('btnTs');
    
    constructor(public studentId: number, public name: string) {
        this.btn?.addEventListener('click', this.create);
    }
    
    private create() {
        const input = document.getElementById('inputTs');
        const tableBody = document.getElementById('tableBody');

        const studentId = btnArray.length + 1;
        const name = `${input?.value}`;

        //New Row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${studentId}</td>
            <td>${name}</td>
            <td><button class="editBtn">Edit</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        `;

        //Edit Button
        const editBtn = newRow.querySelector('.editBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                console.log("Edit");
            });
        }

        //Delete Button
        const deleteBtn = newRow.querySelector('.deleteBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                console.log("Delete");
            });
        }

        //Append Row
        if (tableBody) {
            console.log("hej");
            tableBody.appendChild(newRow);
        }

        const newBtn = new Button(studentId, name);
        btnArray.push(newBtn);
    }
}
const aa = new Button(1, 'a');