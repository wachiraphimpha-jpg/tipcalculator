"use client";
import { useState } from "react";

function BillInput({ bill, setBill }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-red-600 font-bold text-lg">1.ใส่จำนวนเงิน</p>
      <div className="flex items-center gap-4">
        <span className="text-5xl font-bold text-black">bill</span>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          className="bg-yellow-400 text-center text-3xl font-bold p-2 w-full outline-none text-black"
        />
      </div>
    </div>
  );
}

function TipSelector({ tipRate, onSelectTip }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-5xl font-bold text-black">Tip</span>
        <button
          onClick={onSelectTip}
          className={`text-xl p-4 w-full h-16 transition-colors font-bold ${
            tipRate === 0.05
              ? "bg-sky-400 text-black"
              : "bg-sky-200 hover:bg-sky-300 text-black"
          }`}
        >
          5%
        </button>
      </div>
      <p className="text-red-600 font-bold text-lg text-center pl-16">
        2.กำหนด Tip 5%
      </p>
    </div>
  );
}

function ResultDisplay({ label, value, height, textSize, marginClass = "" }) {
  return (
    <div className={`flex items-center gap-4 justify-end ${marginClass}`}>
      <span className="text-3xl font-bold text-black">{label}</span>
      <div
        className={`bg-pink-200 text-center ${textSize} p-2 w-40 flex items-center justify-center ${height} text-black font-bold`}
      >
        {value.toFixed(2).replace(/\.00$/, "")}
      </div>
    </div>
  );
}

function CalculateButton({ onCalculate }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onCalculate}
        className="bg-teal-200 hover:bg-teal-300 text-black text-2xl font-bold py-6 px-4 w-full"
      >
        Calculate
      </button>
    </div>
  );
}

export default function Home() {
  const [bill, setBill] = useState(100);
  const [tipRate, setTipRate] = useState(0);
  const [tipTotal, setTipTotal] = useState(0);
  const [billTotal, setBillTotal] = useState(0);

  const handleSelectTip = () => {
    setTipRate(0.05);
  };

  const calculate = () => {
    const billAmount = Number(bill);
    const calculatedTip = billAmount * tipRate;
    const calculatedTotal = billAmount + calculatedTip;

    setTipTotal(calculatedTip);
    setBillTotal(calculatedTotal);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Tip Calculator
        </h1>

        <div className="grid grid-cols-2 gap-8 items-start mb-6">
          <BillInput bill={bill} setBill={setBill} />
          
          <ResultDisplay 
            label="Tip Total" 
            value={tipTotal} 
            height="h-16" 
            textSize="text-3xl"
            marginClass="mt-8"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 items-center mb-8">
          <TipSelector tipRate={tipRate} onSelectTip={handleSelectTip} />
          
          <ResultDisplay 
            label="Bill Total" 
            value={billTotal} 
            height="h-20" 
            textSize="text-4xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 items-center">
          <CalculateButton onCalculate={calculate} />

          <div className="text-red-600 font-bold text-2xl">
            <p>3.กดปุ่ม ให้คำนวณเงิน</p>
          </div>
        </div>
      </div>
    </div>
  );
}