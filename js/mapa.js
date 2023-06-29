document.addEventListener('DOMContentLoaded', function() {
  const mapaLinks = document.getElementsByClassName('mapa-link');
  const barco = document.getElementById('barco');

  function moveBarco(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    
    const destinoX = event.clientX;
    const destinoY = event.clientY;
  
  barco.style.left = `${destinoX}px`;
  barco.style.top = `${destinoY}px`;
    
    // Redireciona para a página do link após 5 segundos
    setTimeout(function() {
      window.location.href = this.href;
    }.bind(this), 5000);
  }

  function changeIconColor(event) {
    const icons = this.getElementsByTagName('i');
    for (let i = 0; i < icons.length; i++) {
      icons[i].style.color = 'red'; // Altera a cor do ícone para vermelho
    }
  }
  for (let i = 0; i < mapaLinks.length; i++) {
    const link = mapaLinks[i];
    const icon = link.querySelector('i');
    icon.addEventListener('click', moveBarco.bind(link));
    mapaLinks[i].addEventListener('click', changeIconColor);
  }
});