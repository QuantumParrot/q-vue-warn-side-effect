import{h as s}from"./moment-Cl4UOzQZ.js";import{_ as o,b as r,t as n,o as i}from"./index-BbUD4Z56.js";const a={data(){return{greeting:"您好"}},created(){const e=s().format("H");e>4&&e<11?this.greeting="早上好":e>10&&e<18?this.greeting="午安":this.greeting="晚上好"}},c={class:"text-end fs-5 mb-5"};function f(e,g,p,_,t,d){return i(),r("p",c,n(t.greeting)+"，管理員！",1)}const l=o(a,[["render",f]]);export{l as default};
