let money = 0, auto = 0, name = "";

function login(){
  name = document.getElementById("name").value;
  document.getElementById("game").style.display="block";
}

function clickMoney(){ money++; render(); }
function buyAuto(){ if(money>=50){money-=50;auto++;} }

function render(){
  document.getElementById("money").innerText = money+" ₽";
}

setInterval(()=>{
  money += auto;
  render();
},1000);

function save(){
fetch("/save",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({name,money})
});
}

async function loadTop(){
  let r = await fetch("/leaderboard");
  let data = await r.json();
  document.getElementById("top").innerHTML =
    data.map(p=>`<li>${p.name}: ${p.money}</li>`).join("");
}
setInterval(loadTop,3000);
