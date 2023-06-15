// import React, { useEffect, useState } from "react";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import "./styles.css";
// import { get100Coins } from "../../../functions/get100Coins";
// function SelectCoins({ crypto1, crypto2, handelCoinChange }) {
//   const [allCoins, setAllCoins] = useState([]);
//   const styles = {
//     height: "2.5rem",
//     color: "var(--white)",
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "var(--white)",
//     },
//     "& .MuiSvgIcon-root": {
//       color: "var(--white)",
//     },
//     "&:hover": {
//       "&& fieldset": {
//         borderColor: "#3a80e9",
//       },
//     },
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   async function getData() {
//     const myCoins = await get100Coins();
//     setAllCoins(myCoins);
//   }
//   return (
//     <>
//       {allCoins?.length > 0 ? (
//         <div className="coins-flex">
//           <p>Crypto 1</p>
//           <Select
//             sx={styles}
//             value={crypto1}
//             label="Crypto 1"
//             onChange={(event) => handelCoinChange(event, false)}
//           >
//             {allCoins
//               ?.filter((item) => item.id !== crypto2)
//               .map((coin, i) => (
//                 <MenuItem key={i} value={coin.id}>
//                   {coin.name}
//                 </MenuItem>
//               ))}
//           </Select>
//           <p>Crypto 2</p>
//           <Select
//             sx={styles}
//             value={crypto2}
//             label="Crypto 2"
//             onChange={(event) => handelCoinChange(event, true)}
//           >
//             {allCoins
//               ?.filter((item) => item.id !== crypto1)
//               .map((coin, i) => (
//                 <MenuItem key={i} value={coin.id}>
//                   {coin.name}
//                 </MenuItem>
//               ))}
//           </Select>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }

// export default SelectCoins;



import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./styles.css"
import { get100Coins } from '../../../functions/get100Coins';
function SelectCoins({ crypto1, crypto2, handelCoinChange }) {

  const [allCoins, setAllCoins] = useState([]);
  const styles = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  }

  useEffect(() => {
    getData()
  }, []);
  async function getData() {
    const myCoins = await get100Coins();
    setAllCoins(myCoins)
  }
  return (

    <div className='coins-flex'>
      <p>Crypto 1</p>
      <Select
        sx={styles}
        value={crypto1}
        label="Crypto 1"
        onChange={(event) => handelCoinChange(event, false)}
      >
        {allCoins
          .filter((item) => item.id !== crypto2)
          .map((coin, i) => (
            <MenuItem key={i}
              value={coin.id}>{coin.name}
            </MenuItem>
          ))}

      </Select>
      <p>Crypto 2</p>
      <Select
        sx={styles}
        value={crypto2}
        label="Crypto 2"
        onChange={(event) => handelCoinChange(event, true)}
      >
        {allCoins
          .filter((item) => item.id !== crypto1)
          .map((coin, i) => (<MenuItem
            key={i}
            value={coin.id}>{coin.name}</MenuItem>))}

      </Select>
    </div>
  )
}

export default SelectCoins