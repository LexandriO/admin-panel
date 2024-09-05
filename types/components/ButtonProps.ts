type ButtonSizeType = "small" | "medium" | "large";
type ButtonColorType = "white" | "black";

export interface IButtonProps {
  size?: ButtonSizeType;
  color?: ButtonColorType;
  fullWidth?: boolean;
}
