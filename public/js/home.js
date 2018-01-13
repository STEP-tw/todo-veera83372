let handleLoginStatus = function () {
  if(this.response != 'false')
    document.getElementById('user').innerHTML=this.response;
}


let doXMLRequest= function (method,url,callback,data) {
  let xml= new XMLHttpRequest();
  xml.onload=callback;
  xml.open(method,url);
  xml.send(data);
}

let displayList = function () {
  document.getElementById('lists').innerHTML=this.response;
}

let displayItem = function () {
  document.getElementById('items').innerHTML=this.response;
}
let addList = function(){
  let title=document.getElementById('title').value;
  let desc=document.getElementById('desc').value;
  if(title.length>0&&desc.length>0){
    doXMLRequest('post','/addList',displayList,`title=${title}&desc=${desc}`);
    document.getElementById('title').value='';
    document.getElementById('desc').value='';
  }

}

let addItem =function (listId) {
  let title=document.getElementById('item-title').value;
  document.getElementById('item-title').value='';
  if(title.length>0)
    doXMLRequest('post','/addItem',displayItem,`title=${title}&listId=${listId}`);
}


let viewItems =function (titleId,descId) {
  let listId=titleId.split('_')[0];
    doXMLRequest('post','/items',displayItem,`listId=${listId}`);
    document.getElementById('addItem').style.display="block";
    document.getElementById('addItemButton').onclick=addItem.bind(null,listId);
}

let deleteItem=function (index,listId) {
  doXMLRequest('post','/deleteItem',displayItem,`listId=${listId}&itemId=${index}`);
}


let editItem = function(itemId,listId){
  document.getElementById(itemId+'_'+listId).disabled = false;
  document.getElementById(itemId+'__'+listId).style.display = "block";
}

let saveEditedItem = function (itemId,listId) {
  let title=document.getElementById(itemId+'_'+listId).value;
  if(title.length>0)
    doXMLRequest('post','/saveEditedItem',displayItem,`title=${title}&itemId=${itemId}&listId=${listId}`);
}


let editList = function(titleId,descId){
  document.getElementById(titleId).disabled = false;
  document.getElementById(descId).disabled = false;
  document.getElementById(titleId+'__'+descId).style.display = "block";
}

let updateItem = function (itemId,listId) {
  doXMLRequest('post','/updateItemStatus',displayItem,`itemId=${itemId}&listId=${listId}`);
}

let saveEditedList = function (titleId,descId) {
  let title=document.getElementById(titleId).value;
  let desc=document.getElementById(descId).value;
  if(title.length>0&&desc.length>0)
    doXMLRequest('post','/saveEditedList',displayList,`title=${title}&desc=${desc}&listId=${titleId.split('_')[0]}`);
}

let deleteList= function (titleId,descId) {
  doXMLRequest('post','/deleteList',displayList,`listId=${titleId.split('_')[0]}`);
  document.getElementById('addItem').style.display="none";
  document.getElementById('items').innerHTML='';
}
window.onload = function () {
  doXMLRequest('get','/loginStatus',handleLoginStatus);
  doXMLRequest('get','/lists',displayList);
 };
