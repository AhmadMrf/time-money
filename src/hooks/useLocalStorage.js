const useLocalStorage = () => {
  const getTotalData = (key) => {
    let localData = localStorage.getItem(key);
    if (!localData) {
      localData = [];
    } else {
      localData = JSON.parse(localData);
    }
    return localData.sort((a, b) => a?.end_time);
  };
  const getLocalData = (key) => {
    return getTotalData(key);
  };
  const setLocalData = (key, value) => {
    const localData = getTotalData(key);
    const newData = [...localData, value];
    localStorage.setItem(key, JSON.stringify(newData));
    return getTotalData(key);
  };
  const deletLocalData = (key, id) => {
    const localData = getTotalData(key);
    const newData = localData.filter((d) => d.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
    return getTotalData(key);
  };

  return { setLocalData, getLocalData, deletLocalData };
};
export { useLocalStorage };
