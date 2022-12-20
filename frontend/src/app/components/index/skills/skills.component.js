const bhtml = document.getElementById('skillHtml');

const cargeBar = () => {
    console.log('Funciona')
}

const observerView = new IntersectionObserver(cargeBar, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold : 1.0,
});

observerView.observe(bhtml);