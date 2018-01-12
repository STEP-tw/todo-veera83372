let handleLoginStatus = function () {
  console.log(this.response);
  if(this.response != 'false')
    document.getElementById('user').innerHTML=this.response;
}


let getLoginStatus= function () {
  let xml= new XMLHttpRequest();
  xml.onload=handleLoginStatus;
  xml.open('get','/loginStatus');
  xml.send();
}

window.onload = function () {
   getLoginStatus();
 };
