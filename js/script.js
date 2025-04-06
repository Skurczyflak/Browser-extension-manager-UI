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
        
    });
}

makeWigets();



/* Remove Widget */
document.querySelector('.wrapper-ext').addEventListener('click', function(e){
    if(e.target.classList.contains('btn-rm')){
        e.target.closest('.box-ext').remove();
    }
});