document.addEventListener('DOMContentLoaded', function() {
    const franchiseBrands = document.querySelectorAll('.franchises__brand');

    franchiseBrands.forEach(brand => {
        const video = brand.querySelector('video');

        // Inicia o vídeo quando o mouse passar por cima
        brand.addEventListener('mouseenter', () => {
            video.play();
        });

        // Pausa e reseta o vídeo quando o mouse sair
        brand.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        // Tratamento para dispositivos touch
        brand.addEventListener('touchstart', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
}); 