const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", e=>{
   //유효성 검사 함수의 리턴값이 false라면 e.preventDefault()
   //userid 인증함수
   if(!isTxt("userid", 5)) e.preventDefault();
   //password 인증함수
   if(!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
   //email 인증함수
   if(!isEmail("email")) e.preventDefault();
   //select 인증함수
   if(!isSelect("edu")) e.preventDefault();
   //gender 인증함수
   if(!isCheck("gender")) e.preventDefault();
   //hobby 인증함수
   if(!isCheck("hobby")) e.preventDefault();
   //comments 인증함수
   if(!isTxt("comments", 20))e.preventDefault();
});

//text input 인증처리 함수 정의
function isTxt(name, len){

   //만약 글자수 입력받은 값이 없다면 5로 지정
   if(len === undefined) len =5;
   //userid의 input요소 찾음
   let input = form.querySelector(`[name=${name}]`);
   //해당 input 요소의 value값 구함
   let txt = input.value;

   //조건 - 글자수가 len글자 이상이고 입력받은 내용이 있다면(빈값이아니라면)
   if(txt.length >=len && txt !=""){
      //이미 생성된 에러메세지가 있는지 확인후
      const errMsgs = input.closest("td").querySelectorAll("p");
      //만약 p요소가 있다면 제거하고
      if(errMsgs.length>0) input.closest("td").querySelector("p").remove();
      //true값을 반환해서 인증통과
      return true;
   }else{
      //조건을 만족하지 않는다면
      //false값을 반환해서 인증막음
      //이미 생성된 에러메세지가 있는지 확인후
      const errMsgs = input.closest("td").querySelectorAll("p");
      //만약 p요소가 있다면 제거하고
      if(errMsgs.length>0) input.closest("td").querySelector("p").remove();

      //다시 새롭게 에러메세지 생성
      const errMsg = document.createElement("p");
      errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
      input.closest("td").append(errMsg);
      return false;
   }
}

//email 인증 함수 정의
function isEmail(name){
   let input = form.querySelector(`[name=${name}]`);
   let txt = input.value;

   //조건 - 특정한 문자열(@)이 txt에 있다면 true 없다면 false
   if(/@/.test(txt)){
      const errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length>0) input.closest("td").querySelector("p").remove();
      return true;
   }else{
      const errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length>0) input.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append("@를 포함한 전체 이메일 주소를 입력해주세요");
      input.closest("td").append(errMsg);
      return false;
   }
}

//check 인증함수 정의
function isCheck(name){
   //input요소가 복수개이므로 유사배열로 받음
   let inputs = form.querySelectorAll(`[name=${name}]`);
   //일단 isChecked 값을 false로 지정
   let isChecked = false;

   //input의 갯수만큼 반복을 돌면서 
   //하나라도 체크되어 있는게 있다면 isChecked 값을 true로 변경
   for(let el of inputs){
      if(el.checked) isChecked = true;
   }

   if(isChecked){
      //요소.closest()
      const errMsgs = inputs[0].closest("td").querySelectorAll("p");
      if(errMsgs.length>0) inputs[0].closest("td").querySelector("p").remove();
      return true;
   }else{
      const errMsgs = inputs[0].closest("td").querySelectorAll("p");
      if(errMsgs.length>0) inputs[0].closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append("필수 입력항목을 체크해주세요");
      inputs[0].closest("td").append(errMsg);
      return false;
   }
}

//password 인증함수 정의
function isPwd(name1, name2, len){
   //두개의 비밀번호값을 저장
   let pwd1 = form.querySelector(`[name=${name1}]`);
   let pwd2 = form.querySelector(`[name=${name2}]`);
   let pwd1_val = pwd1.value;
   let pwd2_val = pwd2.value;

   //비밀번호에 영문자,숫자,특수문자 있는지 확인
   const num = /[0-9]/;
   const eng = /[a-zA-Z]/;
   const spc = /[~!@#$%^&*()_+]/;

   //두개의 번호가 동일한가, 최소 글자수 len 개 이상인가
   if(pwd1_val === pwd2_val && pwd1_val.length>=len && num.test(pwd1_val) &&eng.test(pwd1_val) && spc.test(pwd1_val)){
      const errMsgs = pwd1.closest("td").querySelectorAll("p");
      if(errMsgs.length>0) pwd1.closest("td").querySelector("p").remove();
      return true;
   }else{
      const errMsgs = pwd1.closest("td").querySelectorAll("p");
      if(errMsgs.length>0) pwd1.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append(`비밀번호는 ${len}글자 이상 영문, 숫자, 특수문자를 포함해서 동일하게 입력하세요`);
      pwd1.closest("td").append(errMsg);
      return false;
   }
}


//select 인증함수
function isSelect(name){
   let sel = form.querySelector(`[name=${name}]`);
   let sel_index = sel.options.selectedIndex;
   let val = sel[sel_index].value;

   if(val !==""){
      const errMsgs = sel.closest("td").querySelectorAll("p");
      if(errMsgs.length>0) sel.closest("td").querySelector("p").remove();
      return true;
   }else{
      const errMsgs = sel.closest("td").querySelectorAll("p");
      if(errMsgs.length>0) sel.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append("필수항목을 선택해 주세요");
      sel.closest("td").append(errMsg);

      return false;
   }
}