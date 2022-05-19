window.onload = () => {
    let webList = [];
    const storage = chrome.storage.local;

    const drawDom = () => {
        const ulDom = document.querySelector('.main');
        let str = '';
        webList.forEach((item, index) => {
            str += `<li class="item">
            <div>
                <div class="name">${item.name}</div>
                <div class="description">${item.description}</div>
            </div>
            <div class="button ${item.open ? 'openColor' : 'closeColor'}" data-index="${index}">
                <div class="slide ${item.open ? 'openPosition' : 'closePosition'}" data-index="${index}"></div>
            </div>
        </li>`
        })
        ulDom.innerHTML = str;
    }

    const ul = document.querySelector('.main');
    ul.onclick = (domObj) => {
        const index = domObj.target.getAttribute('data-index');
        if (index) {
            const newStatus = !webList[index].open;
            webList[index].open = newStatus;
            const allDom = document.querySelectorAll('.slide');
            const allButton = document.querySelectorAll('.button');
            allDom[index].setAttribute('class', `${ newStatus ? 'openPosition' : 'closePosition' } slide`);
            allButton[index].setAttribute('class', `${ newStatus ? 'openColor' : 'closeColor' } button`);
            storage.set({[webList[index].name]: webList[index]}, () => {
                chrome.runtime.sendMessage({do: 'getLocalStorage'}, (res) => {
                    console.log(res);
                })
            })
        }
    }
    /**
     * 获取 localStorage 的中的数据
     */
    storage.get(null, (item) => {
        webList = Object.values(item);
        drawDom();
    })
}
