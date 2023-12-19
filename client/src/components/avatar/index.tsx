import cn from "clsx";

import { getFirstCharacterCapitalized } from "@/utils/text";
import { UserData } from "@/types/user";
import styles from "./styles.module.scss";

type AvatarProps = {
  data: UserData | undefined;
  onClick?: () => void;
  size?: "s" | "m" | "l";
};

const Avatar = ({ data, onClick, size = "s" }: AvatarProps) => {
  const { picture, full_name } = data?.user_metadata || {};

  return (
    <div className={styles.container} onClick={onClick}>
      {picture ? (
        <div className={cn(styles.image, styles[size])}>
          <img alt='user image' src={picture} />
        </div>
      ) : (
        <div className={cn(styles.placeholder, styles[size])}>
          <span>
            {getFirstCharacterCapitalized(full_name || (data?.email as string))}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
