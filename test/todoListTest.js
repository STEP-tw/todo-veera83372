const TodoList = require('../lib/todoList.js');
let chai = require('chai');
let assert = chai.assert;

let todoList;

describe('ToDo List accessing data',()=>{
  beforeEach(()=>{
    todoList=new TodoList('demo list','dummy');
  })
  describe('getTitle()',()=>{
    it('gives title of todo list',()=>{
      let expected='demo list';
      let actual=todoList.getTitle();
      assert.equal(actual,expected);
    })
  });
  describe('getDescription',()=>{
    it('gives description of todo list',()=>{
      let expected='dummy';
      let actual=todoList.getDescription();
      assert.equal(actual,expected);
    })
  });
  describe('getItems',()=>{
    it('gives items of todo list',()=>{
      let expected=[];
      let actual=todoList.getItems();
      assert.deepEqual(actual,expected);
    })
  });
})

describe('ToDo List modifying data',()=>{
  describe('update title',()=>{
    beforeEach(()=>{
      todoList=new TodoList('demo','dummy');
    })
    it('updates the title of list with given title',()=>{
      let expected='demo list';
      todoList.updateTitle('demo list');
      let actual=todoList.getTitle()
      assert.equal(actual,expected);
    })
  });

  describe('update description',()=>{
    beforeEach(()=>{
      todoList=new TodoList('demo','dummy');
    })
    it('updates the description of list with given description',()=>{
      let expected='dummy list';
      todoList.updateDescription('dummy list');
      let actual=todoList.getDescription()
      assert.equal(actual,expected);
    })
  })

  describe('addItem',()=>{
    beforeEach(()=>{
      todoList=new TodoList('demo','dummy');
    })
    it('adds item to list items ',()=>{
      let expected=['dummy item'];
      todoList.addItem('dummy item');
      let actual=todoList.getItems()
      assert.deepEqual(actual,expected);
    })
  })

  describe('deleteItem',()=>{
    beforeEach(()=>{
      todoList=new TodoList('demo','dummy');
    })
    it('delete item from list items ',()=>{
      todoList.addItem('dummy item');
      todoList.deleteItem(0);
      let actual=todoList.getItems()
      assert.deepEqual(actual,[]);
    })
  })

})
