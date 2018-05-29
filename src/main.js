document.addEventListener('DOMContentLoaded', () => {
  console.debug("ready!")
  init()
}, {once: true})

function init() {
  const delay = 10 * 60 * 1000 // 10 min
  const render = () => {
    console.debug('reload..')
    location.reload()
  }
  setInterval(() => render(), delay)

  parseUrl()
}

function parseUrl() {
  let html
  const el = document.querySelector('.iframe-list')
  let inputString = getQueryVariable('q')
  if (inputString) {
    html = decodeURIComponent(inputString)
      .split(',')
      .filter(id => !!id)
      .map(id => {
        return `
        <div class="cell auto">
            <iframe class="iframe-graph" frameborder="0" scrolling="no" src="//plot.ly/~rethore/${id}"></iframe>
        </div>            
      `
      })
      .join('')
    el.innerHTML = html
  }
  else {
    html = `
      <p>
        Add some IDs to the url, fx <code>http://localhost:8080/?q=15.embed?share_key=QRyGh13G0ZJak8ay8MlE3Q,15.embed?share_key=QRyGh13G0ZJak8ay8MlE3Q</code>
      </p>
    `
  }

  el.innerHTML = html

}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1])
    }
  }
}