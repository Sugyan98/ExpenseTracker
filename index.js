var form = document.getElementById('addForm');
var userList = document.getElementById('users');
var newExpense = document.getElementById('expense_amount');
var itemDescription = document.getElementById('description');
var expenseCategory = document.getElementById('category');

form.addEventListener('submit', addItem);

userList.addEventListener('click', removeItem);

function addItem(e){
    e.preventDefault();
  
    const li = document.createElement('li');

    li.innerHTML = `${newExpense.value} - <span>${itemDescription.value}</span> - ${expenseCategory.value}`;

    li.className = 'list-group-item';
  
    var deleteBtn = document.createElement('button');
  
    var editBtn = document.createElement('button');
  
    editBtn.className = 'btn btn-secondary btn-sm float-right edit';
  
    editBtn.appendChild(document.createTextNode('Edit Expense'));
  
    editBtn.setAttribute('style', 'margin : 3px')
  
    li.appendChild(editBtn);
  
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  
    deleteBtn.appendChild(document.createTextNode('Delete Expense'));
  
    li.appendChild(deleteBtn);
  
    userList.appendChild(li);

    let myObj = {
      expense: newExpense.value,
      description: itemDescription.value,
      category: expenseCategory.value
    };
  
    let myObj_serialized = JSON.stringify(myObj);

    localStorage.setItem(itemDescription.value, myObj_serialized);

    newExpense.value = '';
    itemDescription.value = '';
    expenseCategory.value = '';

  }
  
  function removeItem(e){
    if(e.target.classList.contains('delete')){
      var li = e.target.parentElement;
      userList.removeChild(li);
      console.log(li.firstElementChild.innerHTML);
      localStorage.removeItem(li.firstElementChild.innerHTML);
    }
    else if(e.target.classList.contains('edit')){
      var li = e.target.parentElement;
      var myObj_parsed = JSON.parse(localStorage.getItem(li.firstElementChild.innerHTML));

      userList.removeChild(li);
      localStorage.removeItem(li.firstElementChild.innerHTML);
        
      newExpense.value = myObj_parsed.expense;
      itemDescription.value = myObj_parsed.description;
      expenseCategory.value = myObj_parsed.category;
    }
  }