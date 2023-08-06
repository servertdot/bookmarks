const dayHour = '8:30';
const eveningHour = '18:00';


const getRange1 = (isDay: boolean, hours: string) => {
  const targetTime = isDay ? eveningHour : dayHour;
  const [currentHours, currentMinutes] = hours.split(":");
  const [targetHours, targetMinutes] = targetTime.split(":");

  const currentDateTime = new Date();
  currentDateTime.setHours(parseInt(currentHours, 10), parseInt(currentMinutes, 10), 0);

  const targetDateTime = new Date();
  targetDateTime.setHours(parseInt(targetHours, 10), parseInt(targetMinutes, 10), 0);

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  let milliseconds;

  if (targetDateTime >= currentDateTime) {
    // @ts-ignore
    milliseconds = targetDateTime - currentDateTime;
  } else {
    // @ts-ignore
    milliseconds = (targetDateTime - currentDateTime) + millisecondsInDay;
  }

  return milliseconds;
}

const getRange = (isDay: boolean, hours: number) => {
  const currentDateTime = new Date().setHours(hours);
  const targetDateTime = new Date().setHours(isDay ? 18 : 8);

  if (isDay) {
    const ms = targetDateTime - currentDateTime;
    // return Math.floor(ms / 1000 / 60 / 60)
    return ms
  } 

  const ms = (targetDateTime - currentDateTime) + (24 * 60 * 60 * 1000);
  // return Math.floor(ms / 1000 / 60 / 60)
  return ms
}

const updateSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
}

export const changeTheme = (delay = 0) => {
  // const currentTheme = sessionStorage.getItem('theme');
  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const isDay = currentHours >= 8 && currentHours < 18;

    if (!isDay) {
      document.body.classList.add('theme__dark');
      updateSessionStorage('theme', 'theme__dark');
    } else {
      document.body.classList.add('theme__light');
      updateSessionStorage('theme', 'theme__light');
    }

  setTimeout(() => {
    changeTheme(getRange1(isDay, `${currentHours}:${currentMinutes}`))
  }, delay)

  console.log(delay)
}
