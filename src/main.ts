import { changeTheme } from './utils/changeTheme'
import { appendExistingList, generateBookmarksList } from './utils/generateList';
import { debounce, findByValue, generateDropdownItems } from './utils/search';

changeTheme()

const fileInputElement = document.querySelector('input[type="file"]');

fileInputElement?.addEventListener('change', (event) => {
  const inputElement = event.target;

  if (inputElement instanceof HTMLInputElement) {
    const file = inputElement?.files?.[0];

    file && generateBookmarksList(file);
  }
})

appendExistingList()


const searchItem = document.querySelector('.search');
const bookmarkList = document.querySelector('.list');
const links = bookmarkList?.querySelectorAll('a');
const convertedLinks: Array<{title: string, href: string}> = [];
const findLinks = findByValue(convertedLinks);

links?.forEach((link) => {
  convertedLinks.push({
    title: link.textContent ?? 'Not found title',
    href: link.href
  })
})


const onChange = (event: Event) => {
  const inputElement = event.target
  if (inputElement instanceof HTMLInputElement) {
    const value = inputElement.value

    // if (!value) return;

    const foundedLinks = findLinks(value)
    generateDropdownItems(foundedLinks)
   
  }
}

searchItem?.addEventListener('input', debounce(onChange, 300))