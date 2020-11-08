// initial employees
let employees = [
    {
        lastName: 'Subnaik',
        firstName: 'Rajeve',
        role: 'Front End Developer',
        status: 'In',
        timeIn: new Date('November 7, 2020 05:58:59'),
        timeOut: '-'
    },
    {
        lastName: 'Smith',
        firstName: 'Jane',
        role: 'UI/UX Designer',
        status: 'In',
        timeIn: new Date('November 7, 2020 06:00:05'),
        timeOut: '-'
    },
    {
        lastName: 'Campbell',
        firstName: 'Stacy',
        role: 'iOS Developer',
        status: 'In',
        timeIn: new Date('November 7, 2020 06:00:23'),
        timeOut: '-'
    },
    {
        lastName: 'Dixon',
        firstName: 'Raymond',
        role: 'Python Developer',
        status: 'In',
        timeIn: new Date('November 7, 2020 06:01:46'),
        timeOut: '-'
    }

]

// select dom elements
const addEmployeeBtn = document.getElementsByClassName('add-employee-btn')[0];
const form = document.getElementsByTagName('form')[0];
const formClose = document.getElementsByClassName('close')[0];
const listUl = document.querySelector('ul');
const liAll = listUl.children;
let employee;

// show form when add employee is clicked on mobile
addEmployeeBtn.addEventListener('click', () => {
    form.classList.toggle('show');
})

// close form when close button is clicke on mobile
formClose.addEventListener('click', () => {
    form.classList.toggle('show');
})

// emoloyee info is created and then sent to the addEmployee() 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const lastName = document.getElementById('last_name');
    const firstName = document.getElementById('first_name');
    const role = document.getElementById('role');
    const addEmployee = {
        lastName: lastName.value,
        firstName: firstName.value,
        role: role.value,
        status: 'In',
        timeIn: new Date(),
        timeOut: '-'
    };
    employees.push(addEmployee);
    addEmployeeLi(employees[employees.length - 1]);
    lastName.value = '';
    firstName.value = '';
    role.value = '';
})

// add newEmployeeLi to the end if the list
function addEmployeeLi (employee) {
    const newEmployee = document.createElement('li');
    newEmployee.innerHTML = `
        <h2>${employee.lastName} ${employee.firstName} (<span class="status ${employee.status}">${employee.status}</span>)</h2>
        <h4>Role: ${employee.role}</h4>
        <div class="btns">
            <button class="clock-in">Clock In</button>
            <button class="clock-out">Clock Out</button>
            <button class="remove">Remove</button>   
        </div>
        <div class="time">
            <small>In: <span class="dayIn">${employee.timeIn.toLocaleTimeString()}</span></small>
            <small>Out: <span class="dayOut">${employee.timeOut}</span></small>
            <small>Day Total: <span class="dayTotal"></span></small>    
        </div>`;
    listUl.appendChild(newEmployee);
}

// loop through array of employee objects and create list
function drawListEmployees () {
    for (let i = 0; i < employees.length; i++) {
        employee = employees[i];
        addEmployeeLi(employee)
    }   
}


// add event listner to employee status buttons
listUl.addEventListener('click', (event) => {
    const liIndexes = [];
    for (let i = 0; i < liAll.length; i++) {
        liIndexes.push(liAll[i]);
    }
    if (event.target.tagName == 'BUTTON') {
        // select nodes when a button is clicked
        const liNode = event.target.parentNode.parentNode;
        const index = liIndexes.indexOf(liNode);
        const statusNode = liNode.querySelector('.status');
        const dayIn = liNode.querySelector('.dayIn');
        const dayOut = liNode.querySelector('.dayOut');
        
        // if clocked in button is clicked, employee status is set to in and clock starts
        if (event.target.className == 'clock-in') {
            employees[index].timeIn = new Date();
            employees[index].status = 'In';
            statusNode.classList.add(employees[index].status);
            statusNode.classList.remove('Out');
            statusNode.textContent = employees[index].status;
            dayIn.textContent = employees[index].timeIn.toLocaleTimeString();
            dayOut.textContent = '-';
        } 

        // if clocked out button is clicked, employee status is set to out and clock stops
        if (event.target.className == 'clock-out') {
            employees[index].timeOut = new Date().toLocaleTimeString();
            employees[index].status = 'Out';
            statusNode.classList.add(employees[index].status);
            statusNode.classList.remove('In');
            statusNode.textContent = employees[index].status;
            dayOut.textContent = employees[index].timeOut;
        }
        // employee is removed when clicked
        if (event.target.className == 'remove') {
            console.log(index);
            listUl.removeChild(liNode);
            employees.splice(index, 1);
            liIndexes.splice(index, 1);
        }
    }
    
})

// calculates how long an employee has been clocked in
function setDayTotal () {
    for (let i = 0; i < employees.length; i++) {
        const employeeDay = employees[i];
        if (employeeDay.status == 'In') {
            const dayTotal = liAll[i].querySelector('.dayTotal');
            const currentTime = new Date();
            const timeElapsed = currentTime - employeeDay.timeIn;
            const hh = parseInt((timeElapsed/3600/1000)%24);
            const mm = parseInt((timeElapsed/60/1000)%60);
            const ss = parseInt((timeElapsed/1000)%60);
            dayTotal.textContent = `${hh}h ${mm}m ${ss}s`;
        }

    }
}

drawListEmployees();
// clock updates every second
setInterval(setDayTotal, 1000);
