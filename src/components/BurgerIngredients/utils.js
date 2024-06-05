export const getIntersectionBlock = (tabsTitle, contentRefTop) => {
  const distances = Object.keys(tabsTitle)
    .map((key) => {
      const tabRef = tabsTitle[key].current;
      if (tabRef) {
        return {
          key,
          distance: Math.abs(
            tabRef.getBoundingClientRect().bottom - contentRefTop
          ),
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  if (distances.length === 0) {
    return null;
  }

  return distances.reduce((prev, curr) =>
    prev.distance < curr.distance ? prev : curr
  ).key;
};
