
/*chrome.runtime.sendMessage({greeting: 'werqweasdf'}, (res) => {
    console.log(res);
})*/

class Injection {
    static ['zhihu.com']() {
        const html = document.querySelector('html');
        html.style.overflow = 'unset';
        const loginModule = document.querySelector('.Modal-wrapper');
        loginModule.style.display = 'none';
        console.log(document)
    }
    static ['csdn.net']() {
        const pre = document.querySelectorAll('pre');
        pre.forEach((item) => {
            item.style.userSelect = 'text';
            item.style.webkitUserSelect = 'text';
            item.children[0].style.userSelect = 'text';
            item.children[0].style.webkitUserSelect = 'text';
        });
        const body = document.querySelector('body');
        body.oncopy = async (e) => {
            try {
                const text = await navigator.clipboard.readText();
                const array = text.split('————————————————');
                if (array.length === 2 && array[1].includes('版权声明：本文为CSDN博主')) {
                    await navigator.clipboard.writeText(array[0]);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    static ['juejin.cn']() {

    }
}

let webObj = {};
const webList = [];
const storage = chrome.storage.local;

const getStorage = () => {
    return new Promise((resolve, reject) => {
        storage.get(null, (obj) => {
            resolve(obj);
        })
    })
}

const dealWeb = () => {
    for (let objKey in webObj) {
        if (webObj.hasOwnProperty(objKey)) {
            const object = webObj[objKey];
            if (object.open) {
                webList.push(object.address);
            }
        }
    }
}

const perform = () => {
    const { hostname } = window.location;
    for (let i = 0; i < webList.length; i++) {
        if(hostname.includes(webList[i])){
            Injection[webList[i]]();
        }
    }
}

const allFun = async () => {
    try{
        webObj = await getStorage();
        dealWeb();
        perform();
    } catch (e) {
        console.log(e);
    }
}

allFun();
