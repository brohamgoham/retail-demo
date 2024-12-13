"use client";

import React, { useState } from 'react';
import { Input } from '@/foundation/input';
import { Button } from '@/foundation/button';
import { Card } from '@/foundation/card';
import { Separator } from '@/foundation/separator';
import { Label } from '@/foundation/label';
import { motion } from 'framer-motion';
import { Checkbox } from '@/foundation/checkbox';
import apiService from '@/services/api.service';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/foundation/dropdown-menu';

const Ncw: React.FC = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [deviceId, setDeviceId] = useState('');
  const [walletId, setWalletId] = useState('');

  const [deviceStatus, setDeviceStatus] = useState(null);
  const [setupStatus, setSetupStatus] = useState(null)
  const [walletDevices, setWalletDevices] = useState<any[]>([]);

  const [payload, setPayload] = useState('');
  const [invokeRPC, setInvokeRPC] = useState('');
  const [enableWallet, setEnableWallet] = useState(null);
  const [enabled, setEnabled] = useState(false);

  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  const handleGetDeviceStatus = async () => {
    console.log(`Getting status for Wallet ID: ${walletId}`);
    try {
      const status = await apiService.getDeviceStatus(walletId);
      setDeviceStatus(status);
      console.log('Device Status:', status);
    } catch (error) {
      console.error('Error fetching device status:', error);
    }
  };
  
  const handleDeviceKeySetupStatus = async () => {
    console.log(`Getting Device setup status for Wallet ID: ${walletId} & Device ID: ${deviceId}`);
    try {
      const status = await apiService.getDeviceSetupStatus(walletId, deviceId);
      setSetupStatus(status);
      console.log('Device Setup Status:', status);
    } catch (error) {
      console.error('Error fetching device setup status:', error);
    }
  };

  const handleGetWalletDevices = async () => {
    console.log(`Getting wallet for Wallet ID: ${walletId}`);
    setIsWalletLoading(true);
    setWalletError(null);
      // returns an array of objects like:
  //  [
  // { deviceId: '4fc29ab3-d834-449b-b910-0afa6d705121', enabled: true },
  // { deviceId: '58a1e24d-4d45-4801-b303-6c8e38bd23c4', enabled: true }
  // ]
  
    try {
      const wallet = await apiService.getWalletDevices(walletId);
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
    console.log(`Invoking RPC for Wallet ID: ${walletId}, with device ID: ${deviceId}, and payload: ${payload}`);
    try {
      const res = await apiService.invokeWalletRpc(walletId, deviceId, payload);
      setInvokeRPC(res);
      console.log('Invoke RPC:', res);
    } catch (error) {
      console.error('Error invoking RPC:', error);
    }
  };

  const handleEnableWallet = async () => {
    console.log(`Enabling wallet for Wallet ID: ${walletId}`);
    try {
      const res = await apiService.enableWallet(walletId, enabled);
      setEnableWallet(res);
      console.log('Enable Wallet:', res);
    } catch (error) {
      console.error('Error enabling wallet device:', error);
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
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
              />
            </div>
            <Button style={{ width: '100%' }} onClick={handleGetDeviceStatus}>Get Device Status</Button>
            {deviceStatus && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold mb-2">Device Status:</h3>
                <pre className="whitespace-pre-wrap">{JSON.stringify(deviceStatus, null, 2)}</pre>
              </div>
            )}
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
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
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

            {/* Wallet Setup Status Section */}
            <div className="space-y-4">
              <Label htmlFor="setup-wallet-id" className="font-bold">Wallet Setup Status</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="setup-wallet-id"
                  placeholder="Input Wallet ID"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                />
                <Input
                  id="device-id"
                  placeholder="Input Device ID"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                />
              </div>
              <Button style={{ width: '100%' }} onClick={handleDeviceKeySetupStatus}>Get Wallet Key Setup Status</Button>
              {setupStatus && 
                <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  Device Setup Status: {JSON.stringify(setupStatus)}
                </div>
              }
            </div>

            <Separator />

            {/* Enable Wallet Section */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="enable-wallet-id" className="font-bold">Wallet ID to enable</Label>
                <Input
                  id="enable-wallet-id"
                  placeholder="Input Wallet ID"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
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
                      {enabled ? 'Enabled' : 'Disabled'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setEnabled(true)}>Enabled</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEnabled(false)}>Disabled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button style={{ width: '100%' }} onClick={handleEnableWallet}>Enable Wallet Device</Button>
              {enableWallet && 
                <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  Enable Wallet Device: {JSON.stringify(enableWallet)}
                </div>
              }
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
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
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

            <Button style={{ width: '100%' }} onClick={handleInvokeRPC}>INVOKE RPC!</Button>
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
