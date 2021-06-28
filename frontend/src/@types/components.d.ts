interface IStyle {
  className?: string;
  width?: number;
  marginBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  padding?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingLeft?: number;
}

interface IHeader {}

interface ISearchBar extends IStyle {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "password";
  error?: any;
  id?: string;
  isFocus?: boolean;
  valueOnChange?: any;
  onClick?: any;
}

interface IButton extends IStyle {
  className?: string;
  color?: string;
  height?: number;
  borderRadius?: number;
  width?: number | string;
  backgroundColor?: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  type?: 'submit' | 'button';
  fontSize?: number;
  fontWeight?: Property.FontWeight;
  background?: string;
  border?: Property.Border<string | number>;
  disabled?: boolean;
  isWhite?: boolean;
}
