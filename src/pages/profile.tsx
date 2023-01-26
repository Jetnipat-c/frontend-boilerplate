import { useEvmNativeBalance } from "@moralisweb3/next";

function HomePage() {
  const address = "0x32d11438Db681c16Cfa8FcA99B8E5c647282a39d";
  const { data: nativeBalance } = useEvmNativeBalance({ address });
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
    </div>
  );
}

export default HomePage;
