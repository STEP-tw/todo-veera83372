const servFile = require('./serverLib/servFile.js');
const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
const TodoApp = require('./lib/TodoApp.js');
let todoApp=new TodoApp(process.env.TODO_STORE||'./data/todoLists.json');
todoApp.loadTodos();

const toHTML=function (todoLists) {
  let htmlStr=' ';
  todoLists.forEach((todoList,index)=>{
    htmlStr +=`<input type='text' value='${todoList.getTitle()}'  id='${index}_title' disabled />`
    htmlStr +=`<input type='text' value='${todoList.getDescription()}'  id='${index}_desc' disabled /><br>`
  });
  return htmlStr;
}

const resourceNotFound = function (req,res) {
  res.statusCode=404;
  res.write('resource not found');
  res.end();
}

const serverUserTodoList= function (req,res) {
  let header={'content-type':'text/html'};
  if(todoApp.todos[req.user.userName])
    return res.respond(toHTML(todoApp.todos[req.user.userName].todoLists),200,header);
  return res.respond('<b>no lists found</b>',200,header);
}

const getUserInfoAsHtml = function (user) {
  return `<h3> hello ${user.name}
  </h3>
  <a href='/logout' > Logout </a>`;
}

const serveUserListItems= function (req,res) {
  
}

const redirectLoggedOutUserToLogin = function (req,res) {
  if(req.urlIsOneOf(['/','/home.html','/logout','/addList']) && !req.user)
    res.redirect('login.html');
}

let registered_users = [{userName:'veera',name:'veera venkata durga prasad'}];

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

let respondWithLoginStatus = function (req,res) {
  let loginStatus;
  if(req.user){
    res.respond(getUserInfoAsHtml(req.user),200,{'content-type':'text/html'});
  }else{
    res.respond('false',200,{});
  }
}

let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/login.html']) && req.user) res.redirect('/home.html');
}


let app = WebApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);

app.get('/loginStatus',respondWithLoginStatus);
app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logOn=false`);
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('home.html');
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login.html');
});

app.get('/lists',serverUserTodoList);

app.get('/items',serveUserListItems);
app.postProcess(servFile);
app.postProcess(resourceNotFound);

module.exports=app;
