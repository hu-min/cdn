// ==UserScript==
// @name         Cloud Cone
// @namespace    hhttps://app.cloudcone.com/
// @version      0.0.2
// @description  For Black Friday
// @author       Me
// @match        https://app.cloudcone.com/blackfriday
// @require      https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @icon         https://app.cloudcone.com/assets/img/favicon.png
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// ==/UserScript==
var my_data=new FormData();
var mytoken = _token
my_data.append('os','272');
my_data.append('hostname','cc.yourname.xyz');
my_data.append('plan','34');
my_data.append('method','provision');
my_data.append('_token',mytoken);
 
function triger(){
    let my_url = $('#rotator > tr:nth-child(2) > td:nth-child(8) > a').attr("href")
    let plan  = /vps\/(\d+)/g.exec(my_url).pop();
    console.log(plan)
    return plan
}
 
async function get_offer(){
 
    let offer = await fetch("https://app.cloudcone.com/blackfriday/offers", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "referrer": "https://app.cloudcone.com/blackfriday",
        "method": "GET",
        "mode": "cors"
    });
    let out = await offer.json()
    let d = out['__data']['html']
    let plan = /href='\/vps\/(\d+)\/create\?token=bf/g.exec(d).pop();
    console.log(d)
    console.log(plan)
 
    return plan
}
 
(function() {
    'use strict';
    // let my_url = $('#rotator > tr:nth-child(2) > td:nth-child(8) > a')
    // console.log(my_url.attr("href"))
    // console.log(my_url)
    $("h5:contains(The flashing plans are rare! very limited in stocks, catch em' all!)").after(
        "<a href=\"javascript:;\" id=\"buy\" style=\"color:green\">Buy</a>"
    );
    $('#buy').click(async function () { let pl = await get_offer();
        my_data.set('plan',pl);await get_offer();
        fetch('https://app.cloudcone.com/ajax/vps',{
                        method: 'POST',
                        body: my_data,
                    }) });
})();
