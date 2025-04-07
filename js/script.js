/* Make Widgets */
const makeWigets = function(){
    async function getData() {
        const url = "data.json";
        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json;
        } catch (error) {
        console.error(error.message);
        }
    }

    let html = '';
    const data = getData();
    data.then((wigets) => {
        wigets.forEach(wiget => {
            const boxElement = `
                <div class="box-ext" is-active="${wiget.isActive}">
                    <div class="logo-name-ext">
                        <img src="${wiget.logo}" alt="icon-image">
                        <div class="name-text">
                        <h2>${wiget.name}</h2>
                        <p>${wiget.description}</p>
                        </div>
                    </div>
                    <div class="button-ext">
                        <button type="button" class="btn btn-rm">Remove</button>
                        <label class="switch">
                        <input type="checkbox" id="filter-slider">
                        <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            `;
            html += boxElement;
        });
        document.querySelector('.wrapper-ext').innerHTML += html;

        /* checkbox checked if is-active attribute is true on start*/
        document.querySelectorAll('.box-ext').forEach(box => {
            if(box.getAttribute('is-active') === 'true'){
                box.querySelector('input').checked = true;
            }else if(box.getAttribute('is-active') === 'false'){
                box.querySelector('input').checked = false;
            }
        });

    });
}

makeWigets();

/* Change Widget Status */
document.querySelector('.wrapper-ext').addEventListener('change', function(e){
    if(e.target.id === 'filter-slider'){
        const box = e.target.closest('.box-ext');
        if(e.target.checked){
            box.setAttribute('is-active', 'true');
        }else{
            box.setAttribute('is-active', 'false');
        }
    }
});

/* Remove Widget */
document.querySelector('.wrapper-ext').addEventListener('click', function(e){
    if(e.target.classList.contains('btn-rm')){
        e.target.closest('.box-ext').remove();
    }
});

// if filter buttton is cliced add active class and remove active class from other buttons
document.querySelector('.buttons-filter').addEventListener('click', function(e){
    if(e.target.classList.contains('btn-filter')){
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
    }
});

/* Filter bar 'All' 'Active' 'Inactive' */
document.querySelector('.buttons-filter').addEventListener('click', function(e){
    if(e.target.classList.contains('btn-filter')){
        document.querySelectorAll('.box-ext').forEach(box => {
            box.style.display = 'none';
        });
        if(e.target.textContent === 'All'){
            document.querySelectorAll('.box-ext').forEach(box => {
                box.style.display = 'flex';
            });
        }else if(e.target.textContent === 'Active'){
            document.querySelectorAll('.box-ext').forEach(box => {
                if(box.getAttribute('is-active') === 'true'){
                    box.style.display = 'flex';
                }
            });
        }else if(e.target.textContent === 'Inactive'){
            document.querySelectorAll('.box-ext').forEach(box => {
                if(box.getAttribute('is-active') === 'false'){
                    box.style.display = 'flex';
                }
            });
        }
    }
});