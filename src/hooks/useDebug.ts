import React from "react";

//　実際に使う hook
export const UseChangeDebugger = (props: any) => {
  const previousValue = usePrevious(props);

  const getChange = getChanges(previousValue, props);

  if (getChange) {
    getChange.forEach((change: any) => console.log(change));
  }
};

const usePrevious = (props: any) => {
  const previousValue = React.useRef(null);

  React.useEffect(() => {
    previousValue.current = props;
  });

  return previousValue.current;
};

function getChanges(previousValue: any, currentValue: any) {
  if (
    typeof previousValue === "object" &&
    previousValue !== null &&
    typeof currentValue === "object" &&
    currentValue !== null
  ) {
    return Object.entries(currentValue).reduce((acc: any, cur) => {
      const [key, value] = cur;
      const oldValue = previousValue[key];

      if (value !== oldValue) {
        acc.push({
          name: key,
          previousValue: oldValue,
          currentValue: value,
        });
      }

      return acc;
    }, []);
  }

  if (previousValue !== currentValue) {
    return [{ previousValue, currentValue }];
  }

  return [];
}
