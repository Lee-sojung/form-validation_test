class Validation{

   constructor(){
      this.form = document.querySelector("#member");
      this.btnSubmit = this.form.querySelector("input[type=submit]");

      this.btnSubmit.addEventListener("click", e=>{
         if(!this.isTxt("userid", 5)) e.preventDefault();
         if(!this.isTxt("comments", 20)) e.preventDefault();
         if(!this.isEmail("email")) e.preventDefault();
         if(!this.isCheck("gender")) e.preventDefault();
         if(!this.isCheck("hobby")) e.preventDefault();
         if(!this.isSelect("edu")) e.preventDefault();
         if(!this.isPwd("pwd1", "pwd2", 5)) e.preventDefault();
      });
   } //var를 this로 바꾸고 함수 호출 앞에 this. 붙임
   

//function을 다 지워주고, 위와 연결되기 때문에 form앞에 this. 붙임
//text 인증함수
isTxt(name, len){
   const input = this.form.querySelector(`[name=${name}]`);//원래 ${name} 대신 상수 userid
   const txt = input.value;

   if(txt.length > len){ //원래는 txt != ""
      const errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();
      
      return true;
   }else{
      const errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append(`텍스트를 ${len}글자 이상 입력하세요`);
      input.closest("td").append(errMsg);

      return false;
   }
}

//email 인증함수 정의
isEmail(name, len){
   const input = this.form.querySelector(`[name=${name}]`);
   const txt = input.value;

   if(/@/.test(txt)){ //원래 txt.length >0 // txt.includes("@")로 특정 문자열 찾기도 가능
      const errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();
      return true;
   }else{
      const errMsgs = input.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
      input.closest("td").append(errMsg);
      return false;
   }
}

//check 인증함수 정의 gender,hobby
isCheck(name){
   const inputs = this.form.querySelectorAll(`[name=${name}]`);
   let isChecked = false;

   for(let input of inputs){
      if(input.checked) isChecked = true;
   }

   if(isChecked){
      const errMsgs = inputs[0].closest("td").querySelectorAll("p");
      if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove();
      return true;
   }else{
      const errMsgs = inputs[0].closest("td").querySelectorAll("p");
      if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append("필수 입력사항을 체크하세요");
      inputs[0].closest("td").append(errMsg); //closest 앞에 요소를 배열로 받음
      return false;
   }
}

//select 인증함수
isSelect(name){
   const sel = this.form.querySelector(`[name=${name}]`);
   const sel_index = sel.options.selectedIndex; 
   const val = sel.options[sel_index].value; 
   
   //1)var val =sel.value;

   //2)sel_index > 0
   if(val !==""){
      const errMsgs = sel.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) sel.closest("td").querySelector("p").remove();

      return true;
   }else{
      const errMsgs = sel.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) sel.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append("필수 항목을 선택하세요");
      sel.closest("td").append(errMsg);

      return false;
   }
}

//비밀번호 인증함수
isPwd(name1, name2, len){
   const pwd1 = this.form.querySelector(`[name=${name1}]`);
   const pwd2 = this.form.querySelector(`[name=${name2}]`);

   const pwd1_val = pwd1.value;
   const pwd2_val = pwd2.value;

   const eng = /[a-zA-Z]/;
   const num = /[0-9]/;
   const spc = /[~!@#$%^&*()_+`-]/;

   if(pwd1_val === pwd2_val && pwd1.length> len && eng.test(pwd1_val) && num.test(pwd1_val) && spc.test(pwd1_val)){
      const errMsgs = pwd1.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) pwd1.closest("td").querySelector("p").remove();

      return true;
   }else{
      const errMsgs = pwd1.closest("td").querySelectorAll("p");
      if(errMsgs.length >0) pwd1.closest("td").querySelector("p").remove();

      const errMsg = document.createElement("p");
      errMsg.append(`비밀번호를 ${len}글자 이상, 영문, 숫자, 특수문자 모두 포함해서 동일하게 입력하세요`);
      pwd1.closest("td").append(errMsg);

      return false;
   }
}
}



