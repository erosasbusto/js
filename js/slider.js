/*creamos una funcion para que se llama a si misma y asi proteger el codigo y no mezclarlo
entre todos los archivos */

(function () {
    const slider = [...document.querySelectorAll('.jobs__body')];
    /*los tres puntos son para que en vez de que sea un nodo de elementos sea un array
    y seleccionamos todos los elementos que esten dentro de jobs__body (slider)*/
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    
    buttonNext.addEventListener('click', () => {
        changePosition(1); 
    });

    buttonBefore.addEventListener('click', () =>{
        changePosition(-1); 
    });

    const changePosition = (add) => {
        const currentJob = document.querySelector('.jobs__body--show').dataset.id;
        value = Number(currentJob);
        value += add;

        slider[Number(currentJob)-1].classList.remove('jobs__body--show');
        if(value === slider.length+1 || value === 0){
            value = value === 0 ? slider.length : 1;
        }


        slider[value-1].classList.add('jobs__body--show');
    }
})();