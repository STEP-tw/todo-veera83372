const TodoList = require('./todoList.js');
const TodoItem= require('./todoItem.js')
const UserTodo =function (name) {
 this.user=name;
 this.todoLists=[];
}

UserTodo.prototype={
  addTodoList:function(title,desc){
    this.todoLists.push(new TodoList(title,desc));
  },
  map:function(mapperFn){
    return this.todoLists.map(mapperFn);
  },
  addTodoItem:function(listId,title){
    this.todoLists[listId].addItem(new TodoItem(title));
  },
  updateList:function(listId,title,desc){
    this.todoLists[listId].updateTitle(title);
    this.todoLists[listId].updateDescription(desc);
  },
  updateItemTitle:function(listId,itemId,title){
    this.todoLists[listId].todoItems[itemId].updateTitle(title);
  },
  updateItemStatus:function(listId,itemId){
    this.todoLists[listId].todoItems[itemId].updateStatus();
  },
  deleteList:function(listId){
    this.todoLists.splice(listId,1);
  }

};

module.exports=UserTodo;
