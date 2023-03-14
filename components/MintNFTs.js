import styles from "../styles/Home.module.css";

import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';


import dynamic from 'next/dynamic';
import NFTCard from "./NFTcard"
const GLBViewer = dynamic(
    () =>
    import ('./Glbviewer'), { ssr: false }
)


export const MintNFTs = ({ onClusterChange }) => {
    const { metaplex } = useMetaplex();
    const wallet = useWallet();
    const override = css `
    display: block;
    margin: 0 auto;
    border-color: red;
    width: 20px;
  height: 20px;
  `;

    const [nft, setNft] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [disableMint, setDisableMint] = useState(false);
    const mapping = {

        "xbow": {

            "src": "./xbow.glb",
            "price": "100",
            "currency": "Aureus",
            "candymachine": "8W4F3BoW1BK27YjMASVDFZQDSRVLTxtmPxvFWNNCqD9b"
        },
        "townhall": {
            "src": "./townhall.glb",
            "price": "0.01",
            "currency": "Solana",
            "candymachine": "AzGzVcoo9uwzUUN8H1uVaBB4DCig6Po8SXcFGRN4PiS5"
        },
        "miner": {
            "src": "./miner.glb",
            "price": "0.1",
            "currency": "Solana",
            "candymachine": "7HnUFoU3j6Dvs6x643SkEE2ZMUvJK1rhnuiLjZe7jSMP"
        },
        "tesla": {
            "src": "./tesla.glb",
            "price": "120",
            "currency": "Aureus",
            "candymachine": "DyRkBKQTSvUSqEnmLPdTM8gZ67kUFSjEjkrzKpon7S9Z"
        },
        "cannon": {
            "src": "./cannon.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "6i8ubJ5fSs4BV4vcYe7H7U6NUu74Gj42yZzxfi4rPvSQ"
        },
        "archer": {
            "src": "./archer.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "FxK3GMbxU74WXKFB82ndx99Mcs4t1pMUYtc8xzmXRtyC"
        },
        "robot": {
            "src": "./robot.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "12QVJusmwTxe4XwjUPSrJAdRp13g7h9uY4uyuX2mBoeo"
        },
        "valkyrie": {
            "src": "./valkyrie.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "AuPCGX5iE91aVpwZpCvAiQcH6KEJVs9rHZqotrzaxiQa"
        }
    }

    let walletBalance;
    const [selectedValue, setSelectedValue] = useState('xbow');

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };


    // show and do nothing if no wallet is connected
    if (!wallet.connected) {
        return null;
    }



    const onClick = async() => {
        setIsLoading(true)
        const candyMachineAddress = new PublicKey(mapping[selectedValue].candymachine);
        console.log(mapping[selectedValue].candymachine)
        let candyMachine = await metaplex.candyMachines().findByAddress({ address: candyMachineAddress })

        console.log(candyMachine)
        try {
            const { nft } = await metaplex.candyMachines().mint({
                candyMachine,
                collectionUpdateAuthority: candyMachine.authorityAddress,
            });
        } catch {
            return
        }
        setIsLoading(false);
        alert("NFT minted Successfully")
        setNft(nft);

    };

    return ( <
        div className = { styles.separator } > <
        div >
        <
        select onChange = { onClusterChange }
        className = { styles.dropdown } >
        <
        option value = "devnet" > Devnet < /option> <
        option value = "mainnet" > Mainnet < /option> <
        option value = "testnet" > Testnet < /option> < /
        select >

        <
        div style = {
            {
                "display": "flex",
                "flex-wrap": "wrap",
                "margin-right": "10px",
                "width": "150%"
            }
        } >
        <
        label >
        <
        input type = "radio"
        value = "xbow"
        checked = { selectedValue === 'xbow' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Xbow < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "tesla"
        checked = { selectedValue === 'tesla' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Tesla < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "cannon"
        checked = { selectedValue === 'cannon' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Canon < /div> < /
        label >
        <
        label >
        <
        input type = "radio"
        value = "valkyrie"
        checked = { selectedValue === 'valkyrie' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Valkyrie < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "robot"
        checked = { selectedValue === 'robot' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Robot < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "archer"
        checked = { selectedValue === 'archer' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Archer < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "miner"
        checked = { selectedValue === 'miner' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Miner < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "townhall"
        checked = { selectedValue === 'townhall' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label"
        style = {
            { "padding": "5px" }
        } > Townhall < /div> < /
        label >


        <
        /div>

        <
        div >
        <
        div className = { styles.container } >
        <
        div className = { styles.nftForm } >

        <
        /
        div > <
        /div>  <
        RingLoader color = { '#36D7B7' }
        css = { override }
        loading = { isLoading }
        /> <
        div className = { styles.nftcontainer } >
        <
        NFTCard name = { selectedValue }
        price = { mapping[selectedValue].price }
        currency = { mapping[selectedValue].currency }
        /> < /
        div > <
        button className = { styles.nftcardbutton }
        onClick = { onClick }
        disabled = { disableMint } >

        Mint <
        /button> 

        <
        /
        div >
        <
        /div>  <
        div style = {
            { "paddingTop": "10%" }
        } >
        <
        GLBViewer src = { mapping[selectedValue].src }
        / > < /
        div > <
        /div>
    );
};