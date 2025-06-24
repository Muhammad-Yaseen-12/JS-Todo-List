var userData = JSON.parse(localStorage.getItem("userValue")) || [];
var input = document.getElementById("input");
var ul = document.getElementById("ul");
let editIndex = null;

const reload = () => {
    ul.innerHTML = "";
    if (userData.length === 0) {
        ul.innerHTML = `<li style="text-align:center; color:#aaa;">No tasks yet</li>`;
    } else {
        for (var i = 0; i < userData.length; i++) {
            var value = userData[i].text;
            ul.innerHTML += `
                <li>
                    <span>${value}</span>
                    <span class="actions">
                        <button class="edit-btn" onclick="edit(${i})">Edit</button>
                        <button class="delete-btn" onclick="deleteItem(${i})">Delete</button>
                    </span>
                </li>
            `;
        }
    }
}

const deleteAll = () => {
    if(userData.length === 0) {
        Swal.fire('No tasks to delete!', '', 'info');
        return;
    }
    Swal.fire({
        title: 'Are you sure?',
        text: "This will delete all your tasks!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4d4d',
        cancelButtonColor: '#2b6777',
        confirmButtonText: 'Yes, delete all!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("userValue");
            userData = [];
            reload();
            Swal.fire('Deleted!', 'All tasks have been deleted.', 'success');
        }
    });
}

const submit = () => {
    var todoText = input.value.trim();
    if (todoText !== "") {
        if (editIndex !== null) {
            userData[editIndex].text = todoText;
            editIndex = null;
            Swal.fire('Updated!', 'Task updated successfully.', 'success');
        } else {
            var newTask = {
                text: todoText,
            }
            userData.push(newTask);
            Swal.fire('Added!', 'Task added successfully.', 'success');
        }
        localStorage.setItem("userValue", JSON.stringify(userData));
        input.value = "";
        reload();
    } else {
        Swal.fire('Please enter a task!', '', 'warning');
    }
}

const deleteItem = (index) => {
    Swal.fire({
        title: 'Delete this task?',
        text: `"${userData[index].text}" will be deleted!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4d4d',
        cancelButtonColor: '#2b6777',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            userData.splice(index, 1);
            localStorage.setItem("userValue", JSON.stringify(userData));
            reload();
            Swal.fire('Deleted!', 'Task has been deleted.', 'success');
        }
    });
}

const edit = (index) => {
    input.value = userData[index].text;
    editIndex = index;
}

window.onload = reload;

