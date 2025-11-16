import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jsPDF from 'jspdf';

import {
  Banner,
  EntityType,
  CityWiseHRAList,
  PersonalDetails,
  IncomeDetails,
  CapitalGains,
  HRADetails,
  Results,
  TaxPlanningTips,
  Deductions,
  BusinessDeductions
} from './../../../components/calculation/tax';
import CalculatorFAQ from "@/components/CalculatorFAQ";
import { taxFAQs } from "@/components/AdditionalFAQs";

interface TaxResult {
  oldRegime: {
    grossIncome: number;
    taxableIncome: number;
    totalDeductions: number;
    incomeTax: number;
    cess: number;
    capitalGainsTax: number;
    totalTax: number;
    netIncome: number;
    effectiveRate: string;
    breakdown: Array<{
      slab: string;
      rate: string;
      taxableAmount: number;
      tax: number;
    }>;
  };
  newRegime: {
    grossIncome: number;
    taxableIncome: number;
    totalDeductions: number;
    incomeTax: number;
    cess: number;
    capitalGainsTax: number;
    totalTax: number;
    netIncome: number;
    effectiveRate: string;
    breakdown: Array<{
      slab: string;
      rate: string;
      taxableAmount: number;
      tax: number;
    }>;
  };
  capitalGainsBreakdown: {
    stcgEquity: number;
    stcgEquityTax: number;
    ltcgEquity: number;
    ltcgEquityTax: number;
    stcgOther: number;
    ltcgOther: number;
    ltcgOtherTax: number;
    totalCapitalGainsTax: number;
  };
  savings: number;
  recommendedRegime: string;
}

export default function TaxCalculator() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Entity Type and Personal Details
  const [entityType, setEntityType] = useState('individual');
  const [assessmentYear, setAssessmentYear] = useState('2025-26');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [residentialStatus, setResidentialStatus] = useState('resident');

  // Income Details
  const [basicSalary, setBasicSalary] = useState('');
  const [hra, setHra] = useState('');
  const [specialAllowance, setSpecialAllowance] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');
  const [bonus, setBonus] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [housePropertyIncome, setHousePropertyIncome] = useState('');

  // Capital Gains from Stock Market
  const [stcgEquity, setStcgEquity] = useState(''); // Short Term Capital Gains on Equity (>15%)
  const [ltcgEquity, setLtcgEquity] = useState(''); // Long Term Capital Gains on Equity (>10%)
  const [stcgOther, setStcgOther] = useState(''); // Short Term Capital Gains on Other investments
  const [ltcgOther, setLtcgOther] = useState(''); // Long Term Capital Gains on Other investments

  // HRA Details
  const [cityType, setCityType] = useState('metro');
  const [rentPaid, setRentPaid] = useState('');

  // Deductions (Old Regime)
  const [section80C, setSection80C] = useState('');
  const [section80DSelf, setSection80DSelf] = useState('');
  const [section80DParents, setSection80DParents] = useState('');
  const [section80CCD1B, setSection80CCD1B] = useState('');
  const [section80E, setSection80E] = useState('');
  const [section80G50, setSection80G50] = useState('');
  const [section80G100, setSection80G100] = useState('');
  const [section24B, setSection24B] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');

  // Professional Tax
  const [professionalTax, setProfessionalTax] = useState('');

  const [result, setResult] = useState<TaxResult | null>(null);
  const [activeTab, setActiveTab] = useState('comparison');
  const [showCityListModal, setShowCityListModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Tax configuration for different assessment years
  const getTaxConfig = (assessmentYear: string) => {
    const configs = {
      '2025-26': {
        standardDeduction: 75000,
        rebateLimit: 700000,
        rebateAmount: 25000,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 300000,
          slabs: [
            { min: 300000, max: 700000, rate: 0.05 },
            { min: 700000, max: 1000000, rate: 0.10 },
            { min: 1000000, max: 1200000, rate: 0.15 },
            { min: 1200000, max: 1500000, rate: 0.20 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      },
      '2024-25': {
        standardDeduction: 50000,
        rebateLimit: 700000,
        rebateAmount: 25000,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 300000,
          slabs: [
            { min: 300000, max: 600000, rate: 0.05 },
            { min: 600000, max: 900000, rate: 0.10 },
            { min: 900000, max: 1200000, rate: 0.15 },
            { min: 1200000, max: 1500000, rate: 0.20 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      },
      '2023-24': {
        standardDeduction: 50000,
        rebateLimit: 500000,
        rebateAmount: 12500,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 250000,
          slabs: [
            { min: 250000, max: 500000, rate: 0.05 },
            { min: 500000, max: 750000, rate: 0.10 },
            { min: 750000, max: 1000000, rate: 0.15 },
            { min: 1000000, max: 1250000, rate: 0.20 },
            { min: 1250000, max: 1500000, rate: 0.25 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      },
      '2022-23': {
        standardDeduction: 50000,
        rebateLimit: 500000,
        rebateAmount: 12500,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 250000,
          slabs: [
            { min: 250000, max: 500000, rate: 0.05 },
            { min: 500000, max: 750000, rate: 0.10 },
            { min: 750000, max: 1000000, rate: 0.15 },
            { min: 1000000, max: 1250000, rate: 0.20 },
            { min: 1250000, max: 1500000, rate: 0.25 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      }
    };

    return configs[assessmentYear as keyof typeof configs] || configs['2025-26'];
  };

  const calculateHRAExemption = () => {
    if (!basicSalary || !hra || !rentPaid) return 0;

    const basic = parseFloat(basicSalary);
    const hraReceived = parseFloat(hra);
    const rent = parseFloat(rentPaid);

    // HRA exemption calculation
    const hraPercent = cityType === 'metro' ? 0.5 : 0.4;
    const exemption1 = hraReceived;
    const exemption2 = basic * hraPercent;
    const exemption3 = Math.max(0, rent - (basic * 0.1));

    return Math.min(exemption1, exemption2, exemption3);
  };

  const calculateOldRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    const breakdown = [];
    const userAge = parseInt(age) || 0;

    // Different tax calculation based on entity type
    if (entityType === 'firm') {
      // Partnership Firm: Flat 30% tax
      if (taxableIncome > 0) {
        tax = taxableIncome * 0.30;
        breakdown.push({
          slab: `Rs.0 - Rs.${taxableIncome.toLocaleString()}`,
          rate: '30%',
          taxableAmount: taxableIncome,
          tax: tax
        });
      }
      return { tax, breakdown };
    }

    if (entityType === 'company') {
      // Company: 25% or 30% based on turnover
      const turnover = parseFloat(basicSalary) || 0;
      const rate = turnover <= 40000000000 ? 0.25 : 0.30; // 400 crore threshold

      if (taxableIncome > 0) {
        tax = taxableIncome * rate;
        breakdown.push({
          slab: `Rs.0 - Rs.${taxableIncome.toLocaleString()}`,
          rate: `${rate * 100}%`,
          taxableAmount: taxableIncome,
          tax: tax
        });
      }
      return { tax, breakdown };
    }
    const config = getTaxConfig(assessmentYear);

    // Tax slabs based on age and residential status
    let basicExemption = config.oldRegime.exemptionBelow60;

    // NRIs don't get basic exemption
    if (residentialStatus === 'nri') {
      basicExemption = 0;
    } else {
      // Residents get age-based exemptions
      if (userAge >= 60 && userAge < 80) {
        basicExemption = config.oldRegime.exemptionBelow80;
      } else if (userAge >= 80) {
        basicExemption = config.oldRegime.exemptionAbove80;
      }
    }

    let previousMax = basicExemption;

    for (const slab of config.oldRegime.slabs) {
      if (taxableIncome > previousMax) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - previousMax;
        const slabTax = taxableAmount * slab.rate;
        tax += slabTax;

        if (taxableAmount > 0) {
          const slabLabel = slab.max === Infinity
              ? `Above Rs.${(previousMax/100000).toFixed(0)}L`
              : `Rs.${(previousMax/100000).toFixed(0)}L - Rs.${(slab.max/100000).toFixed(0)}L`;

          breakdown.push({
            slab: slabLabel,
            rate: `${(slab.rate * 100).toFixed(0)}%`,
            taxableAmount: taxableAmount,
            tax: slabTax
          });
        }

        previousMax = slab.max;
        if (taxableIncome <= slab.max) break;
      }
    }

    return { tax, breakdown };
  };

  const calculateNewRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    const breakdown = [];
    const config = getTaxConfig(assessmentYear);

    // NRIs don't get basic exemption in new regime either
    const basicExemption = residentialStatus === 'nri' ? 0 : config.newRegime.exemption;

    for (const slab of config.newRegime.slabs) {
      const adjustedMin = Math.max(slab.min, basicExemption);
      if (taxableIncome > adjustedMin) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - adjustedMin;
        const slabTax = taxableAmount * slab.rate;
        tax += slabTax;

        if (taxableAmount > 0) {
          const slabLabel = slab.max === Infinity
              ? `Above Rs.${(adjustedMin/100000).toFixed(0)}L`
              : `Rs.${(adjustedMin/100000).toFixed(0)}L - Rs.${(slab.max/100000).toFixed(0)}L`;

          breakdown.push({
            slab: slabLabel,
            rate: `${(slab.rate * 100).toFixed(0)}%`,
            taxableAmount: taxableAmount,
            tax: slabTax
          });
        }

        if (taxableIncome <= slab.max) break;
      }
    }

    return { tax, breakdown };
  };

  const calculateTax = () => {
    if (!basicSalary) return;

    const config = getTaxConfig(assessmentYear);
    const basic = parseFloat(basicSalary) || 0;
    const hraAmount = parseFloat(hra) || 0;
    const special = parseFloat(specialAllowance) || 0;
    const other = parseFloat(otherAllowances) || 0;
    const bonusAmount = parseFloat(bonus) || 0;
    const otherIncomeAmount = parseFloat(otherIncome) || 0;
    const housePropertyIncomeAmount = parseFloat(housePropertyIncome) || 0;
    const profTax = parseFloat(professionalTax) || 0;

    // Capital Gains calculations
    const stcgEquityAmount = parseFloat(stcgEquity) || 0;
    const ltcgEquityAmount = parseFloat(ltcgEquity) || 0;
    const stcgOtherAmount = parseFloat(stcgOther) || 0;
    const ltcgOtherAmount = parseFloat(ltcgOther) || 0;

    // Calculate income based on entity type
    let regularIncome;
    if (entityType === 'firm' || entityType === 'company') {
      // For firms/companies: basic = total income, hra = expenses
      regularIncome = Math.max(0, basic - hraAmount) + otherIncomeAmount + housePropertyIncomeAmount + stcgOtherAmount;
    } else {
      // For individuals/HUF: normal salary calculation
      regularIncome = basic + hraAmount + special + other + bonusAmount + otherIncomeAmount + housePropertyIncomeAmount + stcgOtherAmount;
    }

    // Calculate capital gains taxes separately
    const stcgEquityTax = stcgEquityAmount * 0.156; // 15% + 4% cess
    const ltcgEquityTax = Math.max(0, ltcgEquityAmount - 100000) * 0.104; // 10% + 4% cess on amount above 1L
    const ltcgOtherTax = ltcgOtherAmount * 0.208; // 20% + 4% cess with indexation

    const totalCapitalGainsTax = stcgEquityTax + ltcgEquityTax + ltcgOtherTax;

    const grossIncome = regularIncome;

    // HRA Exemption (only for individuals/HUF)
    const hraExemption = (entityType === 'individual' || entityType === 'huf') ? calculateHRAExemption() : 0;

    // Health Insurance calculation with separate limits
    const userAge = parseInt(age) || 0;
    const section80DSelfAmount = Math.min(parseFloat(section80DSelf) || 0, userAge >= 60 ? 50000 : 25000);
    const section80DParentsAmount = Math.min(parseFloat(section80DParents) || 0, 50000); // Max 50k for parents
    const totalSection80D = section80DSelfAmount + section80DParentsAmount;

    // 80G Donations calculation with different deduction rates
    const section80G50Amount = (parseFloat(section80G50) || 0) * 0.5; // 50% of donation amount
    const section80G100Amount = parseFloat(section80G100) || 0; // 100% of donation amount
    const totalSection80G = section80G50Amount + section80G100Amount;

    // Calculate deductions based on entity type
    let oldRegimeDeductions = 0;

    if (entityType === 'firm' || entityType === 'company') {
      // Firms/Companies: Only business deductions
      oldRegimeDeductions =
          (parseFloat(section80C) || 0) + // Partner remuneration/Depreciation
          (parseFloat(section80DSelf) || 0) + // Interest on capital/CSR
          profTax;
    } else {
      // Individual/HUF: Personal deductions
      if (residentialStatus === 'nri') {
        // NRIs typically only get standard deduction and professional tax
        oldRegimeDeductions = profTax;
      } else {
        // Residents get all deductions
        oldRegimeDeductions =
            (parseFloat(section80C) || 0) +
            totalSection80D +
            (parseFloat(section80CCD1B) || 0) +
            (parseFloat(section80E) || 0) +
            totalSection80G +
            (parseFloat(section24B) || 0) +
            (parseFloat(otherDeductions) || 0) +
            hraExemption +
            profTax;
      }
    }

    const oldTaxableIncome = Math.max(0, grossIncome - oldRegimeDeductions);
    const oldTaxResult = calculateOldRegimeTax(oldTaxableIncome);
    const oldCess = oldTaxResult.tax * 0.04;
    const oldTotalTax = oldTaxResult.tax + oldCess;

    // Apply rebate under section 87A for old regime (only for individuals/HUF)
    let oldTotalTaxAfterRebate = oldTotalTax;
    if ((entityType === 'individual' || entityType === 'huf') && oldTaxableIncome <= 500000) { // Old regime rebate limit is Rs.5L
      const oldRebate = Math.min(oldTaxResult.tax, 12500); // Old regime rebate is Rs.12,500
      oldTotalTaxAfterRebate = Math.max(0, oldTotalTax - oldRebate);
    }
    // Add capital gains tax to old regime
    oldTotalTaxAfterRebate += totalCapitalGainsTax;

    // New Regime Calculations (only for individuals/HUF)
    let newRegimeDeductions = 0;
    let newTaxableIncome = 0;
    let newTaxResult: { tax: number; breakdown: any[] } = { tax: 0, breakdown: [] };
    let newCess = 0;
    let newTotalTax = 0;

    if (entityType === 'individual' || entityType === 'huf') {
      newRegimeDeductions = config.standardDeduction + profTax;
      newTaxableIncome = Math.max(0, grossIncome - newRegimeDeductions);
      newTaxResult = calculateNewRegimeTax(newTaxableIncome);
      newCess = newTaxResult.tax * 0.04;
      newTotalTax = newTaxResult.tax + newCess;
    } else {
      // For firms/companies, new regime is same as old regime (no new regime benefits)
      newRegimeDeductions = oldRegimeDeductions;
      newTaxableIncome = oldTaxableIncome;
      newTaxResult = oldTaxResult;
      newCess = oldCess;
      newTotalTax = oldTotalTax;
    }

    // Apply rebate under section 87A for new regime (only for individuals/HUF)
    let newTotalTaxAfterRebate = newTotalTax;
    if ((entityType === 'individual' || entityType === 'huf') && newTaxableIncome <= config.rebateLimit) {
      const newRebate = Math.min(newTaxResult.tax, config.rebateAmount);
      newTotalTaxAfterRebate = Math.max(0, newTotalTax - newRebate);
    }
    // Add capital gains tax to new regime
    newTotalTaxAfterRebate += totalCapitalGainsTax;

    const savings = oldTotalTaxAfterRebate - newTotalTaxAfterRebate;
    const recommendedRegime = (entityType === 'firm' || entityType === 'company')
        ? 'Business Tax Rate'
        : (savings > 0 ? 'New Tax Regime' : 'Old Tax Regime');

    const totalGrossIncome = grossIncome + stcgEquityAmount + ltcgEquityAmount + ltcgOtherAmount;

    setResult({
      oldRegime: {
        grossIncome: totalGrossIncome,
        taxableIncome: oldTaxableIncome,
        totalDeductions: oldRegimeDeductions,
        incomeTax: oldTaxResult.tax,
        cess: oldCess,
        capitalGainsTax: totalCapitalGainsTax,
        totalTax: oldTotalTaxAfterRebate,
        netIncome: totalGrossIncome - oldTotalTaxAfterRebate,
        effectiveRate: ((oldTotalTaxAfterRebate / totalGrossIncome) * 100).toFixed(2),
        breakdown: oldTaxResult.breakdown
      },
      newRegime: {
        grossIncome: totalGrossIncome,
        taxableIncome: newTaxableIncome,
        totalDeductions: newRegimeDeductions,
        incomeTax: newTaxResult.tax,
        cess: newCess,
        capitalGainsTax: totalCapitalGainsTax,
        totalTax: newTotalTaxAfterRebate,
        netIncome: totalGrossIncome - newTotalTaxAfterRebate,
        effectiveRate: ((newTotalTaxAfterRebate / totalGrossIncome) * 100).toFixed(2),
        breakdown: newTaxResult.breakdown
      },
      capitalGainsBreakdown: {
        stcgEquity: stcgEquityAmount,
        stcgEquityTax: stcgEquityTax,
        ltcgEquity: ltcgEquityAmount,
        ltcgEquityTax: ltcgEquityTax,
        stcgOther: stcgOtherAmount,
        ltcgOther: ltcgOtherAmount,
        ltcgOtherTax: ltcgOtherTax,
        totalCapitalGainsTax: totalCapitalGainsTax
      },
      savings: Math.abs(savings),
      recommendedRegime
    });
  };

  // PDF Generation Functions - Modern Professional Design
  const generatePDF = async (type: 'old' | 'new' | 'capital') => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Color scheme
    const primaryColor = [255, 107, 44]; // Orange
    const secondaryColor = [52, 73, 94]; // Dark blue-gray
    const accentColor = [230, 230, 230]; // Light gray

    // Helper function to add new page
    const addNewPage = () => {
      doc.addPage();
      yPosition = 20;
      addWatermark(); // Add watermark to new page
    };

    // Helper function to add watermark
    const addWatermark = () => {
      doc.setFontSize(40);
      doc.setTextColor(250, 250, 250);
      doc.text('IncomeGrow Financial', pageWidth / 2, pageHeight / 2, {
        align: 'center'
      });
    };

    // Helper function to check if we need new page
    const checkPageBreak = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > pageHeight - 30) {
        addNewPage();
      }
    };

    // Helper function to draw modern card-style section
    const drawCard = (title: string, content: Array<{label: string, value: string}>, cardColor = accentColor) => {
      checkPageBreak(content.length * 7 + 20);

      // Card background
      doc.setFillColor(cardColor[0], cardColor[1], cardColor[2]);
      doc.rect(15, yPosition, pageWidth - 30, content.length * 7 + 15, 'F');

      // Card border
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.rect(15, yPosition, pageWidth - 30, content.length * 7 + 15);

      // Title bar
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, yPosition, pageWidth - 30, 8, 'F');

      // Title text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(title, 20, yPosition + 5, { charSpace: 0 });

      yPosition += 12;

      // Content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);

      content.forEach((item) => {
        doc.setFont("helvetica", "bold");
        doc.text(item.label + ":", 20, yPosition);
        doc.setFont("helvetica", "normal");
        doc.text(item.value, 90, yPosition);
        yPosition += 6;
      });

      yPosition += 8;
    };

    // Helper function to draw modern table
    const drawModernTable = (title: string, headers: string[], data: string[][]) => {
      const colWidth = (pageWidth - 30) / headers.length;
      const rowHeight = 8;

      checkPageBreak(data.length * rowHeight + 25);

      // Table title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text(title, 15, yPosition, { charSpace: 0 });
      yPosition += 12;

      // Header row
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, yPosition, pageWidth - 30, rowHeight, 'F');

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);

      headers.forEach((header, index) => {
        const x = 15 + (index * colWidth);
        doc.text(header, x + 3, yPosition + 5, { charSpace: 0 });
      });

      yPosition += rowHeight;

      // Data rows
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);

      data.forEach((row, rowIndex) => {
        // Alternating row colors
        if (rowIndex % 2 === 0) {
          doc.setFillColor(248, 249, 250);
          doc.rect(15, yPosition, pageWidth - 30, rowHeight, 'F');
        }

        // Row borders
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.1);
        doc.rect(15, yPosition, pageWidth - 30, rowHeight);

        row.forEach((cell, colIndex) => {
          const x = 15 + (colIndex * colWidth);
          if (colIndex === 0) {
            doc.text(cell, x + 3, yPosition + 5);
          } else {
            doc.text(cell, x + colWidth - 3, yPosition + 5, { align: 'right' });
          }
        });

        yPosition += rowHeight;
      });

      yPosition += 10;
    };

    // Generate Modern Header
    const generateModernHeader = () => {
      // Add watermark
      addWatermark();

      // Header background gradient effect
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, pageWidth, 50, 'F');

      // Company logo area (placeholder)
      doc.setFillColor(255, 255, 255);
      doc.circle(25, 25, 8, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('U', 25, 28, { align: 'center' });

      // Main title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      const titleText = type === 'capital' ? 'Capital Gains Tax Report' :
          type === 'old' ? `${entityType === 'individual' ? 'Personal' : entityType.toUpperCase()} Tax Report - Old Regime` :
              `${entityType === 'individual' ? 'Personal' : entityType.toUpperCase()} Tax Report - New Regime`;
      doc.text(titleText, 40, 20, { charSpace: 0 });

      // Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Assessment Year ${assessmentYear} • Generated on ${new Date().toLocaleDateString()}`, 40, 30);

      // Company name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text('IncomeGrow Financial', pageWidth - 15, 20, { align: 'right', charSpace: 0 });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text('Professional Tax Consultation', pageWidth - 15, 28, { align: 'right' });
      doc.text('www.incomegrow.in', pageWidth - 15, 35, { align: 'right' });

      yPosition = 60;

      // Entity information card
      const entityInfo = [
        { label: "Entity Type", value: entityType === 'individual' ? 'Individual Taxpayer' :
              entityType === 'huf' ? 'Hindu Undivided Family' :
                  entityType === 'firm' ? 'Partnership Firm' : 'Private Company' },
        { label: "Assessment Year", value: assessmentYear },
        { label: "Financial Year", value: assessmentYear === '2025-26' ? '2024-25' : '2023-24' },
        { label: "Report Type", value: type === 'capital' ? 'Capital Gains Analysis' :
              type === 'old' ? 'Old Tax Regime Computation' : 'New Tax Regime Computation' }
      ];

      if (age && entityType === 'individual') {
        entityInfo.push({ label: "Age Category", value: `${age} years` });
      }

      drawCard("TAXPAYER INFORMATION", entityInfo, [240, 248, 255]);
    };

    if (type === 'capital') {
      generateModernHeader();

      // Capital Gains Summary Card
      const capitalSummary = [
        { label: "Total Capital Gains", value: `Rs. ${(result.capitalGainsBreakdown.stcgEquity + result.capitalGainsBreakdown.ltcgEquity + result.capitalGainsBreakdown.ltcgOther).toLocaleString()}` },
        { label: "Total Tax Liability", value: `Rs. ${result.capitalGainsBreakdown.totalCapitalGainsTax.toLocaleString()}` },
        { label: "Effective Tax Rate", value: `${(result.capitalGainsBreakdown.totalCapitalGainsTax / (result.capitalGainsBreakdown.stcgEquity + result.capitalGainsBreakdown.ltcgEquity + result.capitalGainsBreakdown.ltcgOther) * 100 || 0).toFixed(2)}%` }
      ];

      drawCard("CAPITAL GAINS SUMMARY", capitalSummary, [232, 245, 233]);

      // Capital Gains Breakdown Table
      const capitalHeaders = ['Asset Type', 'Amount (Rs.)', 'Tax Rate', 'Tax Amount (Rs.)'];
      const capitalData = [
        ['Equity Shares (Short Term)', result.capitalGainsBreakdown.stcgEquity.toLocaleString(), '15%', result.capitalGainsBreakdown.stcgEquityTax.toLocaleString()],
        ['Equity Shares (Long Term)', result.capitalGainsBreakdown.ltcgEquity.toLocaleString(), '10% (>Rs.1L)', result.capitalGainsBreakdown.ltcgEquityTax.toLocaleString()],
        ['Other Assets (Short Term)', result.capitalGainsBreakdown.stcgOther.toLocaleString(), 'As per Slab', '0'],
        ['Other Assets (Long Term)', result.capitalGainsBreakdown.ltcgOther.toLocaleString(), '20% + Indexation', result.capitalGainsBreakdown.ltcgOtherTax.toLocaleString()]
      ];

      drawModernTable('CAPITAL GAINS BREAKDOWN', capitalHeaders, capitalData);

      // Investment Tips Card
      const investmentTips = [
        { label: "Tax Saving Tip 1", value: "Hold equity investments for >12 months to get LTCG benefit" },
        { label: "Tax Saving Tip 2", value: "Use Section 54/54F exemptions for real estate gains" },
        { label: "Tax Saving Tip 3", value: "Consider ELSS investments for 80C deduction + LTCG benefit" },
        { label: "Tax Saving Tip 4", value: "Invest LTCG in bonds under Section 54EC (Rs.50L/year limit)" }
      ];

      drawCard("SMART INVESTMENT STRATEGIES", investmentTips, [255, 248, 220]);

    } else {
      // Income Tax Computation
      generateModernHeader();

      const regime = type === 'old' ? result.oldRegime : result.newRegime;

      // Tax Summary Card
      const taxSummary = [
        { label: "Gross Total Income", value: `Rs. ${regime.grossIncome.toLocaleString()}` },
        { label: "Total Deductions", value: `Rs. ${regime.totalDeductions.toLocaleString()}` },
        { label: "Taxable Income", value: `Rs. ${regime.taxableIncome.toLocaleString()}` },
        { label: "Total Tax Liability", value: `Rs. ${regime.totalTax.toLocaleString()}` },
        { label: "Net Income After Tax", value: `Rs. ${regime.netIncome.toLocaleString()}` },
        { label: "Effective Tax Rate", value: regime.effectiveRate }
      ];

      drawCard("TAX COMPUTATION SUMMARY", taxSummary, [232, 245, 233]);

      // Income Breakdown Table
      const incomeHeaders = ['Income Source', 'Amount (Rs.)'];
      const incomeData = [
        ['Basic Salary', (parseFloat(basicSalary) || 0).toLocaleString()],
        ['House Rent Allowance', (parseFloat(hra) || 0).toLocaleString()],
        ['Special Allowance', (parseFloat(specialAllowance) || 0).toLocaleString()],
        ['Other Allowances', (parseFloat(otherAllowances) || 0).toLocaleString()],
        ['Bonus & Incentives', (parseFloat(bonus) || 0).toLocaleString()],
        ['Other Income Sources', (parseFloat(otherIncome) || 0).toLocaleString()],
        ['House Property Income', (parseFloat(housePropertyIncome) || 0).toLocaleString()]
      ];

      drawModernTable('INCOME BREAKDOWN', incomeHeaders, incomeData);

      // HRA Exemption Details (if applicable)
      if (parseFloat(hra) > 0 && (entityType === 'individual')) {
        const hraExemption = Math.min(
            parseFloat(hra) || 0,
            Math.max(0, (parseFloat(rentPaid) || 0) - (parseFloat(basicSalary) || 0) * 0.1),
            (parseFloat(basicSalary) || 0) * (cityType === 'metro' ? 0.5 : 0.4)
        );

        const hraDetails = [
          { label: "HRA Received", value: `Rs. ${(parseFloat(hra) || 0).toLocaleString()}` },
          { label: "Rent - 10% Basic", value: `Rs. ${Math.max(0, (parseFloat(rentPaid) || 0) - (parseFloat(basicSalary) || 0) * 0.1).toLocaleString()}` },
          { label: `${cityType === 'metro' ? '50%' : '40%'} of Basic (${cityType === 'metro' ? 'Metro' : 'Non-Metro'})`,
            value: `Rs. ${((parseFloat(basicSalary) || 0) * (cityType === 'metro' ? 0.5 : 0.4)).toLocaleString()}` },
          { label: "HRA Exemption (Minimum)", value: `Rs. ${hraExemption.toLocaleString()}` }
        ];

        drawCard("HRA EXEMPTION CALCULATION", hraDetails, [255, 248, 220]);
      }

      // Deductions Section
      if (type === 'old' || entityType === 'firm' || entityType === 'company') {
        if (entityType === 'firm' || entityType === 'company') {
          // Business Deductions
          const businessDeductions = [
            { label: "Depreciation", value: "As per IT Act rates" },
            { label: "Interest on Capital", value: entityType === 'firm' ? "Max 12% p.a." : "Fully deductible" },
            { label: "Employee Benefits", value: "Salaries, PF, ESI" },
            { label: "Operating Expenses", value: "Rent, utilities, repairs" },
            { label: "Professional Fees", value: "Audit, legal, consulting" }
          ];

          if (entityType === 'firm') {
            businessDeductions.push({ label: "Partner Remuneration", value: "As per partnership deed" });
          } else {
            businessDeductions.push({ label: "CSR Expenses", value: "2% of average profit" });
          }

          drawCard(`${entityType === 'firm' ? 'PARTNERSHIP FIRM' : 'COMPANY'} DEDUCTIONS`, businessDeductions, [245, 245, 245]);
        } else {
          // Personal Deductions
          const deductionHeaders = ['Section', 'Description', 'Limit (Rs.)', 'Claimed (Rs.)'];
          const deductionData = [
            ['80C', 'PF, PPF, ELSS, Insurance', '1,50,000', (parseFloat(section80C) || 0).toLocaleString()],
            ['80D', 'Health Insurance - Self/Family', '25,000', (parseFloat(section80DSelf) || 0).toLocaleString()],
            ['80D', 'Health Insurance - Parents', '50,000', (parseFloat(section80DParents) || 0).toLocaleString()],
            ['80CCD(1B)', 'Additional NPS', '50,000', (parseFloat(section80CCD1B) || 0).toLocaleString()],
            ['80E', 'Education Loan Interest', 'No Limit', (parseFloat(section80E) || 0).toLocaleString()],
            ['24(b)', 'Home Loan Interest', '2,00,000', (parseFloat(section24B) || 0).toLocaleString()],
            ['Others', 'Professional Tax, Donations', '', (parseFloat(professionalTax) || 0 + parseFloat(otherDeductions) || 0).toLocaleString()]
          ];

          drawModernTable('TAX DEDUCTIONS (CHAPTER VI-A)', deductionHeaders, deductionData);
        }
      }

      // Tax Slab Calculation
      if (regime.breakdown && regime.breakdown.length > 0) {
        const slabHeaders = ['Income Slab', 'Tax Rate', 'Amount (Rs.)', 'Tax (Rs.)'];
        const slabData: string[][] = [];

        regime.breakdown.forEach(slab => {
          slabData.push([
            slab.slab,
            slab.rate,
            slab.taxableAmount.toLocaleString(),
            slab.tax.toLocaleString()
          ]);
        });

        drawModernTable('TAX CALCULATION SLABS', slabHeaders, slabData);
      }

      // Tax Planning Tips
      const taxTips = type === 'new' ? [
        { label: "Benefit 1", value: "Higher basic exemption limit (Rs.3L vs Rs.2.5L)" },
        { label: "Benefit 2", value: "87A Rebate up to Rs.12L income (Rs.60,000 max)" },
        { label: "Benefit 3", value: "Simplified tax structure with fewer complexities" },
        { label: "Benefit 4", value: "Standard deduction of Rs.75,000 available" },
        { label: "Note", value: "No Chapter VI-A deductions allowed in new regime" }
      ] : [
        { label: "Benefit 1", value: "All Chapter VI-A deductions available (80C, 80D, etc.)" },
        { label: "Benefit 2", value: "HRA exemption for salaried employees" },
        { label: "Benefit 3", value: "Education loan interest deduction (80E)" },
        { label: "Benefit 4", value: "Home loan interest deduction (24b)" },
        { label: "Note", value: "Higher basic exemption in new regime - compare both" }
      ];

      drawCard(`${type.toUpperCase()} REGIME ADVANTAGES`, taxTips, [240, 248, 255]);
    }

    // Add modern footer to all pages
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      // Footer background
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');

      // Footer content
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('IncomeGrow Financial SERVICES', 15, pageHeight - 15, { charSpace: 0 });
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 15, pageHeight - 15, { align: 'right' });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text('Professional Tax Consultation & Financial Planning', 15, pageHeight - 10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 15, pageHeight - 10, { align: 'right' });

      // Footer disclaimer
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(6);
      doc.text('This is a computer-generated report. Please consult a tax advisor for professional advice.', pageWidth / 2, pageHeight - 5, { align: 'center' });
    }

    // Save the PDF with modern filename
    const entityLabel = entityType === 'individual' ? 'Personal' :
        entityType === 'huf' ? 'HUF' :
            entityType === 'firm' ? 'Partnership' : 'Corporate';

    const reportType = type === 'capital' ? 'CapitalGains' :
        type === 'old' ? 'OldRegime' : 'NewRegime';

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = `${entityLabel}_${reportType}_Tax_Report_AY${assessmentYear}_${timestamp}.pdf`;

    doc.save(filename);
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
      <>
        <Head>
          <title>Income Tax Calculator 2025-26 - Old vs New Regime Comparison | IncomeGrow</title>
          <meta name="description" content="Free income tax calculator for FY 2024-25 (AY 2025-26). Compare old vs new tax regime, calculate HRA, 80C, 80D deductions. Save your tax calculations and plan effectively." />
          <meta name="keywords" content="income tax calculator, tax calculator 2025-26, old vs new tax regime, HRA calculator, 80C deduction calculator, tax planning, India tax calculator" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://www.incomegrow.in/calculation/tax" />
          <link rel="icon" type="image/png" href="/favicon.png" />

          {/* Open Graph */}
          <meta property="og:title" content="Income Tax Calculator - Compare Old vs New Tax Regime" />
          <meta property="og:description" content="Free tax calculator with old vs new regime comparison. Calculate tax, save calculations, and optimize your tax planning." />
          <meta property="og:url" content="https://www.incomegrow.in/calculation/tax" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://www.incomegrow.in/og-tax-calculator.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Income Tax Calculator 2025-26" />
          <meta name="twitter:description" content="Calculate income tax with our free calculator. Compare old vs new regime." />
          <meta name="twitter:image" content="https://www.incomegrow.in/og-tax-calculator.png" />

          {/* Schema.org structured data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Income Tax Calculator",
              "description": "Free income tax calculator for India with old vs new regime comparison, HRA calculation, and all deductions under Chapter VI-A.",
              "url": "https://www.incomegrow.in/calculation/tax",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "provider": {
                "@type": "Organization",
                "name": "IncomeGrow Financial",
                "url": "https://www.incomegrow.in"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "5234"
              }
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.incomegrow.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Calculators",
                  "item": "https://www.incomegrow.in/calculation"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Income Tax Calculator",
                  "item": "https://www.incomegrow.in/calculation/tax"
                }
              ]
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": taxFAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        </Head>

        <div className="font-sans m-0 p-0 bg-white">
          <Header />

          <main>
            {/* Hero Section */}
            <Banner/>

            {/* Calculator Section */}
            <section className="py-24 bg-white relative overflow-hidden">
              <div className="w-full max-w-[1600px] mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Input Form */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Tax Calculator
                      </h2>

                      {/* Link to Complete Tax Planning Guide */}
                      <div className="text-center mb-8">
                        <button
                            onClick={() => router.push('/tax-planning')}
                            className="text-sm text-gray-600 hover:text-[#FF6B2C] underline underline-offset-2 transition-colors duration-200"
                        >
                          View Complete Tax Planning Guide →
                        </button>
                      </div>

                      <div className="space-y-8">

                        {/* Entity Type Selection */}
                        <EntityType entityType={entityType} setEntityType={setEntityType} />

                        {/* Personal Details */}
                        <PersonalDetails
                              entityType={entityType}
                              age={age}
                              assessmentYear={assessmentYear}
                              gender={gender}
                              residentialStatus={residentialStatus}
                              setAge={setAge}
                              setAssessmentYear={setAssessmentYear}
                              setGender={setGender}
                              setResidentialStatus={setResidentialStatus}
                        />

                        {/* Income Details */}
                        <IncomeDetails
                            entityType={entityType}
                            basicSalary={basicSalary}
                            bonus={bonus}
                            housePropertyIncome={housePropertyIncome}
                            hra={hra}
                            otherAllowances={otherAllowances}
                            otherIncome={otherIncome}
                            setBasicSalary={setBasicSalary}
                            setBonus={setBonus}
                            setHousePropertyIncome={setHousePropertyIncome}
                            setHra={setHra}
                            setOtherAllowances={setOtherAllowances}
                            setOtherIncome={setOtherIncome}
                            setSpecialAllowance={setSpecialAllowance}
                            specialAllowance={specialAllowance}
                        />

                        {/* Capital Gains from Stock Market */}
                        <CapitalGains
                            ltcgEquity={ltcgEquity}
                            ltcgOther={ltcgOther}
                            setLtcgEquity={setLtcgEquity}
                            setLtcgOther={setLtcgOther}
                            setStcgEquity={setStcgEquity}
                            setStcgOther={setStcgOther}
                            stcgEquity={stcgEquity}
                            stcgOther={stcgOther}
                        />

                        {/* HRA Details */}
                        <HRADetails
                            setShowCityListModal={setShowCityListModal}
                            cityType={cityType}
                            rentPaid={rentPaid}
                            setCityType={setCityType}
                            setRentPaid={setRentPaid}
                        />

                        {/* Deductions */}
                        {(entityType === 'individual' || entityType === 'huf') && (
                            <Deductions
                                age={age} entityType={entityType} otherDeductions={otherDeductions} professionalTax={professionalTax}
                                section24B={section24B} section80C={section80C}
                                section80CCD1B={section80CCD1B} section80DParents={section80DParents}
                                section80DSelf={section80DSelf} section80E={section80E}
                                section80G50={section80G50} section80G100={section80G100}
                                setOtherDeductions={setOtherDeductions} setProfessionalTax={setProfessionalTax}
                                setSection24B={setSection24B} setSection80C={setSection80C}
                                setSection80CCD1B={setSection80CCD1B} setSection80DParents={setSection80DParents}
                                setSection80DSelf={setSection80DSelf} setSection80E={setSection80E}
                                setSection80G50={setSection80G50} setSection80G100={setSection80G100}
                            />
                        )}

                        {/* Business Deductions for Firm/Company */}
                        {(entityType === 'firm' || entityType === 'company') && (
                            <BusinessDeductions
                                setSection80DSelf={setSection80DSelf}
                                setSection80C={setSection80C}
                                section80DSelf={section80DSelf}
                                section80C={section80C}
                                entityType={entityType}/>
                        )}

                        <button
                            className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            onClick={calculateTax}
                        >
                          Calculate Tax & Compare Regimes
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Results */}
                    <Results
                        basicSalary={basicSalary}
                        entityType={entityType}
                        residentialStatus={residentialStatus}
                        assessmentYear={assessmentYear}
                        age={age}
                        activeTab={activeTab}
                        generatePDF={generatePDF}
                        getTaxConfig={getTaxConfig}
                        handleGetStarted={handleGetStarted}
                        isLoggedIn={isLoggedIn}
                        result={result}
                        setActiveTab={setActiveTab}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Tax Planning Tips */}
            <TaxPlanningTips/>

            {/* FAQ Section */}
            <CalculatorFAQ faqs={taxFAQs} title="Income Tax Calculator - Frequently Asked Questions" />

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Optimize Your Tax Planning
                </h2>

                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                  Calculate your tax, save calculations, and plan your tax-saving investments effectively
                </p>

                <button
                    onClick={handleGetStarted}
                    className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  {isLoggedIn ? 'Save Tax Calculations' : 'Get Started Free'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </section>
          </main>

          <Footer />
        </div>

        {/* City List Modal */}
        {showCityListModal && (
           <CityWiseHRAList setShowCityListModal={setShowCityListModal}/>
        )}
      </>
  );
}