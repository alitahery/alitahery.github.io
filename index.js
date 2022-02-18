const submit = document.getElementById("submitBtn");
const text = document.querySelector("#inputText");
let all = [];
const printEl = document.getElementById("print");
let counter = 0
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("all"))
const deletebtn = document.getElementById("deleteBtn")
// const greetingBtn = document.getElementById("greetingBtn")
// const greetingtxt = document.getElementById("greetingtxt")

// function greeting(){
//    greetingl("Ali")
// }

// function greetingl(name){
//    greetingtxt.textContent = name +" Wellcome to this extention"
// }

if (leadsFromLocalStorage) {
   all=leadsFromLocalStorage
   printLoop(all)
}

deletebtn.addEventListener("dblclick",function(){
   localStorage.clear()
   all = []
   printLoop(all)
})
// event listener for submit btn and saves its value in local storage
submit.addEventListener("click",function(){
   let value = text.value
   all.push(value);
   text.value = null;
   localStorage.setItem("all",JSON.stringify(all))
   
   printLoop(all);
})

// this function renders arrays
function printLoop(lead){
   let listItem = ""
   for (let i = 0;i<lead.length;i++){
      listItem +=
            `
            <li>
               <a target='_blank' href='${lead[i]}'>
                  ${lead[i]}
               </a>
            </li>
            `
   };
   printEl.innerHTML = listItem
}

