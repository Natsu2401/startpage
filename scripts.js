/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"LVcbePXwz0Cor79U","label":"reddit","bookmarks":[{"id":"2W1hiR4d84jTEk3P","label":"Facebook","url":"https://www.facebook.com"},{"id":"qTJge8Mr5jdLx1fx","label":"Youtube","url":"https://www.youtube.com"},{"id":"POKlUEyw9tCUnREZ","label":"Instagram","url":"https://www.instagram.com/"}]},{"id":"3JmkbTjUGSz8r18A","label":"design tools","bookmarks":[{"id":"iG6HiqjdzV2TqV8H","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"hodzOgO5daWf7pAh","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"4PBuvzJkt9lg25yS","label":"haikei","url":"https://app.haikei.app/"},{"id":"TBMkliZDsA7Lg1Jb","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"9IU9xb1PBJxQvP1S","label":"worth reading","bookmarks":[{"id":"ggdKASSYyBLt00xx","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"d9omIutzSjkpiry5","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"J5ISnQ8VzOBnYkjD","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"EKL0my38ZtrJix3x","label":"sources","bookmarks":[{"id":"673Vc1SIVkAhRyUW","label":"icons","url":"https://feathericons.com/"},{"id":"MJhJDX6zi44ejwzD","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"0CNwTdVAtVmBXtDB","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"kRWZGwdBl9UUGshC","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
