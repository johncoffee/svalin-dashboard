document.addEventListener('DOMContentLoaded', () => {
  console.debug("ready!")
  init()
}, {once: true})

function init() {
  const delay = parseInt(sessionStorage.refresh, 10) * 1000 || 60 * 1000
  const render = () => {
    console.debug('reload..')
    location.reload()
  }
  setInterval(() => render(), delay)

  parseUrl()
}

function parseUrl() {

  let q = location.search
  q = q.substr( q.indexOf("q=")+2 )

  const frameIds = q.split(",")

  const el = document.querySelector('.iframe-list')
  let html = frameIds
    .filter(id => !!id)
    .map(id => {
      return `
        <div class="cell auto">
            <iframe class="iframe-graph" frameborder="0" scrolling="no" src="https://plot.ly/~piredtu/${id}.embed"></iframe>
        </div>            
      `
    })
    .join('')

  if (!html) {
    html = `
      <h3>
        Add some IDs to the url, fx <code>http://localhost:8080/?q=35,36</code>
      </h3>
    `
  }

  el.innerHTML = html
}

