import { Heading } from "@chakra-ui/layout";
import WalletLogin from "./WalletLogin";

function Login() {
  return (
    <div style={{ padding: 20 }}>
      <Heading>Time to connect your wallet</Heading>
      <WalletLogin/>
    </div>
  );
}



export default Login;