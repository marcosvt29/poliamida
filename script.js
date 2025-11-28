const WHATSAPP_NUMBER = '5551991303697';

const PRODUCTS = [
  {id:1,name:'Camiseta Azul Trindade',price:'R$ 49,90',img:'imagens/01.png',sizes:['P','M','G']},
  {id:2,name:'Camiseta Vermelha',price:'R$ 49,90',img:'imagens/02.png',sizes:['P','M','G']},
  {id:3,name:'Camiseta Violeta',price:'R$ 49,90',img:'imagens/03.png',sizes:['P','M']},
  {id:4,name:'Camiseta Rosa',price:'R$ 49,90',img:'imagens/04.png',sizes:['P','M','G']},
  {id:5,name:'Camiseta Laranja',price:'R$ 49,90',img:'imagens/05.png',sizes:['P','M','G']},
  {id:6,name:'Camiseta Preta',price:'R$ 49,90',img:'imagens/06.png',sizes:['P','M','G']}
];

const grid     = document.getElementById('prodGrid');
const search   = document.getElementById('searchInput');
const empty    = document.getElementById('emptyState');
const modal    = document.getElementById('modalBase');
const modalBox = document.querySelector('.modal-box');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

/* AUTO AJUSTAR MENU */
const header = document.getElementById("header");
const topBar = document.querySelector(".top-bar");

function ajustarMenu(){
    topBar.style.marginTop = header.offsetHeight + 10 + "px";
}
window.addEventListener("load", ajustarMenu);
window.addEventListener("resize", ajustarMenu);

/* RENDER PRODUCTS */
function renderProducts(list){
  grid.innerHTML = '';
  if(!list.length){
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.forEach(p => {
    let el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}">
      <div class="info">
        <strong>${p.name}</strong>
        <div class="price">${p.price}</div>
      </div>`;
    el.onclick = ()=> openProductModal(p);
    grid.appendChild(el);
  });
}
renderProducts(PRODUCTS);

/* SEARCH */
search.addEventListener('input', ()=>{
  let q = search.value.trim().toLowerCase();
  renderProducts(PRODUCTS.filter(p => p.name.toLowerCase().includes(q)));
});

/* MODAL */
function showModal(html){
  modalContent.innerHTML = html;
  modal.style.display = 'flex';
}

function hideModal(){
  modal.style.display = 'none';
}
modalClose.onclick = hideModal;
modal.onclick = e => { if(e.target === modal) hideModal(); };

/* TOP MENU MODALS */
document.getElementById('openMedidas').onclick = () => {
  showModal(`
    <h2>Tabela de Medidas</h2>
    <table class="table-size">
      <tr><th>Tamanho</th><th>Largura</th><th>Altura</th><th>Ombro</th></tr>
      <tr><td>P</td><td>48</td><td>67</td><td>42</td></tr>
      <tr><td>M</td><td>51</td><td>70</td><td>44</td></tr>
      <tr><td>G</td><td>54</td><td>73</td><td>46</td></tr>
      <tr><td>GG</td><td>57</td><td>76</td><td>48</td></tr>
      <tr><td>XG</td><td>60</td><td>78</td><td>50</td></tr>
    </table>
  `);
};

document.getElementById('openEspecificacoes').onclick = ()=>{
  showModal(`
    <h2>Especificações da Malha</h2>
    <p>• Composição: 100% Poliamida</p>
    <p>• Tecnologia DRY</p>
    <p>• Smart Clothes</p>
    <p>• Toque macio</p>
    <p>• Secagem rápida</p>
    <p>• Não desbota, não cria bolinhas</p>
  `);
};

document.getElementById('openPrazo').onclick = ()=>{
  showModal(`
    <h2>Prazo de Entrega</h2>
    <p>Entrega em <strong>7 a 10 dias úteis</strong></p>
    <p>Rastreio enviado pelo WhatsApp.</p>
  `);
};

document.getElementById('openTamanhos').onclick = ()=>{
  showModal(`
    <h2>Tamanhos Disponíveis</h2>
    <p>P • M • G • GG • XG</p>
  `);
};

/* PRODUCT MODAL */
function openProductModal(p){
  showModal(`
    <h2>${p.name}</h2>

    <img src="${p.img}"
         style="
            width:100%;
            height:auto;
            max-height:70vh;
            object-fit:contain;
            border-radius:12px;
            background:white;
            margin:10px 0;
         ">

    <p><strong>Preço:</strong> ${p.price}</p>
    <p><strong>Tamanhos:</strong> ${p.sizes.join(' • ')}</p>

    <button style="
      width:100%;
      margin-top:12px;
      padding:14px;
      border:none;
      border-radius:12px;
      background:var(--green);
      color:white;
      font-size:16px;
      cursor:pointer;">
      Pedir pelo WhatsApp
    </button>
  `);

  document.querySelector('#modalContent button')
    .onclick = ()=> openWhats(p.name);
}

/* WHATSAPP */
function openWhats(name){
  const msg = encodeURIComponent(`Olá! Tenho interesse na camiseta: ${name}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

/* FAB */
document.getElementById('waFab').onclick = ()=>{
  openWhats("Gostaria de saber mais sobre os produtos");
};
