import {
  Admin,
  bwDarkTheme,
  bwLightTheme,
  radiantDarkTheme,
  radiantLightTheme,
  Resource,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./tools/dataProvider";
import { authProvider } from "./tools/Authprovider";
import { MonetizationOn } from "@mui/icons-material";
import AchatsList from "./achats/AchatsList";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    theme={bwLightTheme}
    darkTheme={bwDarkTheme}
    // authProvider={authProvider}
  >
    <Resource
      name="achats"
      list={AchatsList}
      //   show={AccountShow}
      // edit={AccountEdit}
      //   create={AccountCreate}
      icon={MonetizationOn}
    />
  </Admin>
);
