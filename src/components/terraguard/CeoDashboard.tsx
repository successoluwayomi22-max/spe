import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, ShieldCheck, Activity, 
  Sliders, CheckCircle2, Globe, Download, CreditCard 
} from 'lucide-react';
import type { CurrencyCode } from '../../types/terraguard';
import { formatCurrency } from '../../core/currency/terraguardCurrency';
import { MOCK_PAYMENTS } from '../../data/mockLandCases';

interface CeoDashboardProps {
  currency: CurrencyCode;
}

export const CeoDashboard: React.FC<CeoDashboardProps> = ({ currency }) => {
  const payments = MOCK_PAYMENTS;

  // Dynamic Pricing Controls (CEO can tweak in real-time)
  const [quickPrice, setQuickPrice] = useState<number>(29);
  const [comprehensivePrice, setComprehensivePrice] = useState<number>(69);
  const [enterprisePrice, setEnterprisePrice] = useState<number>(199);
  const [isSavedPricing, setIsSavedPricing] = useState<boolean>(false);

  // Financial Modeling State
  const diasporaGrowthMultiplier = 1.25;

  const baseRevenueUSD = 184500;
  const simulatedARR = Math.round(baseRevenueUSD * diasporaGrowthMultiplier * (comprehensivePrice / 69));
  const grossProfitMargin = 97.8;
  const auditsSold = 2640;
  const fraudPreventedUSD = 42800000;

  const handleSavePricing = () => {
    setIsSavedPricing(true);
    setTimeout(() => setIsSavedPricing(false), 2000);
  };

  const handleExportCSV = () => {
    const headers = 'TransactionID,AuditID,ClientName,Location,AmountUSD,Currency,Tier,Gateway,Status,Date\n';
    const rows = payments.map((p) => 
      `${p.id},${p.auditId},"${p.clientName}","${p.clientLocation}",${p.amountUSD},${p.currency},"${p.tier}",${p.gateway},${p.status},"${p.date}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TerraGuard_Executive_Revenue_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* CEO Executive Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#0B0F19] to-slate-900 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold uppercase tracking-wider">
              Executive Command Center
            </span>
            <span className="text-xs text-slate-400 font-mono">Global Revenue Telemetry & Fiscal Hedging</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Global Revenue & Capital Protection Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            TerraGuard generates high-margin recurring fee revenue across international diaspora property acquisitions, legal title audits, and statutory surveyor certifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-slate-700 transition-all flex items-center gap-2 hover:scale-105"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Fiscal Ledger CSV</span>
          </button>

          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SETTLEMENTS ONLINE: 99.99%
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md hover:border-slate-700 transition-all hover:translate-y-[-2px]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-mono font-semibold">Annualized Run-Rate (ARR)</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1">
            {formatCurrency(simulatedARR, currency)}
          </p>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+38.4% QoQ Diaspora surge</span>
          </div>
        </div>

        {/* Gross Profit Margin */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md hover:border-slate-700 transition-all hover:translate-y-[-2px]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-mono font-semibold">Software Gross Margin</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mb-1">
            {grossProfitMargin}%
          </p>
          <p className="text-xs text-slate-400 font-mono">Zero marginal data cost per scan</p>
        </div>

        {/* Paid Audits Completed */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md hover:border-slate-700 transition-all hover:translate-y-[-2px]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-mono font-semibold">Paid Audits Executed</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1">
            {auditsSold.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 font-mono">Avg ticket size: {formatCurrency(69, currency)}</p>
        </div>

        {/* Capital Protected */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md hover:border-slate-700 transition-all hover:translate-y-[-2px]">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-mono font-semibold">Capital Protected from Scam</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 mb-1">
            {formatCurrency(fraudPreventedUSD, currency)}
          </p>
          <p className="text-xs text-slate-400 font-mono">92 Demolitions / land grabs averted</p>
        </div>
      </div>

      {/* Currency Exposure & Gateway Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Currency Exposure Ticker Bar */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Global Inflow Settlement & Currency Weight
              </h3>
              <p className="text-xs text-slate-400">
                Revenue streams auto-hedged into USD reserve treasury.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Stripe & Paystack Multi-Rail</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>US Dollar (USD) — North American Diaspora</span>
                <span className="text-emerald-400 font-bold">54.2%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '54.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>British Pound (GBP) — UK Diaspora & NHS Doctors</span>
                <span className="text-blue-400 font-bold">26.8%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '26.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Euro (EUR) & Canadian Dollar (CAD) — EU/CA Syndicates</span>
                <span className="text-purple-400 font-bold">12.5%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '12.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Nigerian Naira (NGN) & UAE Dirham (AED)</span>
                <span className="text-amber-400 font-bold">6.5%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '6.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Elasticity Simulator */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              Dynamic Price Elasticity Engine
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Adjust audit pricing in real-time across international checkout gateways.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Quick Scan: {formatCurrency(quickPrice, currency)}</span>
                <span className="text-slate-500">$29 Base</span>
              </div>
              <input
                type="range"
                min="19"
                max="49"
                value={quickPrice}
                onChange={(e) => setQuickPrice(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Investor Pack: {formatCurrency(comprehensivePrice, currency)}</span>
                <span className="text-emerald-400 font-bold">$69 Base</span>
              </div>
              <input
                type="range"
                min="49"
                max="129"
                value={comprehensivePrice}
                onChange={(e) => setComprehensivePrice(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Enterprise: {formatCurrency(enterprisePrice, currency)}</span>
                <span className="text-slate-500">$199 Base</span>
              </div>
              <input
                type="range"
                min="149"
                max="399"
                value={enterprisePrice}
                onChange={(e) => setEnterprisePrice(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleSavePricing}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isSavedPricing ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Price Schedules Pushed to Gateways</span>
              </>
            ) : (
              <span>Deploy Global Pricing Changes</span>
            )}
          </button>
        </div>
      </div>

      {/* Live Financial Reconciliation Ledger */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Live Gateway Settlement Feed (Stripe & Paystack)
            </h3>
            <p className="text-xs text-slate-400">
              Tamper-evident log of real-time audit fee disbursements.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Auto-settling to Corporate Treasury Bank Account</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Client & Location</th>
                <th className="p-3">Audit Case</th>
                <th className="p-3">Gateway & Tier</th>
                <th className="p-3 text-right">Settlement</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">{p.id}</td>
                  <td className="p-3">
                    <strong className="text-slate-200 block">{p.clientName}</strong>
                    <span className="text-[10px] text-slate-400">{p.clientLocation}</span>
                  </td>
                  <td className="p-3 text-emerald-400 font-semibold">{p.auditId}</td>
                  <td className="p-3">
                    <span className="text-white block">{p.tier}</span>
                    <span className="text-[10px] text-purple-400">{p.gateway} Rail</span>
                  </td>
                  <td className="p-3 text-right font-bold text-white">
                    {formatCurrency(p.amountUSD, currency)}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                      CLEARED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
