const UserTodo=require('./userTodo.js');
const TodoList = require('./todoList.js');
const TodoItem = require('./todoItem.js');
const fs = require('fs');
const TodoApp = function (path) {
  this.path=path;
  this.todos={};
};

TodoApp.prototype= {
  loadTodos:function(){
    fs.readFile(this.path,'utf8',(err,content)=>{
    if(err||content==""){
      this.todos={};
      return ;
    }
    this.todos=JSON.parse(content);
    let users=Object.keys(this.todos);
    let todos=this.todos;
    users.forEach(userTodo=>{
      todos[userTodo].__proto__=new UserTodo().__proto__;
      todos[userTodo].todoLists.forEach(todoList=>{
        todoList.__proto__=new TodoList().__proto__;
        todoList.todoItems.forEach(todoItem=>{
          todoItem.__proto__=new TodoItem().__proto__;
        })
      })
    })
  })
},
  addTodoOfUser:function(user,title,desc){
    if(!this.todos[user]) this.todos[user]=new UserTodo(user);
    this.todos[user].addTodoList(title,desc);
    this.saveTodos();
  },
  saveTodos:function () {
    fs.writeFileSync(this.path,JSON.stringify(this.todos,null,2),'utf8');
  }
  ,deleteTodoList:function(user,listId){
    this.todos[user].deleteList(listId);
    this.saveTodos();
  },
  deleteListItem:function(user,listId,itemId){
    this.todos[user].todoLists[listId].deleteItem(itemId);
    this.saveTodos();
  },
  updateList:function(user,listId,title,desc){
    this.todos[user].updateList(listId,title,desc);
    this.saveTodos();
  }
};

module.exports=TodoApp;
