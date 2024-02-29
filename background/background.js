
let webList = [
    {
        name: '知乎',
        open: true,
        description: '登录弹窗',
        address: 'zhihu.com',
    },
    {
        name: 'CSDN',
        open: true,
        description: '无法复制',
        address: 'csdn.net',
    },
    {
        name: '掘金',
        open: true,
        description: '复制出现多余文字',
        address: 'juejin.cn',
    },
]

/**
 * 设置 localStorage
 */
const storage = chrome.storage.local;
const getLocalStorage = () => {
    storage.get(null, (item) => {
        for (let i = 0; i < webList.length; i++) {
            const name = webList[i].name
            if (item[name]) {
                webList[i] = item[name];
            } else {
                storage.set({[name]: webList[i]}, () => {
                    console.log(name, '设置Storage成功');
                })
            }
        }
    })
}
getLocalStorage();
// storage.clear()

/**
 * 监听插件安装
 */
/*chrome.runtime.onInstalled.addListener((_reason) => {
    chrome.tabs.create({
        url: 'info/index.html'
    });
});*/

/**
 * 当有页面更新的时候
 * @tabId
 * @changeInfo
 * @tab
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // console.log(tab);
    }
});

/**
 * 接受来自 popup.js 中的消息
 * @request
 * @sender
 * @sendResponse 回传给 popup.js 的函数
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request, sender, sendResponse);
    getLocalStorage();
    sendResponse('传参成功');
})


