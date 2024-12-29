import './reader.js'

const $ = document.querySelector.bind(document)

const open = async file => {
    document.body.removeChild($('#drop-target'))
    const reader = new Reader()
    globalThis.reader = reader
    await reader.open(file)
}

// Override the URL parameter handling
const params = new URLSearchParams(location.search)
const url2 = params.get('url2')
if (url2) {
    fetch(url2)
        .then(res => res.blob())
        .then(blob => open(new File([blob], new URL(url2, window.location.origin).pathname)))
        .catch(e => console.error(e))
} else {
    $('#drop-target').style.visibility = 'visible'
}