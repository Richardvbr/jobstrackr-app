import styles from "./styles.module.scss";
import { changeLanguage } from "@/utils/localization";

const languages = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "Dutch",
    code: "nl",
  },
];

export function ChangeLanguage() {
  return (
    <div className={styles.container}>
      {languages.map(({ name, code }) => (
        <div className={styles.language} onClick={() => changeLanguage(code)} key={code}>
          <img
            src={`/assets/images/${code}.svg`}
            height={25}
            width={25}
            alt={`Choose language: ${name}`}
          />
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
}
