const TodoList =function (title,desc) {
  this.title=title;
  this.desc=desc;
  this.date=new Date().toString();
  this.todoItems=[];
}

TodoList.prototype=  {
  getTitle:function(){
    return this.title;
  },
  getDescription:function(){
    return this.desc;
  },
  updateTitle:function(title){
    this.title=title;
  },
  updateDescription:function(desc){
    this.desc=desc;
  },
  map:function (mapperFn) {
    return this.todoItems.map(mapperFn);
  },
  deleteItem:function(itemIndex){
    this.todoItems.splice(itemIndex,1);
  },
  addItem:function(todoItem){
    this.todoItems.push(todoItem);
  },
  getItems:function(){
    return this.todoItems;
  }
};

module.exports=TodoList;
