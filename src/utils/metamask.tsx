import { setPubKey, setWallet } from "./db";

export async function connectMetamask() {
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    handleAccountsChanged(accounts);
  } catch (e) {
    console.log("could not connect");
  }
}

export function disconnectMetamask() {
  return 0;
}

export function handleAccountsChanged(accounts: Array<string>) {
  if (accounts.length === 0) {
    console.log("disconnected");
  }
  setWallet(accounts[0]);
  // setPubKey(accounts[0])
}

window.ethereum.on("accountsChanged", handleAccountsChanged);
