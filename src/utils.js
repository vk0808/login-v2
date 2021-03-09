export async function login({ username, password, data }) {
  return new Promise((resolve, reject) => {
    data.forEach((item) => {
      setTimeout(() => {
        console.log(username, password, item.name, item.pass);
        if (username === item.name && password === item.pass) {
          return resolve();
        } else {
          return reject();
        }
      }, 500);
    });
  });
}
