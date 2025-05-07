document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões que abrem modais com vídeos
    const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target]');
  
    // Para cada botão, configura o evento de abertura/fechamento
    modalButtons.forEach(button => {
      const modalId = button.getAttribute('data-bs-target');
      const modal = document.querySelector(modalId);
      const iframe = modal.querySelector('iframe');
  
      // Quando o modal é aberto, carrega o vídeo
      modal.addEventListener('show.bs.modal', () => {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      });
  
      // Quando o modal é fechado, para o vídeo
      modal.addEventListener('hidden.bs.modal', () => {
        iframe.src = ''; // Remove o src para parar o vídeo
      });
    });
  });