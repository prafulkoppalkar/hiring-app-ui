import { ICONS_MAP } from "../constants/generalConstants";
const Icon = ({ name, className, displayName }) => {
  return (
    <>
      <i class={`${ICONS_MAP[name]} ${className}`}></i>
      {displayName && ` ${displayName}`}
    </>
  );
};
export default Icon;
