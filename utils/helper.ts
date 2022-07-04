export function timeSince(date: any) {
  const currentData: any = new Date();
  var seconds = Math.floor((currentData - date) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  return Math.floor(seconds) + " seconds";
}

export function isValidEmail(email: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function randomColorGenerator() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

export function getLoggedUserData() {
  let userData = {
    _id: "",
    email: "",
    avatar: "",
  };

  if (typeof window !== "undefined") {
    const localStorageData: string =
      localStorage.getItem("WAW-Clone-userData") || "";
    if (localStorageData) userData = JSON.parse(localStorageData);
  }

  return userData;
}

export function getContactEmail(chatData: any, loggedUser: string) {
  const contactData = chatData?.metaData?.filter(
    (meta: any) => meta?.email !== loggedUser
  )[0];
  return contactData;
}
