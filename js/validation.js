var form = document.querySelector("#member");
var btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", function(e){
   if(!isTxt("userid")) e.preventDefault();
});

//text 인증함수
function isTxt(name){
   var input = form.querySelector("input[name=${name}]");//원래 ${name} 대신 상수 userid
   var txt = input.value;

   if(txt !==""){
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();
      
      return true;
   }else{
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

      var errMsg = document.createElement("p");
      errMsg.append("텍스트를 입력하세요");
      input.closest("td").append(errMsg);

      return false;
   }
}