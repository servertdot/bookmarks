import { ResultElements } from "../types";

export const generateListItem = (item: HTMLAnchorElement) => {
  const listEl = document.createElement('li');
  listEl.append(item)

  return listEl;
}

export const appendToPage = (list: Array<ResultElements>) => {
  const listWrapper = document.querySelector('.list');

  if (listWrapper) {
    listWrapper.innerHTML = '';
  }

  const itemList: Array<Element> = [];

  list.forEach((item, index) => {
    const itemWrapper = document.createElement('div');
    const headerValue = item.header?.textContent

    itemWrapper.classList.add('list-item');
    itemWrapper.dataset.title = headerValue ?? `empty_${index}`

    item.header && itemWrapper.appendChild(item.header);
    
    itemWrapper.appendChild(item.list)

    listWrapper?.appendChild(itemWrapper)

    itemList.push(itemWrapper)
  })

  saveListToLocalStorage(itemList)
}

const findCorrectElements = (allHeadings: NodeListOf<HTMLHeadingElement>) => {
  const dtElements: HTMLElement[] = []
  const resultElements: Array<ResultElements> = [] 

  allHeadings.forEach((heading, index) => {
    if (index !== 0) {
      heading.parentElement && dtElements.push(heading.parentElement)
    }
  })


  dtElements.forEach((dtElement) => {
    const headerTitle = dtElement.querySelector('h3');
    const currentList = document.createElement('ul');

    const links = dtElement.querySelectorAll('a');

    links.forEach(link => {
      currentList.append(generateListItem(link));
    });

    resultElements.push({
      header: headerTitle,
      list: currentList,
    })
  })

  return resultElements;
}

export const saveListToLocalStorage = (list: Array<Element>) => {
  const listString: any = [];

  list.forEach((listItem) => {
    listString.push(listItem.outerHTML)
  })

  if (listString.length) {
    localStorage.setItem('bookmarks', JSON.stringify(listString));
  }
}

export const generateBookmarksList = (inputFile: File) => {
  const reader = new FileReader();

  reader.onload = function (event) {
    const htmlContent = event.target?.result;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent as string, 'text/html');
    const allHeadings = doc.querySelectorAll('h3');

    const bookmarks = findCorrectElements(allHeadings);

    appendToPage(bookmarks);
    // saveListToLocalStorage(bookmarks);
  };

  reader.readAsText(inputFile);
}

const isBookmarksExist = () => {
  return Boolean(localStorage.getItem('bookmarks'))
}

export const appendExistingList = () => {
  if (!isBookmarksExist) {
    return;
  }

  const htmpParser = new DOMParser();
  const listWrapper = document.querySelector('.list');
  const list = JSON.parse(localStorage.getItem('bookmarks') as string);

  list.forEach((item: string) => {
    const itemContent = htmpParser.parseFromString(item, 'text/html').querySelector('.list-item');
    
    itemContent && listWrapper?.appendChild(itemContent)
  })
}