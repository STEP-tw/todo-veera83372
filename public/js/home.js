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


window.onload = function () {
  doXMLRequest('get','/loginStatus',handleLoginStatus);
  doXMLRequest('get','/lists',displayList);
 };
