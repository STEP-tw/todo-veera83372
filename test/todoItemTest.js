const TodoItem = require('../lib/todoItem.js');
let chai = require('chai');
let assert = chai.assert;

let todoItem;

describe('ToDo Item accessing data',()=>{
  describe('getTitle()',()=>{
    beforeEach(()=>{
      todoItem=new TodoItem('demo item');
    })
    it('gives title of item',()=>{
      let expected='demo item';
      let actual=todoItem.getTitle();
      assert.equal(actual,expected);
    })
  })

  describe('getStatus',()=>{
    it('gives status of the item',()=>{
      let actual=new TodoItem('demo item').getStatus();
      assert.isNotOk(actual);
      actual=new TodoItem('demo item',true).getStatus();
      assert.isOk(actual);
    })
  });
})

describe('ToDo Item updating data',()=>{
  describe('update title',()=>{
    beforeEach(()=>{
      todoItem=new TodoItem('demo');
    })
    it('updates the title of item with given title',()=>{
      let expected='demo item';
      todoItem.updateTitle('demo item');
      let actual=todoItem.getTitle()
      assert.equal(actual,expected);
    })
  })

  describe('updateStatus',()=>{
    it('inverts the status of item',()=>{
       todoItem =new TodoItem('demo item');
       todoItem.updateStatus();
      assert.isOk(todoItem.getStatus());
      todoItem.updateStatus();
      assert.isNotOk(todoItem.getStatus());
    })
  });
})
