export const formatNumber = (value) => {
  const breakpoints = {
    1000: 'k',
    1000000: 'M',
  };

  for (const [breakpoint, suffix] of Object.entries(breakpoints).reverse())
    if (value >= breakpoint)
      return `${(value / breakpoint).toFixed(1)}${suffix}`;

  return value.toString();
};
