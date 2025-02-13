document.addEventListener('DOMContentLoaded', function() {
    // Função de rolagem suave com offset
    function smoothScroll(target) {
      const element = document.querySelector(target);
      const offset = 100; // Ajuste esse valor conforme necessário para o seu layout (pode ser -50, -120, etc.)
      
      window.scrollTo({
        top: element.offsetTop - offset, // Aplica o deslocamento
        behavior: 'smooth'
      });
    }
  
    // Adiciona o evento de clique nos links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
      });
    });
  
    // Ação para o botão "Ver sobre mim"
    document.getElementById('ver-sobre-mim').addEventListener('click', function() {
      smoothScroll('#sobre');
    });
  
    // Ação para o nome Virginia Colares
    document.getElementById('virginia-colares').addEventListener('click', function() {
      smoothScroll('#hero');
    });
  });
  