const TodoItem = function (title,status=false) {
  this.title=title;
  this.status=status;
  this.date=new Date().toString();
}

TodoItem.prototype={
  getTitle:function () {
    return this.title;
  },
  getStatus:function () {
    return this.status;
  },
  updateStatus:function () {
    this.status = !this.status;
  },
  updateTitle:function (title) {
    this.title=title;
  }
}

module.exports=TodoItem;
