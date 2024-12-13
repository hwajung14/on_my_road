//아홉번쩨 페이지
document.addEventListener('DOMContentLoaded', () => {
    const collegePage = document.querySelector('.college');

    if (collegePage) {
        const images = document.querySelectorAll('.image-container img');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScroll;
            const index = Math.min(
                Math.floor(scrollFraction * images.length),
                images.length - 1
            );

            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        });
    }
});