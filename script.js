let audioCtx=null, master=null, musicOn=false, timer=null;

function startMusic(){
  if(audioCtx){ if(audioCtx.state==="suspended") audioCtx.resume(); musicOn=true; updateMusic(); return; }
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  master=audioCtx.createGain(); master.gain.value=.045; master.connect(audioCtx.destination);
  const notes=[261.63,329.63,392.00,329.63,293.66,349.23,440.00,349.23];
  let step=0;
  function play(){
    if(!musicOn)return;
    const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
    osc.type="sine"; osc.frequency.value=notes[step%notes.length];
    gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.16,audioCtx.currentTime+.08);
    gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.72);
    osc.connect(gain);gain.connect(master);osc.start();osc.stop(audioCtx.currentTime+.75);
    step++;timer=setTimeout(play,650);
  }
  musicOn=true; play(); updateMusic();
}
function stopMusic(){musicOn=false;if(timer)clearTimeout(timer);updateMusic()}
function updateMusic(){document.querySelectorAll("#musicBtn").forEach(x=>x.textContent=musicOn?"♫ Music: ON":"♫ Music: OFF")}
document.addEventListener("click",e=>{
  if(e.target.id==="musicBtn"){musicOn?stopMusic():startMusic()}
  if(e.target.id==="openBtn"){
    document.getElementById("intro").classList.add("hide");
    document.querySelector(".hero").classList.remove("hidden");
    startMusic();
    typeText();
    petals(28);
    confetti(80);
  }
  if(e.target.classList.contains("btn")){
    confetti(24);
  }
});

function typeText(){
  const el=document.getElementById("typing"); if(!el)return;
  const text="You are someone truly special... ✨";
  let i=0; el.textContent="";
  const t=setInterval(()=>{el.textContent+=text[i++];if(i>=text.length)clearInterval(t)},55);
}
function petals(n=18){
  const box=document.getElementById("petals");if(!box)return;
  for(let i=0;i<n;i++){
    const p=document.createElement("div");p.className="petal";
    p.textContent=Math.random()>.25?"🌸":"🌹";
    p.style.left=Math.random()*100+"vw";
    p.style.fontSize=(12+Math.random()*15)+"px";
    p.style.animationDuration=(5+Math.random()*7)+"s";
    p.style.animationDelay=(Math.random()*4)+"s";
    box.appendChild(p);setTimeout(()=>p.remove(),13000);
  }
}
function confetti(n=50){
  for(let i=0;i<n;i++){
    const s=document.createElement("span");
    s.textContent=["❤","✨","💗","✦","🎉"][Math.floor(Math.random()*5)];
    s.style.position="fixed";s.style.left=(5+Math.random()*90)+"vw";s.style.top="-20px";
    s.style.zIndex="999";s.style.pointerEvents="none";s.style.fontSize=(12+Math.random()*16)+"px";
    s.style.transition="transform "+(1.5+Math.random()*1.5)+"s ease,opacity 2.5s";
    document.body.appendChild(s);
    requestAnimationFrame(()=>{s.style.transform=`translate(${(Math.random()-.5)*180}px,${90+Math.random()*90}vh) rotate(${Math.random()*720}deg)`;s.style.opacity="0"});
    setTimeout(()=>s.remove(),3200);
  }
}
petals(12);
