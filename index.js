const { parse } = require("json2csv");
const fs = require("fs");

const getCo2 = async () => {
  const url =
    "https://bostonschoolsiaq.terrabase.com/api/v1/District/Latest/Param/co2/4";
  const data = await fetch(url);
  const json = await data.json();

  const exceeds = json.filter(({ val }) => val > 1000);

  //   const fullMap = json.reduce((acc, x) => {
  //     if (!acc?.[x.sn]) {
  //       acc[x.sn] = [];
  //     }
  //     acc[x.sn].push(x);
  //     return acc;
  //   }, {});

  //   const exceedsMap = exceeds.reduce((acc, x) => {
  //     if (!acc?.[x.sn]) {
  //       acc[x.sn] = [];
  //     }
  //     acc[x.sn].push(x);
  //     return acc;
  //   }, {});

  const csv = parse(exceeds);
  if (!fs.existsSync("./reports")) {
    fs.mkdirSync("./reports");
  }
  fs.writeFileSync(`./reports/${new Date().toISOString()}.csv`, csv);

  console.table({
    "schools evaluated": Object.keys(fullMap).length,
    "schools with exceedances": Object.keys(exceedsMap).length,
  });
};

getCo2();
