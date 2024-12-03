"use client";

import React, { useState } from 'react';
import { Input } from '@/foundation/input';
import { Button } from '@/foundation/button';
import { Card } from '@/foundation/card';
import { Separator } from '@/foundation/separator';
import { Label } from '@/foundation/label';
import { motion } from 'framer-motion';
import apiService from '@/services/api.service';

const Ncw: React.FC = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [deviceId, setDeviceId] = useState('');
  const [walletId, setWalletId] = useState('');
  const [backupInfo, setBackupInfo] = useState('');
  const [keySetupStatus, setKeySetupStatus] = useState('');
  const [deviceStatus, setDeviceStatus] = useState(null);
  const [setupStatus, setSetupStatus] = useState(null)

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
    console.log(`Getting key setup status for Wallet ID: ${walletId}`);
    try {
      const status = await apiService.getDeviceSetupStatus(walletId, deviceId);
      setSetupStatus(status);
      console.log('Device Setup Status:', status);
    } catch (error) {
      console.error('Error fetching device setup status:', error);
    }
  };

  const handleGetWalletById = () => {
    console.log(`Getting wallet for Wallet ID: ${walletId}`);
  };

  const handleGetBackupInfo = () => {
    console.log(`Getting backup info for Wallet ID: ${walletId}`);
  };

  const handleGetKeySetupStatus = () => {
    console.log(`Getting key setup status for Wallet ID: ${walletId}`);
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
        <Button onClick={() => setActiveTab('devices')} className={activeTab === 'devices' ? 'bg-blue-500 text-white' : ''}>
          Devices
        </Button>
        <Button onClick={() => setActiveTab('wallets')} className={activeTab === 'wallets' ? 'bg-blue-500 text-white' : ''}>
          Wallets
        </Button>
        <Button onClick={() => setActiveTab('backup')} className={activeTab === 'backup' ? 'bg-blue-500 text-white' : ''}>
          Backup & Recovery
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'devices' && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Device Management</h2>
          <Label htmlFor="wallet-id">Wallet ID</Label>
          <Input
            id="wallet-id"
            placeholder="Input Wallet ID to get device status"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleGetDeviceStatus} className="mt-2">
            Get Device Status
          </Button>
          {deviceStatus && (
            <div className="mt-4 p-4 border border-black-300 rounded bg-black-100">
              <h3 className="text-lg font-bold">Device Status:</h3>
              <pre className="whitespace-pre-wrap">{JSON.stringify(deviceStatus, null, 2)}</pre>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'wallets' && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Wallet Management</h2>
          <Label htmlFor="wallet-id">Wallet ID</Label>
          <Input
            id="wallet-id"
            placeholder="Input Wallet ID"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleGetWalletById} className="mt-2">
            Get Wallet by Wallet ID
          </Button>

          <Separator className="my-4" />
          <Button onClick={handleGetBackupInfo} className="mt-2">
            Get Wallet Latest Backup Info
          </Button>
          <Separator className="my-4" />

          <Label htmlFor="wallet-id">Wallet ID</Label>
          <Input
            id="wallet-id"
            placeholder="Input Wallet ID"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="mb-4"
          />
            <Input
            id="device-id"
            placeholder="Input Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="mb-4"
          />
          <Button className="mt-2" onClick={handleDeviceKeySetupStatus}>
            Get Wallet Key Setup Status
          </Button>
          {setupStatus && <div>Device Setup Status: {JSON.stringify(setupStatus)}</div>}
        </Card>
      )}

      {activeTab === 'backup' && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Backup & Recovery Procedures</h2>
          <Label htmlFor="backup-wallet-id">Wallet ID for Backup Info</Label>
          <Input
            id="backup-wallet-id"
            placeholder="Input Wallet ID for Backup Info"
            value={backupInfo}
            onChange={(e) => setBackupInfo(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleGetBackupInfo} className="mt-2">
            Get Backup Info
          </Button>
          <Separator className="my-4" />
          <Label htmlFor="key-setup-status">Wallet ID for Key Setup Status</Label>
          <Input
            id="key-setup-status"
            placeholder="Input Wallet ID for Key Setup Status"
            value={keySetupStatus}
            onChange={(e) => setKeySetupStatus(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleGetKeySetupStatus} className="mt-2">
            Get Key Setup Status
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Ncw;