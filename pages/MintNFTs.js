import styles from "../styles/Home.module.css";
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import dynamic from 'next/dynamic';
import NFTCard from "./NFTcard"
const GLBViewer = dynamic(
    () =>
    import ('./Glbviewer'), { ssr: false }
)


export const MintNFTs = ({ onClusterChange }) => {
    const { metaplex } = useMetaplex();
    const wallet = useWallet();

    const [nft, setNft] = useState(null);

    const [disableMint, setDisableMint] = useState(false);
    const mapping = {

        "xbow": {

            "src": "./xbow.glb",
            "price": "100",
            "currency": "Aureus",
            "candymachine": "8ynfucir4qhejWtuCMXBH2nks7zoGnEXdgpLivdaudc8"
        },
        "townhall": {
            "src": "./townhall.glb",
            "price": "0.01",
            "currency": "Solana",
            "candymachine": "EGGinh4T2XhwzAZXCEWC8WsyxYS3ga3jfiU2TYi2k1Mg"
        },
        "miner": {
            "src": "./miner.glb",
            "price": "0.1",
            "currency": "Solana",
            "candymachine": "FbRr4tVksRuW3wz98DpK1KpZhund94XfBKDy53PZ5f5q"
        },
        "tesla": {
            "src": "./tesla.glb",
            "price": "120",
            "currency": "Aureus",
            "candymachine": "2Vpj8sWy1VniJZF1ArfZtFdu6Zt2eQmX659CZtHVy6ry"
        },
        "cannon": {
            "src": "./cannon.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "5chhmq4uPQpeZxNXXJQdZgB8qYxUDzYhdQ9vS4KKLV4t"
        },
        "archer": {
            "src": "./archer.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "CpKkGgY6wrtQ95Vou8xVqFS99EuzC5LTR1ur4MSyxa2z"
        },
        "robot": {
            "src": "./robot.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "53xmJKzX5s1nai6iXLDoMbEicauXiBbBn1Anm9Mj8afC"
        },
        "valkyrie": {
            "src": "./valkyrie.glb",
            "price": "130",
            "currency": "Aureus",
            "candymachine": "ApygrrkriSV5gzFYSMXwQ4FRJKQJsRPFWzuVTo2NtBUb"
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

        const candyMachineAddress = new PublicKey(mapping[selectedValue].candymachine);
        console.log(mapping[selectedValue].candymachine)
        let candyMachine = await metaplex.candyMachines().findByAddress({ address: candyMachineAddress })
            // Here the actual mint happens. Depending on the guards that you are using you have to run some pre validation beforehand 
            // Read more: https://docs.metaplex.com/programs/candy-machine/minting#minting-with-pre-validation

        console.log(candyMachine)
        const { nft } = await metaplex.candyMachines().mint({
            candyMachine,
            collectionUpdateAuthority: candyMachine.authorityAddress,
        });
        alert("NFT minted Successfully")
        setNft(nft);
    };

    return ( <
        div className = "separator" > <
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
        div className = "radio-button-group" >
        <
        label >
        <
        input type = "radio"
        value = "xbow"
        checked = { selectedValue === 'xbow' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Xbow < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "tesla"
        checked = { selectedValue === 'tesla' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Tesla < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "cannon"
        checked = { selectedValue === 'cannon' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Canon < /div> < /
        label >
        <
        label >
        <
        input type = "radio"
        value = "valkyrie"
        checked = { selectedValue === 'valkyrie' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Valkyrie < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "robot"
        checked = { selectedValue === 'robot' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Robot < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "archer"
        checked = { selectedValue === 'archer' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Archer < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "miner"
        checked = { selectedValue === 'miner' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Miner < /div> < /
        label > <
        label >
        <
        input type = "radio"
        value = "townhall"
        checked = { selectedValue === 'townhall' }
        onChange = { handleRadioChange }
        /> <
        div className = "radio-label" > Townhall < /div> < /
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
        /div> 

        <
        div className = "nft-container" >
        <
        NFTCard name = { selectedValue }
        price = { mapping[selectedValue].price }
        currency = { mapping[selectedValue].currency }
        /> < /
        div > <
        button className = "nft-card-button"
        onClick = { onClick }
        disabled = { disableMint } >
        Mint <
        /button> < /
        div >
        <
        /div> <
        GLBViewer src = { mapping[selectedValue].src }
        / >

        <
        /div>
    );
};