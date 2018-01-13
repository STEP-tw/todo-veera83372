
const saveEditedList = function (todoApp,req,res) {
  let user=req.user.userName;
  let body=req.body;
  todoApp.updateList(user,body.listId,body.title,body.desc);
  res.redirect('/home.html');
}

const saveEditedItem = function (todoApp,req,res) {
  let user=req.user.userName;
  let body=req.body;
  todoApp.updateItem(user,body.listId,body.itemId,body.title);
  serveUserListItems(todoApp,req,res);
}

const listToHTML=function (todoLists) {
  let htmlStr=' ';
  todoLists.forEach((todoList,index)=>{
    htmlStr +=`<input type='text' value='${todoList.getTitle()}'  id='${index}_title' disabled />`
    htmlStr +=`<input type='text' value='${todoList.getDescription()}'  id='${index}_desc' disabled />
    <button type='button' onclick="editList('${index}_title','${index}_desc')" >Edit</button>
    <button type='button' style='display:none' id='${index}_title__${index}_desc' onclick="saveEditedList('${index}_title','${index}_desc')">save</button>
    <button type='button' onclick="deleteList('${index}_title','${index}_desc')">delete list</button>
    <button type='button' onclick="viewItems('${index}_title','${index}_desc')">view Items</button>
    <br>`;
  });
  return htmlStr;
}

const deleteUserList = function (todoApp,req,res) {
  let user=req.user.userName;
  console.log(user,req.body.titleId)
  todoApp.deleteTodoList(user,req.body.titleId);
  res.redirect('/home.html');
}
const resourceNotFound = function (req,res) {
  res.statusCode=404;
  res.write('resource not found');
  res.end();
}

const serverUserTodoList= function (todoApp,req,res) {
  let header={'content-type':'text/html'};
  if(todoApp.todos[req.user.userName])
    return res.respond(listToHTML(todoApp.todos[req.user.userName].todoLists),200,header);
  return res.respond('<b>no lists found</b>',200,header);
}


const itemsToHTML =function (todoItems,listId) {
  let htmlStr='';
  todoItems.forEach((item,index)=>{
    let itemInInput=`<input type='text' value='${item.getTitle()}'  id='${index}_${listId}'  disabled/>`;
    let swapButtonText='done';
    if(item.getStatus()){
    htmlStr +=`<input type='text' style="color:green" value='${item.getTitle()}' onclick="updateItemStatus('${index}','${listId}')" id='${index}_${listId}'  disabled/>`;
    swapButtonText='undone';
    }else{
    htmlStr +=itemInInput;
  }

    htmlStr +=`<button type='button'  onclick="editItem('${index}','${listId}')" >Edit</button>
    <button type='button'  onclick="updateItem('${index}','${listId}')" >${swapButtonText}</button>
    <button type='button' style="display:none"  id="${index}__${listId}" onclick="saveEditedItem('${index}','${listId}')">save Item</button>
    <button type='button' onclick="deleteItem('${index}','${listId}')">delete Item</button>

    <br>`
  })
  return htmlStr;
}

const addItem = function (todoApp,req,res) {
  let user=req.user.userName;
  let listId=req.body.listId;
  let title=req.body.title;
  todoApp.todos[user].addTodoItem(listId,title);
  todoApp.saveTodos();
  serveUserListItems(todoApp,req,res);
}

const updateItemStatus = function (todoApp,req,res) {
  let user=req.user.userName;
  let body=req.body;
  todoApp.updateItemStatus(user,body.listId,body.itemId);
  serveUserListItems(todoApp,req,res);
}

const deleteItem = function (todoApp,req,res) {
  let user=req.user.userName;
  let listId=req.body.listId;
  todoApp.deleteListItem(user,listId,req.body.itemId);
  serveUserListItems(todoApp,req,res);
}

const serveUserListItems= function (todoApp,req,res) {
  let user=req.user.userName;
  let listId=req.body.listId;
  let todoItems=todoApp.todos[user].todoLists[listId].todoItems;
  let listTitle=todoApp.todos[user].todoLists[listId].getTitle();
  let header={
    'content-type':'text/html'
  }
  let userTodoItemsAsHtml=`<h2>${listTitle}</h2>`;
  userTodoItemsAsHtml += itemsToHTML(todoItems,listId);
  res.respond(userTodoItemsAsHtml,200,header);
}

const addUserTodoList=function (todoApp,req,res) {
  let user=req.user.userName;
  todoApp.addTodoOfUser(user,req.body.title,req.body.desc);
  res.redirect('/home.html');
}

module.exports={
  saveEditedList:saveEditedList,
  saveEditedItem:saveEditedItem,
  deleteUserList:deleteUserList,
  addUserTodoList:addUserTodoList,
  serveUserListItems:serveUserListItems,
  deleteItem:deleteItem,
  updateItemStatus:updateItemStatus,
  addItem:addItem,
  serverUserTodoList:serverUserTodoList,
  resourceNotFound:resourceNotFound

}
