import i18nService from "../../services/i18n-service/i18n-service";
import express from "express";

const Localization = ({ app, config, userModel }) => {
  const apiRoutes = express.Router();

  apiRoutes.use("/locales", express.static("locales"));

  let i18nApi = i18nService();
  return [i18nApi, apiRoutes];
};

export default Localization;
