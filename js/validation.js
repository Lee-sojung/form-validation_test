var form = document.querySelector("#member");
var btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", function(e){
   if(!isTxt("userid", 5)) e.preventDefault();
   if(!isTxt("comments", 20)) e.preventDefault();
   if(!isEmail("email")) e.preventDefault();
   if(!isCheck("gender")) e.preventDefault();
   if(!isCheck("hobby")) e.preventDefault();
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

   if(/@/.test(txt)){ //원래 txt.length >0 // txt.includes("@")로 특정 문자열 찾기도 가능
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();
      return true;
   }else{
      var errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

      var errMsg = document.createElement("p");
      errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
      input.closest("td").append(errMsg);
      return false;
   }
}

//check 인증함수 정의 gender,hobby
function isCheck(name){
   var inputs = form.querySelectorAll(`[name=${name}]`);
   var isChecked = false;

   for(var input of inputs){
      if(input.checked) isChecked = true;
   }

   if(isChecked){
      var errMsgs = inputs[0].closest("td").querySelectorAll("p");
      if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove();
      return true;
   }else{
      var errMsgs = inputs[0].closest("td").querySelectorAll("p");
      if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove();

      var errMsg = document.createElement("p");
      errMsg.append("필수 입력사항을 체크하세요");
      inputs[0].closest("td").append(errMsg);
      return false;
   }

}