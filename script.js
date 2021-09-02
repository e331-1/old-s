/*
おい!
見るなと言っただろう!
さあ帰った帰った!
*/

var slideout;
let default_nav;
let onoff=false;
window.onload = function() {
    jsonreq(1,false);
};
if(window.innerWidth>900){
    document.getElementsByTagName("main")[0].style.width=window.innerWidth-520;
    var xhr = new XMLHttpRequest();
    xhr.open('get', `./0.json`);
    xhr.send();
    xhr.onreadystatechange = function() {
        if( xhr.readyState === 4 && xhr.status === 200) {
            var count=0;
            JSON.parse(xhr.responseText).forEach(function(element){
                var newElement = document.createElement("a");
                if(element.mode=="json"){
                    newElement.setAttribute("href",`javascript:jsonreq(${element.source})`);
                }else if(element.mode="iflame"){
                    newElement.setAttribute("href",`javascript:iflamereq("${element.source}")`);
                }
                newElement.setAttribute("class",`select-button`);
                document.getElementsByTagName("nav")[1].appendChild(newElement);
                document.getElementsByClassName("select-button")[count].innerHTML=element.title;
                count++;
            })
            default_nav=document.getElementsByTagName("nav")[1].innerHTML;
        }	
    }

}else{
    document.getElementsByTagName("main")[0].style.width=window.innerWidth-20;
    contents_menu = new Slideout({
        'panel': document.getElementsByTagName("main")[0],
        'menu': document.getElementById("contents-menu"),
        'padding': 256,
        'tolerance': 70,
        'side': 'left'
    });
    var xhr = new XMLHttpRequest();
    xhr.open('get', `./0.json`);
    xhr.send();
    xhr.onreadystatechange = function() {
        if( xhr.readyState === 4 && xhr.status === 200) {
            var count=0;
            JSON.parse(xhr.responseText).forEach(function(element){
                var newElement = document.createElement("a");
                if(element.mode=="json"){
                    newElement.setAttribute("href",`javascript:jsonreq(${element.source})`);
                }else if(element.mode="iflame"){
                    newElement.setAttribute("href",`javascript:iflamereq(${element.source})`);
                }
                newElement.setAttribute("data-mode",element.mode);
                newElement.setAttribute("class",`select-button`);
                document.getElementById("for-mobile").appendChild(newElement);
                document.getElementsByClassName("select-button")[count].innerHTML=element.title;
                count++;
            })
            default_nav=document.getElementById("for-mobile").innerHTML;
        }	
    }

}
window.addEventListener('resize', function(){
    if(window.innerWidth>900){
        document.getElementsByTagName("main")[0].style.width=window.innerWidth-520;
        location.reload()
    }else{
        document.getElementsByTagName("main")[0].style.width=window.innerWidth-20;
        location.reload()
        contents_menu = new Slideout({
            'panel': document.getElementsByTagName("main")[0],
            'menu': document.getElementById("contents-menu"),
            'padding': 256,
            'tolerance': 70,
            'side': 'left'
        });
    }
});

function navdisplay(){
    if(window.innerWidth<900){
        if(onoff==false){
            document.getElementsByTagName("header")[0].style.height="100%"
            document.getElementById("subject").innerHTML="閉じる";
            document.getElementById("for-mobile").style.display="block";
            onoff=true;
        }else{
            if(document.getElementById("selecting")!==null){
                document.getElementById("subject").innerHTML=document.getElementById("selecting").innerHTML;
            }else{
                document.getElementById("subject").innerHTML="使い方"
            }
            document.getElementById("for-mobile").style.display="none";
            document.getElementsByTagName("header")[0].style.height="30px";
            onoff=false;
        }
    }
}
function iflamereq(url){
    document.getElementsByTagName("main")[0].innerHTML="";
    document.getElementById("contents").innerHTML=""
    var newElement = document.createElement("iflame");
    newElement.setAttribute("src",url);
    newElement.setAttribute("class","iflame");
    document.getElementsByTagName("main")[0].appendChild(newElement);
    document.getElementsByClassName("select-button")[count].innerHTML=element.title;
    navdisplay();
}

function jsonreq(number,autoclose=true){
    var xhr = new XMLHttpRequest();
    xhr.open('get', `./${number}.json`);
    xhr.send();
    xhr.onreadystatechange = function() {
        if( xhr.readyState === 4 && xhr.status === 200) {
            var count=0;
            document.getElementsByTagName("main")[0].innerHTML="";
            document.getElementById("contents").innerHTML=""
            JSON.parse(xhr.responseText).forEach(function(element){
                if(window.innerWidth<900){
                    document.getElementsByTagName("nav")[0].innerHTML=default_nav;
                }else{
                    document.getElementsByTagName("nav")[1].innerHTML=default_nav;
                }
                document.getElementsByClassName("select-button")[number-1].id="selecting";
                
                var newElement = document.createElement("section");
                document.getElementsByTagName("main")[0].appendChild(newElement);
                document.getElementsByTagName("section")[count].innerHTML=`<h1>${element[0]}</h1>${element[1]}`;
                    
                newElement = document.createElement("li");
                newElement.setAttribute("class","contents-li");
                newElement.setAttribute("onclick",`scrooooll(${count})`);
                document.getElementById("contents").appendChild(newElement);
                document.getElementsByClassName("contents-li")[count].innerHTML=element[0];
                count++;
            })
        }	
        document.getElementById("subject").innerHTML=document.getElementById("selecting").innerHTML;
    }
    if(autoclose==true){
        navdisplay()
    }
}

/*    var contents_function =function(){}
for(var i=0;i=receive.length;i++){
    contents_function+=`if((window.scrollY-(window.pageYOffset+document.getElementsByTagName("section")[${i}].getBoundingClientRect().top))>0){
        document.getElementById("scroll-now").innerText="${i}";
    }else{
        document.getElementById("scroll-now").innerText="";
    }`
}
console.log(contents_function);*/


function scrooooll(number){
    console.log(window.pageYOffset+document.getElementsByTagName("section")[number].getBoundingClientRect().top);
    scrollTo(0,window.pageYOffset+document.getElementsByTagName("section")[number].getBoundingClientRect().top);
}

/*    setInterval(function(){
    document.getElementById("scroll").innerText=window.scrollY;
    document.getElementById("now").innerText=window.pageYOffset+document.getElementsByTagName("section")[0].getBoundingClientRect().top ;
    document.getElementById("v").innerText=window.scrollY-(window.pageYOffset+document.getElementsByTagName("section")[1].getBoundingClientRect().top);
    
    if((window.scrollY-(window.pageYOffset+document.getElementsByTagName("section")[1].getBoundingClientRect().top))>0){
        document.getElementById("scroll-now").innerText="2";
    }else{
        document.getElementById("scroll-now").innerText="";
    }
    contents_function();
}, 1)
*/



const yougo_area = document.getElementsByTagName("main")[0]
const yougo_parts = document.getElementsByTagName("section")
const input = document.getElementById('search_word');

input.addEventListener('input',()=>{
reset();
const sword = input.value;
if(sword==''){return}
const regexp = new RegExp(`(?<=>)[^<>]*?(${sword})[^<>]*?(?=<)`,'gi');
const regexp2 = new RegExp(sword,'gi');
[...yougo_parts].forEach(part=>{
if(part.textContent.indexOf(sword)==-1){
  part.classList.add('hide');
}else{
  part.innerHTML=part.innerHTML.replace(regexp,function(){
    return arguments[0].replace(regexp2,`<span class="highlight">${sword}</span>`);
  });
}
});
});

function reset(){
console.log('reset');
[...document.getElementsByClassName('highlight')].forEach(el=>{
el.outerHTML=el.textContent;
});
[...document.getElementsByClassName('hide')].forEach(el=>{
el.classList.remove('hide');
});
}
