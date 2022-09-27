import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  OutlineBluegray100: "bg-white_A700 border border-bluegray_100 border-solid",
};
const shapes = { RoundedBorder6: "rounded-radius6" };
const sizes = {
  sm: "lg:pb-[11px] xl:pb-[13px] pb-[15px] 3xl:pb-[18px] lg:pt-[14px] xl:pt-[16px] pt-[18px] 3xl:pt-[21px] lg:px-[11px] xl:px-[13px] px-[15px] 3xl:px-[18px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${wrapClassName} ${shapes[shape] || ""} ${
            variants[variant] || ""
          } ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf(["RoundedBorder6"]),
  variant: PropTypes.oneOf(["OutlineBluegray100"]),
  size: PropTypes.oneOf(["sm"]),
};
Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "RoundedBorder6",
  variant: "OutlineBluegray100",
  size: "sm",
};

export { Input };
