
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const walletConnect = new WalletConnectConnector({
  rpc: {
    56: 'https://bsc-dataseed.binance.org/', // Binance Smart Chain RPC URL
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  chainId: 56,
});
