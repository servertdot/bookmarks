export const debounce = (cb: any, delay = 1000) => {
  let timer: any;

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  }
}

export const findByValue = (array: Array<{title: string, href: string}>) => {
  return (inputValue: string) => {
    return inputValue.length ? array.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase())) : []
  }
}

export const generateDropdownItems = (array: Array<{title: string, href: string}>) => {
  const dropdownWrapper = document.querySelector('.search-dropdown');
  
  if (array.length) {
    dropdownWrapper?.classList.remove('hidden')
  } else {
    dropdownWrapper?.classList.add('hidden')
  }


  if (dropdownWrapper) {
    dropdownWrapper.innerHTML = ''
  }

  array.forEach(item => {
    const dropdownItem = document.createElement('a');
    dropdownItem.classList.add('search-dropdown__item')
    // const dropdownLink = document.createElement('a');
    dropdownItem.innerText = item.title;
    dropdownItem.href = item.href;

    // dropdownItem.appendChild(dropdownLink)
    dropdownWrapper?.appendChild(dropdownItem)
  })

}