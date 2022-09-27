import React from "react";
import PropTypes from "prop-types";

const shapes = { RoundedBorder6: "rounded-radius6" };
const variants = {
  FillBluegray50: "bg-bluegray_50 text-bluegray_400",
  FillYellow900: "bg-yellow_900 text-white_A700",
  OutlineDeeporange300:
    "border border-deep_orange_300 border-solid text-deep_orange_300",
};
const sizes = {
  sm: "lg:p-[6px] xl:p-[7px] p-[8px] 3xl:p-[9px]",
  md: "lg:p-[13px] xl:p-[15px] p-[17px] 3xl:p-[20px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${shapes[shape] || ""} ${
        variants[variant] || ""
      } ${sizes[size] || ""} common-button `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["RoundedBorder6"]),
  variant: PropTypes.oneOf([
    "FillBluegray50",
    "FillYellow900",
    "OutlineDeeporange300",
  ]),
  size: PropTypes.oneOf(["sm", "md"]),
};
Button.defaultProps = {
  className: "",
  shape: "RoundedBorder6",
  variant: "FillBluegray50",
  size: "sm",
};

export { Button };
