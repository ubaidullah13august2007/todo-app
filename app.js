var firebaseConfig = {
    apiKey: "AIzaSyBpgZJyHfgQpZfp9P1cN_9yyAtMe8Ik2TI",
    authDomain: "last-class-of-html-9fee5.firebaseapp.com",
    databaseURL: "https://last-class-of-html-9fee5-default-rtdb.firebaseio.com",
    projectId: "last-class-of-html-9fee5",
    storageBucket: "last-class-of-html-9fee5.appspot.com",
    messagingSenderId: "1072176098344",
  appId: "1:1072176098344:web:b3ab481b71a87e13ce591d"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
 
 var db = firebase.database()

 firebase.database().ref("todos").on("child_added",function(data) {


    var liEle = document.createElement('li');
    
    var liTxt = document.createTextNode(data.val().value);
    
    liEle.appendChild(liTxt);
    
    var lit = document.getElementById("list");
    
    lit.appendChild(liEle);
    
    var editBtnElemt = document.createElement('button');
    
    var editBtnTxt = document.createTextNode("Edit");
    
    editBtnElemt.appendChild(editBtnTxt);
    editBtnElemt.setAttribute("class",'edit')
    editBtnElemt.setAttribute("onclick",'editItem(this)')
    editBtnElemt.setAttribute("id", data.val().key);
    
    liEle.appendChild(editBtnElemt);
    
    var delBtnElemt = document.createElement('button');
    
    var delBtnTxt = document.createTextNode("Delete");
    
    delBtnElemt.appendChild(delBtnTxt);
    delBtnElemt.setAttribute("class",'del')
    delBtnElemt.setAttribute("onclick",'deleteItem(this)')
    delBtnElemt.setAttribute("id",data.val().key);
    
    liEle.appendChild(delBtnElemt);
});

function addtodo() {
    var input = document.getElementById("todoInput");
      var key = Date.now().toString(26);
    
      var todos = {
        value: input.value,
        key,
      };

      firebase
      .database()
      .ref("todos/" + key)
      .set(todos);
    
    input.value = "";
    
    }

  
  function deleteAll() {
    firebase.database().ref("todos").remove();
    list.innerHTML = "";
  }
  
  function deleteItem(e) {
    firebase.database().ref(`todos/${e.id}`).remove();
   e.parentNode.remove()
  }
  
  function editItem(e) {
    var updateValue = prompt(
        "Enter updated value",
        e.parentNode.firstChild.nodeValue
    );
  firebase.database().ref(`todos/${e.id}`).set({
    key:e.id,
    todoVal:updateValue,
  });
  e.parentNode.firstChild.nodeValue = updateValue
 
  }