
export const config = {
  url: 'http://127.0.0.1:8080/api',
  projectName: '',
  appId: '123456',
  userId: '123456',
  isImageUpload: false,
  batchSize: 20
};
export function setConfig(options) {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
}

