import {
    Box,
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { ethToEvmos } from '@hanchon/ethermint-address-converter';
import { ecrecover, fromRpcSig } from 'ethereumjs-util';
import { useEffect, useState } from 'react';
import { requestPubKey, requestWallet } from '../landing/metamask';
import {
    getPubKey,
    getWallet,
    getWalletEth,
    getWalletEvmos,
} from '../utils/db';
import { signatureToPubkey, fromHexString } from '@hanchon/signature-to-pubkey';
import { connectMetamask } from '../utils/metamask';

const WalletDetails = () => {
    const [wallet, setDisplayWallet] = useState('0x...');
    const [walletEvmos, setDisplayWalletEvmos] = useState('evmos1...');
    const [publicKey, setDisplayPublicKey] = useState('At/...');

    const updateWallets = () => {
        let eth = getWalletEth();
        if (eth !== null) {
            setDisplayWallet(eth);
        }
        let evmos = getWalletEvmos();
        if (evmos !== null) {
            setDisplayWalletEvmos(evmos);
        }

        let pubkey = getPubKey();
        if (pubkey !== null) {
            setDisplayPublicKey(pubkey);
        }
    };
    useEffect(() => {
        updateWallets();
    }, []);

    return (
        <Box w="full" h="full" bg="teal.400">
            <Center>
                <VStack>{/* Address details */}</VStack>
            </Center>
            {/*
      <Button onClick={async () => {
        alert("clicked")
        // let pubkey = await getPubKey()
        let wallet = await getWallet()
        if (wallet === null) {
          return null
        }
        let pubkey = ""
        const pubresp = await fetch("http://127.0.0.1:8000/get_pubkey/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // pubkey:addressList[0].pubkey
          body: JSON.stringify({ value: ethToEvmos(wallet) },)
        })
        let value = await pubresp.json()
        if (value.value == "") {
          // Generate pubkey

          await window.ethereum.enable("0x2328");
          let signature = await window.ethereum.request({
            method: 'eth_sign',
            params: [wallet, "0x0000000000000000000000000000000000000000000000000000000000000000"],
          })
          pubkey = signatureToPubkey(signature, Buffer.from(fromHexString("0000000000000000000000000000000000000000000000000000000000000000")))
        } else {
          pubkey = value.value
          console.log("pbkey")
          console.log(pubkey)
        }


        // console.log(signature)
        // let ret = fromRpcSig(signature)

        // console.log(ret)

        // let recovered = recoverPubKey(Buffer.from(fromHexString("0000000000000000000000000000000000000000000000000000000000000000")), ret.v, ret.r, ret.s)

        // console.log(recovered)
        // pubkey = recovered
        // console.log(pubkey)

        // end generation




        // let address: string = wallet;
        //Validate this values

        // var b64encoded = btoa(String.fromCharCode.apply(null, pubkey));

        // Create msg

        // console.log(b64encoded)
        // console.log(pubkey)






        const response = await fetch("http://127.0.0.1:8000/send_aphotons/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // pubkey:addressList[0].pubkey
          body: JSON.stringify({
            wallet: {
              address: ethToEvmos(wallet),
              algo: "ethsecp256k1",
              pubkey: pubkey
            },
            // TODO: convert to evmos
            destination: "evmos1w5hx00fwytpaxf6ptkwmchm8zg29wdjzzl9sjj",
            amount: 100,
          }),
        });
        let res = await response.json()
        console.log(res)
        var signDoc = new Uint8Array(atob(res.signBytes).split("").map(function (c) {
          return c.charCodeAt(0);
        }));

        let converted = Buffer.from(signDoc).toString('hex')



        console.log(signDoc)
        console.log(converted)
        try {

          let signature = await window.ethereum.request({
            method: 'eth_sign',
            params: [wallet, "0x" + converted],
          })
          console.log(signature)

          let signBytes = fromHexString(signature.split("0x")[1])
          // console.log(signBytes)
          // var ret = { }
          // ret.r = signBytes.slice(0, 32)
          // ret.s = signBytes.slice(32, 64)
          // let buffer = Buffer.from(signBytes.slice(64, 65));
          // ret.v = signBytes.slice(64, 65)
          // console.log(ret)
          // let recovered = ecrecover(Buffer.from(signDoc), Buffer.from(ret.v), Buffer.from(ret.r), Buffer.from(ret.s))
          // console.log(recovered)
          // console.log(btoa(String.fromCharCode.apply(null, recovered)))

          // console.log(signBytes)
          let signb64 = btoa(String.fromCharCode.apply(null, signBytes))
          console.log({
            signature: signb64,
            authBytes: res.authInfoBytes,
            bodyBytes: res.bodyBytes,
          })
          console.log(signb64)
          let body = JSON.stringify({
            signature: signb64,
            authBytes: res.authInfoBytes,
            bodyBytes: res.bodyBytes,
          })
          console.log(body)

          const response2 = await fetch("http://127.0.0.1:8000/broadcast/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // pubkey:addressList[0].pubkey
            body: body,
          });


          let resp = await response2.json()
          console.log(resp)


          // let x = await res2.json()
          // console.log(x)
          // console.log("asd")


        } catch (e) {
          console.error(e)
        }


      }} >ASD</Button> */}

            {/* <StatGroup>
  <Stat>
    <StatLabel>Sent</StatLabel>
    <StatNumber>345,670</StatNumber>
    <StatHelpText>
      <StatArrow type="increase" />
      23.36%
    </StatHelpText>
  </Stat>

  <Stat>
    <StatLabel>Clicked</StatLabel>
    <StatNumber>45</StatNumber>
    <StatHelpText>
      <StatArrow type="decrease" />
      9.05%
    </StatHelpText>
  </Stat>
</StatGroup> */}
        </Box>
    );
};

export default WalletDetails;
