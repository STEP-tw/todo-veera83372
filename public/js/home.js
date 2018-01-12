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

let addList = function(){
  let title=document.getElementById('title').value;
  let desc=document.getElementById('desc').value;
  if(title.length>0&&desc.length>0)
    doXMLRequest('post','/addList',function(){window.location.reload()},`title=${title}&desc=${desc}`);
}

let addItem =function (listId) {
  let title=document.getElementById('item-title').value;
  if(title.length>0)
    doXMLRequest('post','/addItem',function(){
    document.getElementById('items').innerHTML=this.response;
  },`title=${title}&listId=${listId}`);
}


let viewItems =function (titleId,descId) {
  let listId=titleId.split('_')[0];
    doXMLRequest('post','/items',function(){
      document.getElementById('items').innerHTML=this.response;
    },`listId=${listId}`);
    document.getElementById('addItem').style.display="block";
    document.getElementById('addItemButton').onclick=addItem.bind(null,listId);
}



let editList = function(titleId,descId){
  document.getElementById(titleId).disabled = false;
  document.getElementById(descId).disabled = false;
  document.getElementById(titleId+'__'+descId).style.display = "block";
}

let saveEditedList = function (titleId,descId) {
  let title=document.getElementById(titleId).value;
  let desc=document.getElementById(descId).value;
  if(title.length>0&&desc.length>0)
    doXMLRequest('post','/saveEditedList',function(){window.location.reload()},`title=${title}&desc=${desc}&listId=${titleId.split('_')[0]}`);
}

let deleteList= function (titleId,descId) {
  doXMLRequest('post','/deleteList',function(){window.location.reload()},`listId=${titleId.split('_')[0]}`);
}
window.onload = function () {
  doXMLRequest('get','/loginStatus',handleLoginStatus);
  doXMLRequest('get','/lists',displayList);
 };
