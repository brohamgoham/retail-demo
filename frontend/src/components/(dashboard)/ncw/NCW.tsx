//@ts-ignore
//@ts-nocheck
"use client";

import React, { useState } from 'react';
import { Input } from '@/foundation/input';
import { Button } from '@/foundation/button';
import { Card } from '@/foundation/card';
import { Separator } from '@/foundation/separator';
import { Label } from '@/foundation/label';
import { motion } from 'framer-motion';
import apiService from '@/services/api.service';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/foundation/dropdown-menu';

const Ncw: React.FC = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [deviceId, setDeviceId] = useState('');
  const [walletId, setWalletId] = useState('');
  const [accountId, setAccountId] = useState('');

  const [deviceStatus, setDeviceStatus] = useState(null);
  const [setupStatus, setSetupStatus] = useState(null)
  const [walletDevices, setWalletDevices] = useState<any[]>([]);

  const [payload, setPayload] = useState('');
  const [invokeRPC, setInvokeRPC] = useState('');
  const [enableWallet, setEnableWallet] = useState(null);
  const [enabled, setEnabled] = useState(false);

  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [latest, setLatest] = useState('');
  const [isLatestLoading, setIsLatestLoading] = useState(false);
  const [latestError, setLatestError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);

  const [deviceWalletId, setDeviceWalletId] = useState('');
  const [getWalletId, setGetWalletId] = useState('');
  const [setupWalletId, setSetupWalletId] = useState('');
  const [latestBackupWalletId, setLatestBackupWalletId] = useState('');
  const [enableWalletId, setEnableWalletId] = useState('');
  const [addressWalletId, setAddressWalletId] = useState('');
  const [rpcWalletId, setRpcWalletId] = useState('');

  const [isDeviceStatusLoading, setIsDeviceStatusLoading] = useState(false);
  const [isSetupStatusLoading, setIsSetupStatusLoading] = useState(false);
  const [isEnableWalletLoading, setIsEnableWalletLoading] = useState(false);
  const [isAddressesLoading, setIsAddressesLoading] = useState(false);
  const [isInvokeRPCLoading, setIsInvokeRPCLoading] = useState(false);

  const [addressError, setAddressError] = useState<string | null>(null);

  const handleGetAddresses = async () => {
    setIsAddressesLoading(true);
    setAddressError(null);
    try {
      if (!addressWalletId || !accountId) {
        throw new Error('Wallet ID and Account ID are required');
      }
      const addr = await apiService.getAddresses(addressWalletId, accountId);
      if (addr && addr.data) {
        setAddresses(addr.data);
      } else {
        setAddressError('No addresses found');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddressError('Failed to fetch addresses');
    } finally {
      setIsAddressesLoading(false);
    }
  }

  const handleGetDeviceStatus = async () => {
    setIsDeviceStatusLoading(true);
    try {
      const status = await apiService.getDeviceStatus(deviceWalletId);
      setDeviceStatus(status);
    } catch (error) {
      console.error('Error fetching device status:', error);
    } finally {
      setIsDeviceStatusLoading(false);
    }
  };
  
  const handleDeviceKeySetupStatus = async () => {
    setIsSetupStatusLoading(true);
    try {
      const status = await apiService.getDeviceSetupStatus(setupWalletId, deviceId);
      setSetupStatus(status);
    } catch (error) {
      console.error('Error fetching device setup status:', error);
    } finally {
      setIsSetupStatusLoading(false);
    }
  };

  const handleGetLatest = async() => {
    setIsLatestLoading(true);
    setLatestError(null);
    try {
      const latestBackup = await apiService.getLatest(latestBackupWalletId);
      setLatest(latestBackup);
      console.log("val:", latestBackup);
    } catch (error) {
      console.error('failed in handleGetLatest', error);
      setLatestError('Failed to fetch latest backup');
    } finally {
      setIsLatestLoading(false);
    }
  }

  
  const handleGetWalletDevices = async () => {
    console.log(`Getting wallet for Wallet ID: ${getWalletId}`);
    setIsWalletLoading(true);
    setWalletError(null);
  
    try {
      const wallet = await apiService.getWalletDevices(getWalletId);
      setWalletDevices(wallet);
      if (wallet.length === 0) {
        setWalletError('No wallet devices found');
      }
    } catch (error) {
      console.error('Error fetching wallet devices:', error);
      setWalletError('Failed to fetch wallet devices');
    } finally {
      setIsWalletLoading(false);
    }
  };

  const handleInvokeRPC = async () => {
    setIsInvokeRPCLoading(true);
    try {
      const res = await apiService.invokeWalletRpc(rpcWalletId, deviceId, payload);
      setInvokeRPC(res);
    } catch (error) {
      console.error('Error invoking RPC:', error);
    } finally {
      setIsInvokeRPCLoading(false);
    }
  };

  const handleEnableWallet = async () => {
    setIsEnableWalletLoading(true);
    try {
      const res = await apiService.enableWallet(enableWalletId, enabled);
      setEnableWallet(res);
    } catch (error) {
      console.error('Error enabling wallet device:', error);
    } finally {
      setIsEnableWalletLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
         Embedded Wallets Dashboard 🛠️
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
          Manage devices and wallets from this dashboard.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <Button style={{ width: '100%' }}  onClick={() => setActiveTab('devices')} className={activeTab === 'devices' ? 'bg-blue-500 text-white' : ''}>
          Devices
        </Button>
        <Button style={{ width: '100%' }} onClick={() => setActiveTab('wallets')} className={activeTab === 'wallets' ? 'bg-blue-500 text-white' : ''}>
          Wallets
        </Button>
        <Button style={{ width: '100%' }} onClick={() => setActiveTab('backup')} className={activeTab === 'backup' ? 'bg-blue-500 text-white' : ''}>
          Backup & Recovery / Invoke RPC
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'devices' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Device Management</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="wallet-id" className="font-bold">Wallet ID</Label>
              <Input
                id="wallet-id"
                placeholder="Input Wallet ID to get device status"
                value={deviceWalletId}
                onChange={(e) => setDeviceWalletId(e.target.value)}
              />
            </div>
            <Button 
              className="w-full"
              onClick={handleGetDeviceStatus}
              disabled={isDeviceStatusLoading}
            >
              {isDeviceStatusLoading ? 'Loading...' : 'Get Device Status'}
            </Button>
            {deviceStatus && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold mb-2">Device Status:</h3>
                <pre className="whitespace-pre-wrap">{JSON.stringify(deviceStatus, null, 2)}</pre>
              </div>
            )}
          </div>
          <Separator />
          <div className="space-y-4">
           {/* Device Key Setup Status Section */}
           <div className="space-y-4">
              <Label htmlFor="setup-wallet-id" className="font-bold">Device Key 🔑 Setup Status</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="setup-wallet-id"
                  placeholder="Input Wallet ID"
                  value={setupWalletId}
                  onChange={(e) => setSetupWalletId(e.target.value)}
                />
                <Input
                  id="device-id"
                  placeholder="Input Device ID"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleDeviceKeySetupStatus}
                disabled={isSetupStatusLoading}
              >
                {isSetupStatusLoading ? 'Loading...' : 'Get Setup Status'}
              </Button>
              {setupStatus && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-2"> Key 🔑 Setup Status:</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Status: </strong>
                      <span className={`${
                        setupStatus.status === 'COMPLETE' ? 'text-green-600' : 'text-red-600'
                      } font-semibold`}>
                        {setupStatus.status}
                      </span>
                    </p>
                    <p><strong>Device ID:</strong> {setupStatus.deviceId}</p>
                    <div>
                      <p className="font-semibold mb-1">Key Setup:</p>
                      <ul className="list-disc pl-5">
                        {setupStatus.keySetup.map((key, index) => (
                          <li key={index} className="mb-2 bg-gray-50 p-2 rounded-md">
                            <p><strong>Algorithm:</strong> {key.algorithmName}</p>
                            <p>
                              <strong>Status: </strong>
                              <span className={`${
                                key.status === 'COMPLETE' ? 'text-green-600' : 'text-red-600'
                              } font-semibold`}>
                                {key.status}
                              </span>
                            </p>
                            <p><strong>Confirmed:</strong> {String(key.confirmed)}</p>
                            <p><strong>Backed Up:</strong> {String(key.backedUp)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />
          </div>
        </Card>
      )}

      {activeTab === 'wallets' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Wallet Management</h2>
          
          <div className="space-y-6">
            {/* Get Wallet Section */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="get-wallet-id" className="font-bold">Get Wallet ID</Label>
                <Input
                  id="get-wallet-id"
                  placeholder="Input Wallet ID"
                  value={getWalletId}
                  onChange={(e) => setGetWalletId(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleGetWalletDevices}
                disabled={isWalletLoading}
              >
                {isWalletLoading ? 'Loading...' : 'Get Wallet'}
              </Button>
              {walletError && 
                <div className="text-red-500 mt-2">{walletError}</div>
              }
              {walletDevices && walletDevices.length > 0 && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-2">Wallet Devices:</h3>
                  <pre className="whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(walletDevices, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <Separator />
            <div className="space-y-4">
              <Label htmlFor="latest-backup" className="font-bold">Latest Backup data 🔑 + 🔐 = 🚀</Label>
              <div className="flex flex-col gap-2">
                <Input 
                  id="latest-backup"
                  placeholder="Get latest backup by walletId"
                  value={latestBackupWalletId}
                  onChange={(e) => setLatestBackupWalletId(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleGetLatest}
                disabled={isLatestLoading}
              >
                {isLatestLoading ? 'Loading...' : 'Get Latest Backup'}
              </Button>
              {latestError && 
                <div className="text-red-500 mt-2">{latestError}</div>
              }
              {latest && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-2">Latest Backup:</h3>
                  <pre className="whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(latest, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <Separator />
            {/* Enable Wallet Section */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="enable-wallet-id" className="font-bold">Wallet ID to enable</Label>
                <Input
                  id="enable-wallet-id"
                  placeholder="Input Wallet ID"
                  value={enableWalletId}
                  onChange={(e) => setEnableWalletId(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Label htmlFor="enabled" className="font-bold">Toggle Wallet Device</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon"
                      disabled={enabled === null}
                      onClick={() => setEnabled(!enabled)}
                      style={{
                        backgroundColor: enabled ? 'green' : 'red',
                        color: 'white',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        width: '100px',
                      }}
                    >
                      {enabled ? 'Enable?' : 'Disable?'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setEnabled(true)}>Enabled</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEnabled(false)}>Disabled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button 
                className="w-full"
                onClick={handleEnableWallet}
                disabled={isEnableWalletLoading}
              >
                {isEnableWalletLoading ? 'Loading...' : 'Enable Wallet Device'}
              </Button>
              {enableWallet && 
                <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  Enable Wallet Device: {JSON.stringify(enableWallet)}
                </div>
              }
            </div>

            <Separator />
            <div className="space-y-4">
              <Label htmlFor="get-addresses" className="font-bold">Get Wallet Addresses</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="wallet-id-addresses"
                  placeholder="Input Wallet ID"
                  value={addressWalletId}
                  onChange={(e) => setAddressWalletId(e.target.value)}
                />
                <Input
                  id="account-id"
                  placeholder="Input Account ID"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleGetAddresses}
                disabled={isAddressesLoading}
              >
                {isAddressesLoading ? 'Loading...' : 'Get Wallet Addresses'}
              </Button>
              {addressError && (
                <div className="text-red-500 mt-2">{addressError}</div>
              )}
              {addresses && addresses.length > 0 && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-2">Wallet Assets:</h3>
                  <div className="space-y-4">
                    {addresses.map((asset, index) => (
                      <div key={index} className="p-4 bg-white rounded-md shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <p><strong>Name:</strong> {asset.name}</p>
                          <p><strong>Symbol:</strong> {asset.symbol}</p>
                          <p><strong>Network:</strong> {asset.networkProtocol}</p>
                          <p><strong>Blockchain:</strong> {asset.blockchain}</p>
                          <p><strong>Type:</strong> {asset.type}</p>
                          <p><strong>Coin Type ID:</strong> {asset.coinType}</p>
                          <p><strong>algorithm:</strong> {asset.algorithm}</p>
                          <p><strong>Testnet:</strong> <span className={asset.testnet ? 'text-yellow-600' : 'text-green-600'}>
                            {String(asset.testnet)}
                          </span></p>
                          {asset.ethNetwork && (
                            <p><strong>Network ID:</strong> {asset.ethNetwork}</p>
                          )}
                          <p><strong>Decimals:</strong> {asset.decimals}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'backup' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Backup & Recovery Procedures(🚀 Invoke RPC)</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="device-id" className="font-bold">Device ID</Label>
              <Input
                id="device-id"
                placeholder="Input Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="wallet-id" className="font-bold">Wallet ID</Label>
              <Input
                id="wallet-id"
                placeholder="Input Wallet ID"
                value={rpcWalletId}
                onChange={(e) => setRpcWalletId(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="payload" className="font-bold">Payload</Label>
              <Input
                id="payload"
                placeholder="Input Payload"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleInvokeRPC}
              disabled={isInvokeRPCLoading}
            >
              {isInvokeRPCLoading ? 'Loading...' : 'INVOKE RPC!'}
            </Button>
            {invokeRPC && 
              <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                Invoke RPC: {JSON.stringify(invokeRPC)}
              </div>
            }
          </div>
        </Card>
      )}
    </div>
  );
};

export default Ncw;
