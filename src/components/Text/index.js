import React from "react";
const variantClasses = {
  h1: "font-normal lg:text-[18px] xl:text-[21px] text-[24px] 3xl:text-[28px]",
  h2: "font-normal lg:text-[15px] xl:text-[17px] text-[20px] 3xl:text-[24px]",
  h3: "font-semibold lg:text-[14px] xl:text-[16px] text-[18px] 3xl:text-[21px]",
  h4: "font-normal lg:text-[12px] xl:text-[14px] text-[16px] 3xl:text-[19px]",
  h5: "font-normal lg:text-[10px] xl:text-[12px] text-[14px] 3xl:text-[16px]",
};
const Text = ({ children, className, variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
