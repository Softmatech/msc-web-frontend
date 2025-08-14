// Dashboard.tsx
import { Divider, Grid, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import {
  AccountBalanceOutlined,
  MonetizationOn,
  MonetizationOnRounded,
  MoneyOffCsred,
  MoneyRounded,
  MoneySharp,
} from "@mui/icons-material";
import { fetchUtils } from "react-admin";
import { useEffect, useState } from "react";
import baseApiUrl, { formatStringNumber } from "../url_base";
import DashBoardCard from "./DashBoardCard";
import TodayDashboardCard from "./TodayDashBoardCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DepotUSDChart from "./DepotUSDChart";
import DepotHTGChart from "./DepotHTGChart";
import RetraittUSDChart from "./RetraitUSDChart";
import RetraitHTGChart from "./RetraitHTGChart";
import { useNavigate } from "react-router";

// get the total of Person from the database
const getPersonCount = async () => {
  const url = baseApiUrl + "/persons/count"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};
// get the total of account from the database
const getAccountCount = async () => {
  const url = baseApiUrl + "/accounts/count"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of Transaction from the database
const getTransactionCount = async () => {
  const url = baseApiUrl + "/transactions/count"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of HTG Depot from the database
const getTotalDepotHTGTransaction = async () => {
  const url = baseApiUrl + "/transactions/sum-depot-htg"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of USD Depot from the database
const getTotalDepotUSDTransaction = async () => {
  const url = baseApiUrl + "/transactions/sum-depot-usd"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of HTG Retrait from the database
const getTotalRetraitHTGTransaction = async () => {
  const url = baseApiUrl + "/transactions/sum-retrait-htg"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of USD Retrait from the database
const getTotalRetraitUSDTransaction = async () => {
  const url = baseApiUrl + "/transactions/sum-retrait-usd"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};
// -----------------------------------------------------------2nd level---------------------------------------------------------------------
// get the total of USD Depot from the database
const getTotalDepotUSDTransactionForToday = async () => {
  const url = baseApiUrl + "/transactions/sum-depot-usd-today"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });
  return json;
};

// get the total of HTG Depot from the database
const getTotalDepotHTGTransactionForToday = async () => {
  const url = baseApiUrl + "/transactions/sum-depot-htg-today"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of USD Retrait from the database
const getTotalRetraitUSDTransactionForToday = async () => {
  const url = baseApiUrl + "/transactions/sum-retrait-usd-today"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the total of HTG Retrait from the database
const getTotalRetraitHTGTransactionForToday = async () => {
  const url = baseApiUrl + "/transactions/sum-retrait-htg-today"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the last 7 daily total of USD Retrait from the database
const getDailyUSDRetraitFromLastSevenDays = async () => {
  const url = baseApiUrl + "/transactions/sum-retrait-usd-last-week"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the last 7 daily total of USD Retrait from the database
const getDailyHTGRetraitFromLastSevenDays = async () => {
  const url = baseApiUrl + "/transactions/sum-retrait-htg-last-week"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the last 7 daily total of USD Depot from the database
const getDailyUSDDepotFromLastSevenDays = async () => {
  const url = baseApiUrl + "/transactions/sum-depot-usd-last-week"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

// get the last 7 daily total of HTG Depot from the database
const getDailyHTGDepotFromLastSevenDays = async () => {
  const url = baseApiUrl + "/transactions/sum-depot-htg-last-week"; // your Spring Boot endpoint

  const token = localStorage.getItem("token"); // or whatever key you use
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const { json } = await fetchUtils.fetchJson(url, { headers });

  return json;
};

const Dashboard = () => {
  const [personCount, setPersonCount] = useState(0);
  const [accountCount, setAccountCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [totalDepotHTGTransaction, setTotalDepotHTGTransaction] = useState(0);
  const [totalDepotUSDTransaction, setTotalDepotUSDTransaction] = useState(0);
  const [totalRetraitHTGTransaction, setTotalRetraitHTGTransaction] =
    useState(0);
  const [totalRetraitUSDTransaction, setTotalRetraitUSDTransaction] =
    useState(0);
  const [
    totalDepotUSDTransactionForToday,
    setTotalDepotUSDTransactionForToday,
  ] = useState(0);
  const [
    totalDepotHTGTransactionForToday,
    setTotalDepotHTGTransactionForToday,
  ] = useState(0);
  const [
    totalRetraitUSDTransactionForToday,
    setTotalRetraitUSDTransactionForToday,
  ] = useState(0);
  const [
    totalRetraitHTGTransactionForToday,
    setTotalRetraitHTGTransactionForToday,
  ] = useState(0);
  const [
    dailyUSDRetraitFromLastSevenDays,
    setDailyUSDRetraitFromLastSevenDays,
  ] = useState([]);

  const [
    dailyHTGRetraitFromLastSevenDays,
    setDailyHTGRetraitFromLastSevenDays,
  ] = useState([]);

  const [dailyUSDDepotFromLastSevenDays, setDailyUSDDepotFromLastSevenDays] =
    useState([]);

  const [dailyHTGDepotFromLastSevenDays, setDailyHTGDepotFromLastSevenDays] =
    useState([]);

  useEffect(() => {
    // call GetPersonCount Method to get the total of person
    getPersonCount().then(setPersonCount).catch(console.error);
    // call GetAccount Method
    getAccountCount().then(setAccountCount).catch(console.error);
    // call GetTransaction
    getTransactionCount().then(setTransactionCount).catch(console.error);
    // call getTotalDepotHTG Method
    getTotalDepotHTGTransaction()
      .then(setTotalDepotHTGTransaction)
      .catch(console.error);
    // call getTotalDepotUSD
    getTotalDepotUSDTransaction()
      .then(setTotalDepotUSDTransaction)
      .catch(console.error);
    // call getRetraitHTG Method
    getTotalRetraitHTGTransaction()
      .then(setTotalRetraitHTGTransaction)
      .catch(console.error);
    // call getTotalRetrait
    getTotalRetraitUSDTransaction()
      .then(setTotalRetraitUSDTransaction)
      .catch(console.error);
    // call getTotalDepotUSD
    getTotalDepotUSDTransactionForToday()
      .then(setTotalDepotUSDTransactionForToday)
      .catch(console.error);
    // call getTotalDepotHTG
    getTotalDepotHTGTransactionForToday()
      .then(setTotalDepotHTGTransactionForToday)
      .catch(console.error);
    // call getTotalRetraitUSD
    getTotalRetraitUSDTransactionForToday()
      .then(setTotalRetraitUSDTransactionForToday)
      .catch(console.error);
    // call getTotalRetraitHTG
    getTotalRetraitHTGTransactionForToday()
      .then(setTotalRetraitHTGTransactionForToday)
      .catch(console.error);
    // call getDailyUSDRetraitFromLastSevenDays to fetch data for the chart line
    getDailyUSDRetraitFromLastSevenDays()
      .then(setDailyUSDRetraitFromLastSevenDays)
      .catch(console.error);
    // call getDailyHTGRetraitFromLastSevenDays to fetch data for the chart line
    getDailyHTGRetraitFromLastSevenDays()
      .then(setDailyHTGRetraitFromLastSevenDays)
      .catch(console.error);
    // call getDailyHTGRetraitFromLastSevenDays to fetch data for the chart line
    getDailyUSDDepotFromLastSevenDays()
      .then(setDailyUSDDepotFromLastSevenDays)
      .catch(console.error);
    // call getDailyHTGRetraitFromLastSevenDays to fetch data for the chart line
    getDailyHTGDepotFromLastSevenDays()
      .then(setDailyHTGDepotFromLastSevenDays)
      .catch(console.error);
  }, []);

  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // Assuming role is stored here

  useEffect(() => {
    if (role !== "Administrateur") {
      navigate("/"); // Or redirect to another page
    }
  }, [role, navigate]);

  if (role !== "Administrateur") {
    return null; // Prevent rendering if not admin
  }

  return (
    <div>
      <Grid container spacing={1} padding={1}>
        {/* Card 1 - Total Persons */}
        <DashBoardCard
          title="Nombre de Client Actifs"
          content={formatStringNumber(personCount)}
          icon={PeopleIcon}
          style={``}
        />

        {/* Card 2 - Add Person */}
        <DashBoardCard
          title="Nombre de Compte
                Actifs"
          content={formatStringNumber(accountCount)}
          icon={AccountBalanceOutlined}
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
        />
        {/* Card 3 - Add Person */}
        <DashBoardCard
          title="Total Depot HTG"
          content={formatStringNumber(totalDepotHTGTransaction)}
          icon={MonetizationOn}
          style={``}
        />

        {/* Card 4 - Add Person */}
        <DashBoardCard
          title="Total Depot USD"
          content={formatStringNumber(totalDepotUSDTransaction)}
          icon={MonetizationOnRounded}
          style={{ backgroundColor: "green", color: "#fff" }}
        />
        {/* Card 5 - Add Person */}

        <DashBoardCard
          title="Total Retrait HTG"
          content={formatStringNumber(totalRetraitHTGTransaction)}
          icon={MoneyOffCsred}
          style={``}
        />

        {/* Card 6 - Status */}
        <DashBoardCard
          title="Total Retrait USD"
          content={formatStringNumber(totalRetraitUSDTransaction)}
          icon={MoneyRounded}
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
        />
      </Grid>

      <Grid container spacing={1} padding={1}>
        <Grid item xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
          <Divider />
          <Typography variant="h5">Transactions pour la journée</Typography>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={1} padding={1}>
        <TodayDashboardCard
          title="Depôt USD"
          content={formatStringNumber(totalDepotUSDTransactionForToday)}
          icon={CurrencyExchangeIcon}
          color="#2196f3"
        />
        <TodayDashboardCard
          title="Depôt Gourdes"
          content={formatStringNumber(totalDepotHTGTransactionForToday)}
          icon={CurrencyExchangeIcon}
          color="#4caf50"
        />
        <TodayDashboardCard
          title="Retrait USD"
          content={formatStringNumber(totalRetraitUSDTransactionForToday)}
          icon={AttachMoneyIcon}
          color="#ff9800"
        />
        <TodayDashboardCard
          title="Retrait Gourdes"
          content={formatStringNumber(totalRetraitHTGTransactionForToday)}
          icon={MoneySharp}
        />
      </Grid>
      <Grid container spacing={2} padding={2}>
        <DepotUSDChart data={dailyUSDDepotFromLastSevenDays} />
        <DepotHTGChart data={dailyHTGDepotFromLastSevenDays} />
        <RetraittUSDChart data={dailyUSDRetraitFromLastSevenDays} />
        <RetraitHTGChart data={dailyHTGRetraitFromLastSevenDays} />
      </Grid>
    </div>
  );
};

export default Dashboard;
