setTimeout(() => {
    const rows = document.querySelectorAll('.ant-table-row.ant-table-row-level-0')
    const mapping = {}
    for (const { childNodes } of rows) {
        const title = childNodes[1].textContent
        const finish = childNodes[5].textContent
        if (finish === '是')
            mapping[title] = true
    }
    if (Object.keys(mapping).length)
        localStorage.setItem('__CHONG_TIAN_HISTORY', JSON.stringify(mapping))
}, 1111);
function displayWatched() {
    const mapping = JSON.parse(localStorage.getItem('__CHONG_TIAN_HISTORY') ?? '{}')
    const titles = document.querySelectorAll('div.bottomTitle___L4GzG')
    for (const title of titles) {
        if (mapping[title.textContent])
            title.style.color = 'green'
        else
            title.style.color = 'red'
    }
}
setTimeout(() => {
    displayWatched()
    document.querySelector('ul.open___inDJH')
        .addEventListener('click', () => {
            setTimeout(displayWatched, 111);
        })
}, 1111)