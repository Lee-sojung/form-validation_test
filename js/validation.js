var form = document.querySelector("#member");
var btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", function(e){
   if(!isTxt("userid", 5)) e.preventDefault();
   if(!isTxt("comments", 20)) e.preventDefault();
   if(!isEmail("email", 5)) e.preventDefault();
});

//text 인증함수
function isTxt(name, len){
   var input = form.querySelector(`[name=${name}]`);//원래 ${name} 대신 상수 userid
   var txt = input.value;

   if(txt.length > len){ //원래는 txt != ""
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();
      
      return true;
   }else{
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

      var errMsg = document.createElement("p");
      errMsg.append(`텍스트를 ${len}글자 이상 입력하세요`);
      input.closest("td").append(errMsg);

      return false;
   }
}

//email 인증함수 정의
function isEmail(name, len){
   var input = form.querySelector(`[name=${name}]`);
   var txt = input.value;

   if(txt.length >len && /@/.test(txt)){ //원래 txt.length >0
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();
      return true;
   }else{
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

      var errMsg = document.createElement("p");
      errMsg.append(`이메일 주소를 ${len}글자 이상 입력하세요`);
      input.closest("td").append(errMsg);
      return false;
   }
}