import i18nService from "../../services/i18n-service/i18n-service";
import express from "express";
import path from "path";

const Localization = ({ app, config, userModel }) => {
  const apiRoutes = express.Router();
  let localesPath = path.join(
    __dirname,
    "../../",
    "/services/i18n-service/locales"
  );
  apiRoutes.use("/locales", express.static(localesPath));
  let i18nApi = i18nService();
  return [i18nApi, apiRoutes];
};

export default Localization;
