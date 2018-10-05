import i18nService from "../../services/i18n-service/i18n-service";

const Localization = ({ app, config, userModel }) => {
  let i18nApi = i18nService();
  return [i18nApi];
};

export default Localization;
