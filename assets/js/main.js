(function(){
  'use strict';
  const $=(s,el=document)=>el.querySelector(s);
  const $$=(s,el=document)=>Array.from(el.querySelectorAll(s));
  function maskCPF(v){return v.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');}
  function maskCEP(v){return v.replace(/\D/g,'').slice(0,8).replace(/(\d{5})(\d{1,3})/,'$1-$2');}
  function maskPhone(v){const d=v.replace(/\D/g,'').slice(0,11);const dd=d.slice(0,2), r=d.slice(2);if(!dd) return ''; if(r.length>5) return `(${dd}) ${r.slice(0,5)}-${r.slice(5,9)}`; if(r.length>0) return `(${dd}) ${r}`; return `(${dd}`;}
  function attachMask(input, fn){ if(!input) return; input.addEventListener('input', ()=>{ const pos=input.selectionStart; const before=input.value; input.value=fn(input.value); const diff=input.value.length-before.length; input.setSelectionRange(Math.max(0,pos+diff), Math.max(0,pos+diff)); }); }

  function setupNav(){
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (btn && nav) {
      const toggle = () => {
        nav.classList.toggle('open');
        const expanded = nav.classList.contains('open');
        btn.setAttribute('aria-expanded', String(expanded));
      };
      btn.addEventListener('click', toggle);

      // Fecha o painel mobile ao clicar em links
      nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          if (window.matchMedia('(max-width:768px)').matches) {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    // Dropdown mobile por clique
    document.querySelectorAll('.dropdown > a').forEach(a => {
      a.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width:768px)').matches) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
  }

  function setupValidation(){ const form=document.querySelector('form'); if(!form) return; form.addEventListener('submit',(ev)=>{ const ok=form.checkValidity(); form.querySelectorAll('input,select,textarea').forEach(el=>el.setAttribute('aria-invalid', !el.checkValidity())); if(!ok){ const first=form.querySelector(':invalid'); if(first) first.focus(); ev.preventDefault(); } }); }
  function showToast(msg, timeout=3000){ let cont=$('.toast-container'); if(!cont){ cont=document.createElement('div'); cont.className='toast-container'; document.body.appendChild(cont); } const t=document.createElement('div'); t.className='toast'; t.textContent=msg; cont.appendChild(t); setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(),400); }, timeout); }
  window.showToast=showToast;
  function setupModal(){ const open=$('[data-open-modal]'); const close=$('[data-close-modal]'); const backdrop=$('.modal-backdrop'); if(open&&backdrop){ open.addEventListener('click', ()=> backdrop.classList.add('open')); } if(close&&backdrop){ close.addEventListener('click', ()=> backdrop.classList.remove('open')); } if(backdrop){ backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) backdrop.classList.remove('open'); }); } }

  document.addEventListener('DOMContentLoaded', ()=>{
    attachMask(document.getElementById('cpf'), maskCPF);
    attachMask(document.getElementById('cep'), maskCEP);
    attachMask(document.getElementById('telefone'), maskPhone);
    setupNav();
    setupValidation();
    setupModal();
    document.querySelectorAll('.js-year').forEach(el=> el.textContent=(new Date()).getFullYear());
  });
})();