const qntd = document.getElementById("qntd");
const btnMenos = document.getElementById("btnMenos");
const btnMais = document.getElementById("btnMais");
const chkbox = document.querySelectorAll("input[type=checkbox]");
const descricao = document.getElementById("descricao");
const mensagem = document.getElementById("mensagem");
const enviar = document.getElementById("enviar");

const enableSubmitBtn = () => {
  let checked = 0;
  chkbox.forEach((c) => (c.checked ? checked++ : checked));

  if (checked && Number(qntd.value) !== 0) {
    enviar.disabled = false;
  }
};

const errorRemove = () => {
  chkbox.forEach((c) => {
    let label = c.parentElement;
    label.classList.remove("error");
  });
  enableSubmitBtn();
};

const verifyValue = () => {
  qntd.classList.remove("error");
  qntd.value = Number(qntd.value) > 0 ? Number(qntd.value).toFixed() : 0;
  btnMenos.disabled = Number(qntd.value) === 0 ? true : false;
  enableSubmitBtn();
};

const changeValue = (_qntd) => {
  qntd.value = Number(qntd.value) < 0 ? 0 : Number(qntd.value) + _qntd;
  verifyValue();
};

const submitData = (e) => {
  let checked = 0;
  chkbox.forEach((c) => (c.checked ? checked++ : checked));

  mensagem.innerHTML = null;

  if (!checked || Number(qntd.value) === 0) {
    e.preventDefault();
    enviar.disabled = true;
    if (!checked) {
      chkbox.forEach((c) => {
        let label = c.parentElement;
        label.classList.add("error");
      });
    }
    if (Number(qntd.value) === 0) {
      qntd.classList.add("error");
    }
    return;
  }

  mensagem.innerHTML = "Formulário enviado com sucesso!";
  chkbox.forEach((c) => (c.checked = false));
  qntd.value = 0;
  descricao.value = null;
  verifyValue();
};

qntd.addEventListener("input", verifyValue);
btnMenos.addEventListener("click", () => changeValue(-1));
btnMais.addEventListener("click", () => changeValue(1));
chkbox.forEach((c) => c.addEventListener("change", errorRemove));
enviar.addEventListener("click", submitData);
