import{q as u,r as f,j as t,a as d}from"./app-RqH-pmAi.js";function p(){const{auth:x}=u().props;return f.useEffect(()=>{const h=[],e=document.getElementById("particleCanvas"),s=e.getContext("2d"),l=["#d1d5db","#9ca3af","#6b7280"];e.width=window.innerWidth,e.height=window.innerHeight;class g{constructor(a,r,n,o){this.x=a,this.y=r,this.radius=n,this.color=o,this.dx=Math.random()*2-1,this.dy=Math.random()*2-1}draw(){s.beginPath(),s.arc(this.x,this.y,this.radius,0,Math.PI*2,!1),s.fillStyle=this.color,s.fill()}update(){(this.x+this.radius>e.width||this.x-this.radius<0)&&(this.dx=-this.dx),(this.y+this.radius>e.height||this.y-this.radius<0)&&(this.dy=-this.dy),this.x+=this.dx,this.y+=this.dy,this.draw()}}function m(){for(let i=0;i<100;i++){const a=Math.random()*3+1,r=Math.random()*e.width,n=Math.random()*e.height,o=l[Math.floor(Math.random()*l.length)];h.push(new g(r,n,a,o))}}function c(){s.clearRect(0,0,e.width,e.height),h.forEach(i=>i.update()),requestAnimationFrame(c)}m(),c(),window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight})},[]),t.jsxs("div",{className:"min-h-screen relative overflow-hidden",children:[t.jsx("canvas",{id:"particleCanvas",className:"absolute inset-0 z-0"}),t.jsxs("div",{className:"relative z-10 flex flex-col items-center justify-center min-h-screen text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg",children:[t.jsxs("h1",{className:"text-4xl font-bold mb-4 text-gray-800",children:["Bienvenido a ",t.jsx("span",{className:"text-gray-600",children:"SGPSOTO"})]}),t.jsxs("p",{className:"text-lg mb-6 text-gray-600",children:["Plataforma de control de pagos ",t.jsx("br",{}),t.jsx("span",{className:"italic text-gray-500",children:"Inspirada en la estética del Museo de Arte Moderno Jesús Soto"})]}),t.jsx("div",{className:"flex space-x-4",children:x.user?t.jsx(d,{href:route("dashboard"),className:"px-6 py-2 rounded-full bg-gray-700 text-white font-semibold hover:bg-gray-600 transition",children:"Ir al Inicio"}):t.jsxs(t.Fragment,{children:[t.jsx(d,{href:route("login"),className:"px-6 py-2 rounded-full bg-gray-700 text-white font-semibold hover:bg-gray-600 transition",children:"Iniciar Sesión"}),t.jsx(d,{href:route("register"),className:"px-6 py-2 rounded-full border border-gray-700 text-gray-700 font-semibold hover:bg-gray-700 hover:text-white transition",children:"Registrarse"})]})})]})]})}export{p as default};
