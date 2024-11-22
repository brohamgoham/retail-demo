"use client";

import React from 'react';
import { motion } from 'framer-motion';

const NCW: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Embedded Wallets Tutorial 🪄
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
          Follow these steps to set up your embedded wallet.
        </p>
      </motion.div>

      <div className="space-y-8">
        <Step
          title="Step 1: Create a New Wallet"
          description="To start using embedded wallets, you need to create a new wallet. This will be your secure storage for assets."
        />
        <Step
          title="Step 2: Generate Device ID"
          description="Once your wallet is created, generate a unique device ID. This ID will be used to identify your device."
        />
        <Step
          title="Step 3: Assign Device to Wallet"
          description="After generating the device ID, assign it to your newly created wallet. This links your device to the wallet."
        />
        <Step
          title="Step 4: Initialize SDK"
          description="Next, initialize the SDK. This step is crucial for interacting with the wallet and performing transactions."
        />
        <Step
          title="Step 5: Generate MPC Keys"
          description="Finally, after initializing the SDK, you can generate MPC keys. These keys are essential for secure transactions."
        />
      </div>
    </div>
  );
};

const Step: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 text-green-400 p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg">{description}</p>
    </motion.div>
  );
};

export default NCW;
