import cn from "clsx";
import { useTranslation } from "react-i18next";

import { changeLanguage, getLanguage } from "@/utils/localization";
import styles from "./styles.module.scss";

const languages = [
  {
    name: "English",
    code: "en-US",
    img: "assets/images/en.svg",
  },
  {
    name: "Dutch",
    code: "nl-NL",
    img: "assets/images/nl.svg",
  },
];

export function ChangeLanguage() {
  const language = getLanguage();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {languages.map(({ name, code, img }) => {
        const languageStyles = cn({
          [styles.language]: true,
          [styles.languageActive]: code === language,
        });

        return (
          <div className={languageStyles} onClick={() => changeLanguage(code)} key={code}>
            <div className={styles.languageLabel}>
              <img src={img} height={25} width={25} alt={`Choose language: ${name}`} />
              <p>{name}</p>
            </div>
            {code === language && <span>{`(${t("settings.currentlySelected")})`}</span>}
          </div>
        );
      })}
    </div>
  );
}
