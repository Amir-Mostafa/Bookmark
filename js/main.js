var inputName=document.getElementById("name");
var inputUrl=document.getElementById("url");
var content=document.getElementById("list");
var submit=document.getElementById("sub");
var inputs =document.getElementsByTagName("input");

var rejexDesc=/^[a-zA-Z0-9 ]{5,40}$/;
var rejexUrl=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&]*)/
submit.disabled = true;
var urlList=[];
var str="";
if(localStorage.getItem("urls")!=null )
{
  urlList=JSON.parse(localStorage.getItem("urls"));
  displayData();
}
// inputName.addEventListener("blur",function(){
//   if(inputName.value=="")
//   {
    
//     inputName.classList.add("border");
//     document.getElementById("alert-name").innerHTML="Name required";
//   }
//   else
//   {
//     inputName.classList.remove("border");
//     document.getElementById("alert-name").innerHTML="";
//   }
// })
// inputUrl.addEventListener("blur",function(){
//   if(this.value=="")
//   {
    
//     this.classList.add("border");
//     document.getElementById("alert-url").innerHTML="URL required";
//   }
//   else
//   {
//     this.classList.remove("border");
//     document.getElementById("alert-url").innerHTML="";
//   }
// })
inputName.addEventListener("keyup",function(){
  if(rejexDesc.test(inputName.value))
  {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
  }
  else
  {
    inputName.classList.remove("is-valid");
    inputName.classList.add("is-invalid");
  }
   checkAdd();
});
function checkAdd()
{
  if(rejexDesc.test(inputName.value)&&rejexUrl.test(inputUrl.value))
  submit.disabled = false;
  else
  submit.disabled = true;
  
}
inputUrl.addEventListener("keyup",function(){
  if(rejexUrl.test(inputUrl.value))
  {
    inputUrl.classList.add("is-valid");
    inputUrl.classList.remove("is-invalid");
  }
  else
  {
    inputUrl.classList.remove("is-valid");
    inputUrl.classList.add("is-invalid");
  }
   checkAdd();
})
document.getElementById("sub").onclick =function ()
{

  if(rejexDesc.test(inputName.value)&&rejexUrl.test(inputUrl.value))
  {
    checkAdd();
    addURL();
    displayData();
    inputUrl.classList.remove("is-valid");
    inputName.classList.remove("is-valid");
  }
  else
  submit.disabled = true;
  
};

function addURL()
{
  var url=
  {
    "name" : inputName.value ,
    siteURL : inputUrl.value
  }
  urlList.push(url);
  displayData();
  clearInputs();
  localStorage.setItem("urls",JSON.stringify(urlList));
}

function displayData()
{
  str="";
  for(var i=0;i<urlList.length;i++)
  {
    str+=
        `
        <div class="item my-3 ">
        <div  class="d-flex justify-content-between " >
          <h5 class="" >`+urlList[i].name+`</h5>
          <div class='d-flex'>
          <a  href='`+urlList[i].siteURL+`' target='_blank' class="btn btn-primary" >visit</a>
          <button onclick='deleteURL(`+i+`)' class="btn btn-danger ml-3 " >Delete</button>
          </div>
        </div>
      </div>
        `;
      
  }
  content.innerHTML=str;
}

function clearInputs()
{
  for(var i=0;i<inputs.length;i++)
        inputs[i].value="";

}
function deleteURL(index)
{
  urlList.splice(index,1);
  displayData();
  localStorage.setItem("urls",JSON.stringify(urlList));
}