import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jsPDF from 'jspdf';

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
        <title>Comprehensive Indian Tax Calculator - IncomeGrow Financial</title>
        <meta name="description" content="Complete Indian income tax calculator with Old vs New regime comparison for multiple assessment years, HRA, 80C, 80D deductions and detailed tax planning." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 mb-8">
                <span className="text-sm font-semibold text-green-600">Comprehensive Tax Calculator</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Indian Income Tax
                </span>
                <br />
                <span className="text-gray-800">Calculator</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Complete tax calculation with Old vs New regime comparison, HRA exemption, 
                all deductions under Chapter VI-A, and personalized tax planning advice.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Old vs New</div>
                  <div className="text-gray-600">Regime Compare</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">HRA</div>
                  <div className="text-gray-600">Calculation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">All</div>
                  <div className="text-gray-600">Deductions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Smart</div>
                  <div className="text-gray-600">Planning</div>
                </div>
              </div>
            </div>
          </section>

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
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Entity Type</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: 'individual', label: 'Individual', icon: '', description: 'Personal tax filing' },
                            { id: 'huf', label: 'HUF', icon: '', description: 'Hindu Undivided Family' },
                            { id: 'firm', label: 'Firm', icon: '', description: 'Partnership Firm' },
                            { id: 'company', label: 'Company', icon: '', description: 'Corporate Entity' }
                          ].map((entity) => (
                            <button
                              key={entity.id}
                              onClick={() => setEntityType(entity.id)}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                entityType === entity.id
                                  ? 'border-[#FF6B2C] bg-orange-50 shadow-md'
                                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                              }`}
                            >
                              <div className="text-center">
                                <div className="text-2xl mb-2">{entity.icon}</div>
                                <div className={`font-semibold text-sm ${
                                  entityType === entity.id ? 'text-[#FF6B2C]' : 'text-gray-700'
                                }`}>
                                  {entity.label}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{entity.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        {entityType !== 'individual' && (
                          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <span className="text-yellow-600 mt-0.5">!</span>
                              <div>
                                <div className="font-semibold text-yellow-800 text-sm">
                                  {entityType === 'huf' && 'HUF Tax Rates Apply'}
                                  {entityType === 'firm' && 'Partnership Firm Tax Rules Apply'}
                                  {entityType === 'company' && 'Corporate Tax Rates Apply'}
                                </div>
                                <div className="text-yellow-700 text-xs mt-1">
                                  {entityType === 'huf' && 'HUF has same tax slabs as individuals but different exemption rules.'}
                                  {entityType === 'firm' && 'Flat 30% tax rate on total income. No personal exemptions apply.'}
                                  {entityType === 'company' && 'Corporate tax rates: 25-30% based on turnover. Different compliance requirements.'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Personal Details */}
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Assessment Year
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Assessment Year vs Financial Year:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Financial Year (FY):</span>
                                      <div className="ml-2">- Period when income is earned (April 1 to March 31)</div>
                                      <div className="ml-2">- Example: FY 2024-25 = April 1, 2024 to March 31, 2025</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Assessment Year (AY):</span>
                                      <div className="ml-2">- Period when you file tax return for previous FY</div>
                                      <div className="ml-2">- Always next year after FY</div>
                                      <div className="ml-2">- Example: AY 2025-26 for income earned in FY 2024-25</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Key Point:</span>
                                      <div className="ml-2">- Tax rules and slabs are based on the Assessment Year</div>
                                      <div className="ml-2">- Select the AY for which you want to calculate tax</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm font-medium"
                              value={assessmentYear}
                              onChange={(e) => setAssessmentYear(e.target.value)}
                            >
                              <option value="2025-26">AY 2025-26 (FY 2024-25) - Current</option>
                              <option value="2024-25">AY 2024-25 (FY 2023-24)</option>
                              <option value="2023-24">AY 2023-24 (FY 2022-23)</option>
                              <option value="2022-23">AY 2022-23 (FY 2021-22)</option>
                            </select>
                            <p className="text-xs text-blue-600 mt-1">
                              💡 Different years have different tax slabs and rates
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {(entityType === 'individual' || entityType === 'huf') && (
                            <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Age
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Age-Based Tax Benefits:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Below 60 years:</span>
                                      <div className="ml-2">- Basic exemption: Rs.2.5L (Old Regime)</div>
                                      <div className="ml-2">- Health insurance: Rs.25,000 limit</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• 60-80 years (Senior Citizen):</span>
                                      <div className="ml-2">- Basic exemption: Rs.3L (Old Regime)</div>
                                      <div className="ml-2">- Health insurance: Rs.50,000 limit</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-300">• Above 80 years (Super Senior):</span>
                                      <div className="ml-2">- Basic exemption: Rs.5L (Old Regime)</div>
                                      <div className="ml-2">- Health insurance: Rs.50,000 limit</div>
                                      <div className="ml-2">- Additional medical benefits</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 30"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {parseInt(age) >= 80 ? 'Super Senior: Rs.5L exemption, Rs.50K health insurance' : 
                                  parseInt(age) >= 60 ? 'Senior Citizen: Rs.3L exemption, Rs.50K health insurance' : 
                                  'Below 60: Rs.2.5L exemption, Rs.25K health insurance'}
                            </p>
                          </div>
                          )}
                          {(entityType === 'individual' || entityType === 'huf') && (
                            <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Gender
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Gender & Tax Implications:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Tax Slabs:</span>
                                      <div className="ml-2">- Same tax rates for all genders</div>
                                      <div className="ml-2">- No gender-based exemptions</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Equal Treatment:</span>
                                      <div className="ml-2">- Indian tax law is gender-neutral</div>
                                      <div className="ml-2">- Age is the only demographic factor</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Collection Purpose:</span>
                                      <div className="ml-2">- Required for tax filing compliance</div>
                                      <div className="ml-2">- Used for statistical analysis only</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                              💡 Gender does not affect tax rates - all citizens have equal tax treatment
                            </p>
                          </div>
                          )}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Residential Status
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Tax Implications:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Resident:</span>
                                      <div className="ml-2">- Taxed on worldwide income</div>
                                      <div className="ml-2">- All deductions available</div>
                                      <div className="ml-2">- Standard exemption limits</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-300">• Non-Resident:</span>
                                      <div className="ml-2">- Taxed only on Indian income</div>
                                      <div className="ml-2">- Limited deductions</div>
                                      <div className="ml-2">- No basic exemption</div>
                                      <div className="ml-2">- Tax from Rs.1 (no Rs.2.5L exemption)</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={residentialStatus}
                              onChange={(e) => setResidentialStatus(e.target.value)}
                            >
                              <option value="resident">Resident Indian</option>
                              <option value="nri">Non-Resident Indian (NRI)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                              {residentialStatus === 'nri' ? 'NRIs: Taxed on Indian income only, no basic exemption' : 'Residents: Taxed on global income with full exemptions'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Income Details */}
                      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="text-lg font-bold text-green-800 mb-4">
                          {entityType === 'individual' || entityType === 'huf' ? 'Income Details (Annual)' : 
                              entityType === 'firm' ? 'Business Income (Annual)' : 
                              'Corporate Income (Annual)'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(entityType === 'individual' || entityType === 'huf') && (
                            <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Basic Salary (Rs.)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Basic Salary Component:</div>
                                  <div className="space-y-2">
                                    <div><strong>What is Basic Salary:</strong></div>
                                    <div>• Fixed component of your salary package</div>
                                    <div>• Typically 40-50% of total CTC</div>
                                    <div>• Base for calculating other benefits (PF, gratuity, etc.)</div>
                                    <div className="mt-2"><strong>Includes:</strong></div>
                                    <div>• Monthly basic pay × 12 months</div>
                                    <div>• Fixed allowances integrated into basic pay</div>
                                    <div className="mt-2"><strong>Excludes:</strong></div>
                                    <div>• HRA, special allowances, bonuses</div>
                                    <div>• Variable pay or performance incentives</div>
                                    <div>• Reimbursements and perquisites</div>
                                    <div className="mt-2"><strong>Tax Impact:</strong></div>
                                    <div>• Fully taxable income</div>
                                    <div>• Used for HRA exemption calculation (50%/40% of basic)</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Important:</strong> Higher basic = Higher HRA exemption potential<br/>
                                      <strong>PF Contribution:</strong> 12% of basic salary (up to Rs.1.8L basic)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 800000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              HRA (Rs.)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">House Rent Allowance (HRA):</div>
                                  <div className="space-y-2">
                                    <div><strong>What is HRA:</strong></div>
                                    <div>• Allowance paid by employer for rental accommodation</div>
                                    <div>• Usually 40-50% of basic salary</div>
                                    <div>• Partially exempt from income tax</div>
                                    <div className="mt-2"><strong>HRA Exemption (minimum of):</strong></div>
                                    <div>• Actual HRA received</div>
                                    <div>• 50% of basic (metro) or 40% of basic (non-metro)</div>
                                    <div>• Rent paid minus 10% of basic salary</div>
                                    <div className="mt-2"><strong>Required Documents:</strong></div>
                                    <div>• Rent receipts from landlord</div>
                                    <div>• Rental agreement copy</div>
                                    <div>• Landlord&apos;s PAN (if rent &gt;Rs.1L annually)</div>
                                    <div className="mt-2"><strong>Key Points:</strong></div>
                                    <div>• Even if living in own house, HRA is still taxable</div>
                                    <div>• Can claim HRA + home loan deduction together</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Tax Benefit:</strong> Significant exemption for rent payers<br/>
                                      <strong>Tip:</strong> Higher rent = Higher exemption (up to limits)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 240000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={hra}
                              onChange={(e) => setHra(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Special Allowance (Rs.)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Special Allowance Component:</div>
                                  <div className="space-y-2">
                                    <div><strong>What is Special Allowance:</strong></div>
                                    <div>• Flexible component of salary package</div>
                                    <div>• Often called &quot;flexi pay&quot; or &quot;other allowances&quot;</div>
                                    <div>• Used to balance total CTC after basic + HRA</div>
                                    <div className="mt-2"><strong>Common Types:</strong></div>
                                    <div>• Performance allowance</div>
                                    <div>• City compensatory allowance</div>
                                    <div>• Special skill allowance</div>
                                    <div>• Retention allowance</div>
                                    <div className="mt-2"><strong>Tax Treatment:</strong></div>
                                    <div>• <strong>Fully taxable</strong> as salary income</div>
                                    <div>• No specific exemptions available</div>
                                    <div>• Subject to TDS as per applicable rates</div>
                                    <div className="mt-2"><strong>Salary Planning:</strong></div>
                                    <div>• Can be restructured for tax optimization</div>
                                    <div>• Often converted to benefits like meal vouchers</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Note:</strong> Different from reimbursements or perquisites<br/>
                                      <strong>Planning:</strong> Consider salary restructuring to reduce tax
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 100000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={specialAllowance}
                              onChange={(e) => setSpecialAllowance(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Other Allowances (Rs.)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Other Allowances & Benefits:</div>
                                  <div className="space-y-2">
                                    <div><strong>Common Allowances:</strong></div>
                                    <div>• Transport/Conveyance allowance</div>
                                    <div>• Medical allowance</div>
                                    <div>• Communication/Phone allowance</div>
                                    <div>• Dearness allowance (DA)</div>
                                    <div>• Travel allowance</div>
                                    <div>• Overtime allowance</div>
                                    <div className="mt-2"><strong>Partially Exempt Allowances:</strong></div>
                                    <div>• <strong>Transport:</strong> Rs.1,600/month (Rs.19,200 annual)</div>
                                    <div>• <strong>Medical:</strong> Rs.15,000/year</div>
                                    <div>• <strong>LTA:</strong> For actual travel expenses</div>
                                    <div className="mt-2"><strong>Fully Taxable:</strong></div>
                                    <div>• Dearness allowance</div>
                                    <div>• Overtime payments</div>
                                    <div>• Performance incentives</div>
                                    <div className="mt-2"><strong>Documentation:</strong></div>
                                    <div>• Keep receipts for reimbursement claims</div>
                                    <div>• Check salary slip for exact breakup</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Tax Planning:</strong> Structure allowances for optimal exemptions<br/>
                                      <strong>Tip:</strong> Utilize transport & medical allowance limits fully
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={otherAllowances}
                              onChange={(e) => setOtherAllowances(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Bonus (Rs.)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Bonus & Variable Pay:</div>
                                  <div className="space-y-2">
                                    <div><strong>Types of Bonus:</strong></div>
                                    <div>• Annual performance bonus</div>
                                    <div>• Statutory bonus (under Payment of Bonus Act)</div>
                                    <div>• Festival/Diwali bonus</div>
                                    <div>• Retention bonus</div>
                                    <div>• Variable pay/incentives</div>
                                    <div>• Commission on sales</div>
                                    <div className="mt-2"><strong>Statutory Bonus Rules:</strong></div>
                                    <div>• Minimum 8.33% of salary (up to Rs.21,000 salary limit)</div>
                                    <div>• Maximum Rs.7,000 per year</div>
                                    <div>• Only for employees earning ≤Rs.21,000/month</div>
                                    <div className="mt-2"><strong>Tax Treatment:</strong></div>
                                    <div>• <strong>Fully taxable</strong> as salary income</div>
                                    <div>• Subject to TDS if applicable</div>
                                    <div>• Added to total income for tax slab calculation</div>
                                    <div className="mt-2"><strong>Payment Timing:</strong></div>
                                    <div>• Taxable in the year of receipt</div>
                                    <div>• May push you to higher tax bracket</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Planning:</strong> Plan investments if bonus increases tax liability<br/>
                                      <strong>TDS:</strong> Employer may deduct TDS on bonus payments
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 80000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={bonus}
                              onChange={(e) => setBonus(e.target.value)}
                            />
                          </div>
                          </>
                          )}
                          
                          {/* Business Income Fields for Firm/Company */}
                          {(entityType === 'firm' || entityType === 'company') && (
                            <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {entityType === 'firm' ? 'Partnership Income (Rs.)' : 'Corporate Turnover (Rs.)'}
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">{entityType === 'firm' ? 'Partnership Firm Income:' : 'Corporate Income:'}</div>
                                  <div className="space-y-2">
                                    {entityType === 'firm' ? (
                                      <>
                                        <div><strong>Partnership Income:</strong></div>
                                        <div>• Total profit/income of the firm</div>
                                        <div>• After all business expenses</div>
                                        <div>• Before partner remuneration</div>
                                        <div className="mt-2"><strong>Tax Treatment:</strong></div>
                                        <div>• Flat 30% tax rate</div>
                                        <div>• No personal exemptions</div>
                                        <div>• Partners taxed separately on their share</div>
                                      </>
                                    ) : (
                                      <>
                                        <div><strong>Corporate Turnover:</strong></div>
                                        <div>• Total business revenue/turnover</div>
                                        <div>• Before deducting expenses</div>
                                        <div className="mt-2"><strong>Tax Rates:</strong></div>
                                        <div>• Turnover ≤Rs.400 crore: 25% + cess</div>
                                        <div>• Turnover &gt;₹400 crore: 30% + cess</div>
                                        <div>• Different rates for new companies</div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder={entityType === 'firm' ? 'e.g., 2500000' : 'e.g., 50000000'}
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {entityType === 'firm' ? 'Business Expenses (₹)' : 'Operating Expenses (₹)'}
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Business Expenses:</div>
                                  <div className="space-y-2">
                                    <div><strong>Deductible Expenses:</strong></div>
                                    <div>• Office rent, utilities, staff salaries</div>
                                    <div>• Raw materials, manufacturing costs</div>
                                    <div>• Professional fees, audit costs</div>
                                    <div>• Depreciation on assets</div>
                                    <div>• Interest on business loans</div>
                                    <div className="mt-2"><strong>Tax Benefit:</strong></div>
                                    <div>• Reduces taxable business income</div>
                                    <div>• Must be business-related expenses</div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder={entityType === 'firm' ? 'e.g., 800000' : 'e.g., 15000000'}
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={hra}
                              onChange={(e) => setHra(e.target.value)}
                            />
                          </div>
                          </>
                          )}
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Other Income (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Income from Other Sources:</div>
                                  <div className="space-y-2">
                                    <div><strong>Interest Income:</strong></div>
                                    <div>• Savings account interest (&gt;₹10,000 - claim 80TTA)</div>
                                    <div>• Fixed deposits, recurring deposits</div>
                                    <div>• Bonds, debentures, and securities</div>
                                    <div>• Company deposits and loan interest</div>
                                    <div className="mt-2"><strong>Dividend Income:</strong></div>
                                    <div>• Dividend from shares (fully taxable)</div>
                                    <div>• Mutual fund dividend distributions</div>
                                    <div>• Cooperative society dividends</div>
                                    <div className="mt-2"><strong>Agriculture Income:</strong></div>
                                    <div>• <strong>Exempt from tax</strong> if below ₹5,000</div>
                                    <div>• Above ₹5,000: Used for rate calculation only</div>
                                    <div>• Income from land cultivation, dairy, etc.</div>
                                    <div className="mt-2"><strong>Lottery/Gambling Winnings:</strong></div>
                                    <div>• <strong>TDS: 30%</strong> deducted at source</div>
                                    <div>• <strong>Tax Rate: 30%</strong> (flat rate, no exemption)</div>
                                    <div>• Includes lottery, crossword, card games, races</div>
                                    <div>• Prize money from TV shows, competitions</div>
                                    <div className="mt-2"><strong>Other Income:</strong></div>
                                    <div>• Freelancing and consultation fees</div>
                                    <div>• Rental income from property</div>
                                    <div>• Commission and brokerage income</div>
                                    <div>• Royalty and intellectual property income</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Key Point:</strong> Agriculture income exempt but affects tax rates<br/>
                                      <strong>Lottery TDS:</strong> 30% TDS + 30% final tax (no relief)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 25000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={otherIncome}
                              onChange={(e) => setOtherIncome(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Income from House Property (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Income from House Property (Section 24a):</div>
                                  <div className="space-y-2">
                                    <div><strong>What to Enter:</strong></div>
                                    <div>• <strong>Net rental income</strong> after 30% standard deduction</div>
                                    <div>• This field is for income AFTER standard deduction</div>
                                    <div>• Do NOT enter gross rental income here</div>
                                    <div className="mt-2"><strong>Standard Deduction (Section 24a):</strong></div>
                                    <div>• <strong>30% deduction</strong> automatically allowed by law</div>
                                    <div>• Covers property repairs, collection charges, etc.</div>
                                    <div>• You don&apos;t need to provide receipts for this</div>
                                    <div className="mt-2"><strong>Calculation Example:</strong></div>
                                    <div>• Gross rental income: ₹1,00,000</div>
                                    <div>• Less: 30% standard deduction: ₹30,000</div>
                                    <div>• <strong>Enter here: ₹70,000</strong></div>
                                    <div className="mt-2"><strong>Additional Deductions:</strong></div>
                                    <div>• Home loan interest can be claimed separately</div>
                                    <div>• Municipal taxes paid can be deducted</div>
                                    <div>• For let-out property only</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Important:</strong> Enter net income after 30% deduction<br/>
                                      <strong>Tax Treatment:</strong> Added to total income for slab calculation
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="After 30% deduction, e.g., 70000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={housePropertyIncome}
                              onChange={(e) => setHousePropertyIncome(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Enter income AFTER 30% standard deduction as per Section 24(a)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Capital Gains from Stock Market */}
                      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <h3 className="text-lg font-bold text-red-800 mb-4">Capital Gains from Stock Market (Annual)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              STCG - Equity Shares (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Short Term Capital Gains - Equity:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-red-300">• Definition:</span>
                                      <div className="ml-2">- Gains from equity shares held ≤ 12 months</div>
                                      <div className="ml-2">- Gains from equity mutual funds held ≤ 12 months</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Tax Rate:</span>
                                      <div className="ml-2">- 15% + 4% cess = 15.6% total</div>
                                      <div className="ml-2">- Taxed separately from other income</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-green-300">• Example:</span>
                                      <div className="ml-2">- Buy: ₹1L, Sell: ₹1.2L in 6 months</div>
                                      <div className="ml-2">- STCG: ₹20,000, Tax: ₹3,120</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={stcgEquity}
                              onChange={(e) => setStcgEquity(e.target.value)}
                            />
                            <p className="text-xs text-red-600 mt-1">
                              Equity/MF held ≤12 months - 15.6% tax rate
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              LTCG - Equity Shares (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Long Term Capital Gains - Equity:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Definition:</span>
                                      <div className="ml-2">- Gains from equity shares held &gt; 12 months</div>
                                      <div className="ml-2">- Gains from equity mutual funds held &gt; 12 months</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Tax Structure:</span>
                                      <div className="ml-2">- First ₹1L per year: Tax-free</div>
                                      <div className="ml-2">- Above ₹1L: 10% + 4% cess = 10.4%</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Example:</span>
                                      <div className="ml-2">- LTCG: ₹1.5L, Tax: (₹1.5L-₹1L) × 10.4%</div>
                                      <div className="ml-2">- Tax: ₹50,000 × 10.4% = ₹5,200</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 150000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={ltcgEquity}
                              onChange={(e) => setLtcgEquity(e.target.value)}
                            />
                            <p className="text-xs text-green-600 mt-1">
                              Equity/MF held &gt;12 months - Rs.1L exempt, then 10.4%
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              STCG - Other Investments (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">STCG - Other Investments:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-purple-300">• Includes:</span>
                                      <div className="ml-2">- Debt mutual funds held ≤ 36 months</div>
                                      <div className="ml-2">- Gold, property, bonds held ≤ threshold</div>
                                      <div className="ml-2">- Cryptocurrency gains</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-300">• Tax Rate:</span>
                                      <div className="ml-2">- Added to total income</div>
                                      <div className="ml-2">- Taxed at your regular income tax slab</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Important:</span>
                                      <div className="ml-2">- No separate tax rate</div>
                                      <div className="ml-2">- Increases your total taxable income</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 25000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={stcgOther}
                              onChange={(e) => setStcgOther(e.target.value)}
                            />
                            <p className="text-xs text-purple-600 mt-1">
                              Debt MF, gold, crypto - taxed at your income slab
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              LTCG - Other Investments (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">LTCG - Other Investments:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-indigo-300">• Includes:</span>
                                      <div className="ml-2">- Debt mutual funds held &gt; 36 months</div>
                                      <div className="ml-2">- Gold held &gt; 36 months</div>
                                      <div className="ml-2">- Property held &gt; 24 months</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-green-300">• Tax Rate:</span>
                                      <div className="ml-2">- 20% + 4% cess = 20.8% total</div>
                                      <div className="ml-2">- With indexation benefit (inflation adjustment)</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Benefit:</span>
                                      <div className="ml-2">- Cost price adjusted for inflation</div>
                                      <div className="ml-2">- Reduces taxable gains significantly</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 75000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={ltcgOther}
                              onChange={(e) => setLtcgOther(e.target.value)}
                            />
                            <p className="text-xs text-indigo-600 mt-1">
                              Debt MF, gold, property &gt;threshold - 20.8% with indexation
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* HRA Details */}
                      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                        <h3 className="text-lg font-bold text-purple-800 mb-4">HRA Exemption Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">City Type</label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={cityType}
                              onChange={(e) => setCityType(e.target.value)}
                            >
                              <option value="metro">Metro City (50% of Basic)</option>
                              <option value="non-metro">Non-Metro City (40% of Basic)</option>
                            </select>
                            <div className="mt-2">
                              <button
                                type="button"
                                onClick={() => setShowCityListModal(true)}
                                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none flex items-center gap-1"
                              >
                                View Metro vs Non-Metro City List
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Rent Paid (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 240000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={rentPaid}
                              onChange={(e) => setRentPaid(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Deductions */}
                      {(entityType === 'individual' || entityType === 'huf') && (
                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                        <h3 className="text-lg font-bold text-orange-800 mb-4">
                          {entityType === 'individual' ? 'Deductions (Old Regime Only)' : 'HUF Deductions (Old Regime Only)'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80C (PF, ELSS, PPF etc.) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Section 80C Tax Saving Investments:</div>
                                  <div className="space-y-2">
                                    <div><strong>Popular Options:</strong></div>
                                    <div>• <strong>PPF:</strong> 15-year lock-in, tax-free returns (~7-8%)</div>
                                    <div>• <strong>ELSS:</strong> 3-year lock-in, market-linked returns</div>
                                    <div>• <strong>PF/EPF:</strong> Employee provident fund contributions</div>
                                    <div>• <strong>NSC:</strong> 5-year term, ~6.8% interest</div>
                                    <div>• <strong>Tax-saving FD:</strong> 5-year lock-in, ~5-7% returns</div>
                                    <div>• <strong>Life Insurance:</strong> Premium paid (not maturity amount)</div>
                                    <div>• <strong>ULIP:</strong> Market-linked insurance plans</div>
                                    <div>• <strong>Home Loan Principal:</strong> Repayment amount</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Maximum Limit:</strong> ₹1.5 lakh per year<br/>
                                      <strong>Tax Benefit:</strong> Saves ₹31,200-₹46,800 based on tax slab
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Max: 150000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80C}
                              onChange={(e) => setSection80C(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80D Self/Family (Health Insurance) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Section 80D Health Insurance Deduction:</div>
                                  <div className="space-y-2">
                                    <div><strong>Eligible Premiums:</strong></div>
                                    <div>• Health insurance for self and family</div>
                                    <div>• Preventive health check-up expenses</div>
                                    <div>• Medical insurance premiums paid</div>
                                    <div className="mt-2"><strong>Age-based Limits:</strong></div>
                                    <div>• <strong>Below 60 years:</strong> ₹25,000 maximum</div>
                                    <div>• <strong>60+ years:</strong> ₹50,000 maximum</div>
                                    <div className="mt-2"><strong>Preventive Health Check-up:</strong></div>
                                    <div>• ₹5,000 within the above limits</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Tax Benefit:</strong> Direct deduction from taxable income<br/>
                                      <strong>Savings:</strong> ₹5,200-₹15,000 based on tax slab
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder={`Max: ${parseInt(age) >= 60 ? '50000' : '25000'}`}
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80DSelf}
                              onChange={(e) => setSection80DSelf(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              💡 {parseInt(age) >= 60 ? 'Senior citizens: ₹50,000' : 'Below 60: ₹25,000'}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80D Parents (Health Insurance) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Section 80D Parents Health Insurance:</div>
                                  <div className="space-y-2">
                                    <div><strong>Eligible Expenses:</strong></div>
                                    <div>• Health insurance premiums for parents</div>
                                    <div>• Medical expenses for parents (if no insurance)</div>
                                    <div>• Preventive health check-up for parents</div>
                                    <div className="mt-2"><strong>Maximum Limit:</strong></div>
                                    <div>• <strong>₹50,000</strong> regardless of parents&apos; age</div>
                                    <div>• Separate from self/family limit</div>
                                    <div className="mt-2"><strong>Key Benefits:</strong></div>
                                    <div>• Additional to self/family deduction</div>
                                    <div>• Total 80D can be up to ₹1 lakh (₹50k + ₹50k)</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Combined Benefit:</strong> Up to ₹1 lakh total 80D deduction<br/>
                                      <strong>Tax Savings:</strong> ₹10,400-₹30,000 based on tax slab
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Max: 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80DParents}
                              onChange={(e) => setSection80DParents(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              💡 Additional ₹50,000 for parents regardless of age
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80CCD(1B) (NPS) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Section 80CCD(1B) - NPS Additional Deduction:</div>
                                  <div className="space-y-2">
                                    <div><strong>What is NPS:</strong></div>
                                    <div>• National Pension System - Government retirement scheme</div>
                                    <div>• Market-linked pension and retirement planning</div>
                                    <div>• Long-term wealth creation with tax benefits</div>
                                    <div className="mt-2"><strong>Key Benefits:</strong></div>
                                    <div>• <strong>Additional ₹50,000</strong> deduction over 80C limit</div>
                                    <div>• Separate from ₹1.5 lakh 80C investments</div>
                                    <div>• Total possible: ₹2 lakh (₹1.5L + ₹50K)</div>
                                    <div className="mt-2"><strong>Investment Options:</strong></div>
                                    <div>• Equity, corporate bonds, government securities</div>
                                    <div>• Choice of fund managers and asset allocation</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Maximum Limit:</strong> ₹50,000 per year<br/>
                                      <strong>Tax Savings:</strong> ₹10,400-₹15,000 based on tax slab
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Max: 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80CCD1B}
                              onChange={(e) => setSection80CCD1B(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80E (Education Loan) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Section 80E Education Loan Interest:</div>
                                  <div className="space-y-2">
                                    <div><strong>Eligible Loans:</strong></div>
                                    <div>• Education loan for self, spouse, or children</div>
                                    <div>• Higher education (graduation & above)</div>
                                    <div>• From approved financial institutions only</div>
                                    <div className="mt-2"><strong>Deductible Amount:</strong></div>
                                    <div>• <strong>Only interest portion</strong> of EMI</div>
                                    <div>• <strong>No upper limit</strong> on deduction</div>
                                    <div>• Not principal repayment amount</div>
                                    <div className="mt-2"><strong>Time Limit:</strong></div>
                                    <div>• Maximum 8 years from start of repayment</div>
                                    <div>• Or until loan is fully repaid (whichever is earlier)</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Special Feature:</strong> No maximum limit unlike other sections<br/>
                                      <strong>Tax Savings:</strong> 20-30% of interest amount paid
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="No limit"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80E}
                              onChange={(e) => setSection80E(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80G Donations (50% deduction) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">50% Deduction Category:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-orange-300">• Government Funds:</span>
                                      <div className="ml-2">- PM National Relief Fund</div>
                                      <div className="ml-2">- National Defence Fund</div>
                                      <div className="ml-2">- State Government Relief Funds</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Educational Institutions:</span>
                                      <div className="ml-2">- Government schools/colleges</div>
                                      <div className="ml-2">- Some approved private institutions</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Other Organizations:</span>
                                      <div className="ml-2">- Some NGOs without 100% exemption</div>
                                      <div className="ml-2">- Certain charitable trusts</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Donation amount (50% deductible)"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80G50}
                              onChange={(e) => setSection80G50(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80G Donations (100% deduction) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">100% Deduction Category:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Prime Minister&apos;s Funds:</span>
                                      <div className="ml-2">- PM CARES Fund</div>
                                      <div className="ml-2">- PM National Relief Fund</div>
                                      <div className="ml-2">- Clean Ganga Fund</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Government Schemes:</span>
                                      <div className="ml-2">- Swachh Bharat Kosh</div>
                                      <div className="ml-2">- National Heritage Fund</div>
                                      <div className="ml-2">- Pradhan Mantri Kaushal Vikas Yojana</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-300">• Special Categories:</span>
                                      <div className="ml-2">- Government libraries</div>
                                      <div className="ml-2">- Government museums</div>
                                      <div className="ml-2">- Government zoos</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Donation amount (100% deductible)"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80G100}
                              onChange={(e) => setSection80G100(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              24(b) (Home Loan Interest) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Section 24(b) Home Loan Interest Deduction:</div>
                                  <div className="space-y-2">
                                    <div><strong>Eligible Properties:</strong></div>
                                    <div>• Self-occupied residential property</div>
                                    <div>• Under-construction property (pre-completion)</div>
                                    <div>• Home loan from banks/financial institutions</div>
                                    <div className="mt-2"><strong>Deduction Limits:</strong></div>
                                    <div>• <strong>₹2 lakh maximum</strong> per year for self-occupied</div>
                                    <div>• Only interest portion of EMI (not principal)</div>
                                    <div>• Available in both old and new tax regime</div>
                                    <div className="mt-2"><strong>Key Points:</strong></div>
                                    <div>• Principal repayment goes under Section 80C</div>
                                    <div>• Interest can be claimed even during construction</div>
                                    <div>• No time limit like education loan</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Combined Benefit:</strong> Up to ₹3.5L (₹2L interest + ₹1.5L principal)<br/>
                                      <strong>Tax Savings:</strong> ₹41,600-₹60,000 annually
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Max: 200000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section24B}
                              onChange={(e) => setSection24B(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Professional Tax (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Professional Tax Deduction:</div>
                                  <div className="space-y-2">
                                    <div><strong>What is Professional Tax:</strong></div>
                                    <div>• State-imposed tax on professions and employment</div>
                                    <div>• Deducted by employer from salary (TDS)</div>
                                    <div>• Varies by state - not applicable in all states</div>
                                    <div className="mt-2"><strong>State-wise Rates:</strong></div>
                                    <div>• <strong>Karnataka, West Bengal:</strong> ₹200-₹300 per month</div>
                                    <div>• <strong>Maharashtra:</strong> ₹175-₹200 per month</div>
                                    <div>• <strong>Andhra Pradesh, Telangana:</strong> ₹150-₹200</div>
                                    <div>• <strong>Not applicable:</strong> Delhi, Punjab, UP, etc.</div>
                                    <div className="mt-2"><strong>Tax Benefit:</strong></div>
                                    <div>• Fully deductible from income tax</div>
                                    <div>• Usually shows in Form 16 automatically</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Maximum Annual:</strong> Usually ₹2,400-₹3,600<br/>
                                      <strong>Tax Savings:</strong> ₹500-₹1,080 based on tax slab
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 2500"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={professionalTax}
                              onChange={(e) => setProfessionalTax(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Other Deductions (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Other Deductions Explained:</div>
                                  <div className="space-y-2">
                                    <div><strong>80TTA:</strong> ₹10,000 savings account interest deduction</div>
                                    <div><strong>80TTB:</strong> ₹50,000 interest deduction for senior citizens</div>
                                    <div><strong>80EE:</strong> Additional ₹50,000 home loan interest deduction</div>
                                    <div><strong>80EEB:</strong> ₹1.5 lakh electric vehicle loan interest deduction</div>
                                    <div><strong>80DD:</strong> ₹75,000-₹1.25 lakh for disabled dependent care</div>
                                    <div><strong>80DDB:</strong> Medical treatment of specified diseases deduction</div>
                                    <div className="mt-2 pt-2 border-t border-gray-600">
                                      <strong>Tax Benefit:</strong> Direct reduction from taxable income, saving 20-30% tax based on your tax slab
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="80TTA, 80TTB etc."
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={otherDeductions}
                              onChange={(e) => setOtherDeductions(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      )}

                      {/* Business Deductions for Firm/Company */}
                      {(entityType === 'firm' || entityType === 'company') && (
                      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                        <h3 className="text-lg font-bold text-purple-800 mb-4">
                          {entityType === 'firm' ? 'Partnership Firm Deductions' : 'Corporate Deductions'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {entityType === 'firm' ? 'Partner Remuneration (₹)' : 'Depreciation (₹)'}
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">{entityType === 'firm' ? 'Partner Remuneration:' : 'Depreciation:'}</div>
                                  <div className="space-y-2">
                                    {entityType === 'firm' ? (
                                      <>
                                        <div><strong>Allowable Remuneration:</strong></div>
                                        <div>• Working partners can get remuneration</div>
                                        <div>• Limited by Income Tax Act provisions</div>
                                        <div>• Deductible from firm&apos;s income</div>
                                        <div>• Partners taxed on their share + remuneration</div>
                                      </>
                                    ) : (
                                      <>
                                        <div><strong>Depreciation on Assets:</strong></div>
                                        <div>• Plant & machinery, buildings, furniture</div>
                                        <div>• As per Income Tax depreciation rates</div>
                                        <div>• Written down value method</div>
                                        <div>• Reduces taxable income</div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder={entityType === 'firm' ? 'e.g., 500000' : 'e.g., 200000'}
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80C}
                              onChange={(e) => setSection80C(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {entityType === 'firm' ? 'Interest on Capital (₹)' : 'CSR Expenses (₹)'}
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">{entityType === 'firm' ? 'Interest on Partners Capital:' : 'CSR Expenses:'}</div>
                                  <div className="space-y-2">
                                    {entityType === 'firm' ? (
                                      <>
                                        <div><strong>Interest on Capital:</strong></div>
                                        <div>• Interest paid to partners on their capital</div>
                                        <div>• Maximum 12% per annum allowed</div>
                                        <div>• Deductible from firm&apos;s income</div>
                                        <div>• Must be authorized by partnership deed</div>
                                      </>
                                    ) : (
                                      <>
                                        <div><strong>CSR Expenditure:</strong></div>
                                        <div>• Corporate Social Responsibility</div>
                                        <div>• Mandatory for companies with high turnover/profit</div>
                                        <div>• 2% of average net profits (last 3 years)</div>
                                        <div>• Deductible business expense</div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder={entityType === 'firm' ? 'e.g., 100000' : 'e.g., 300000'}
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80DSelf}
                              onChange={(e) => setSection80DSelf(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
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
                  <div className="lg:col-span-2 bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-8 border border-[#FF6B2C]/20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                      {entityType === 'individual' ? 'Personal Tax Calculation Results' :
                       entityType === 'huf' ? 'HUF Tax Calculation Results' :
                       entityType === 'firm' ? 'Partnership Firm Tax Results' :
                       'Corporate Tax Calculation Results'}
                    </h3>
                    <div className="text-center mb-6">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {assessmentYear === '2025-26' ? 'AY 2025-26 (FY 2024-25) - Current' :
                         assessmentYear === '2024-25' ? 'AY 2024-25 (FY 2023-24)' :
                         assessmentYear === '2023-24' ? 'AY 2023-24 (FY 2022-23)' :
                         'AY 2022-23 (FY 2021-22)'}
                      </span>
                    </div>
                    
                    {result ? (
                      <div className="space-y-6">
                        {/* Tabs */}
                        <div className={`flex rounded-xl bg-white p-1 ${entityType === 'firm' || entityType === 'company' ? 'justify-center' : ''}`}>
                          {(entityType === 'individual' || entityType === 'huf') && (
                            <>
                          <button
                            onClick={() => setActiveTab('comparison')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'comparison'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Comparison
                          </button>
                          <button
                            onClick={() => setActiveTab('old')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'old'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            {entityType === 'huf' ? 'HUF Tax' : 'Old Regime'}
                          </button>
                          <button
                            onClick={() => setActiveTab('new')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'new'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            New Regime
                          </button>
                          </>
                          )}
                          {(entityType === 'firm' || entityType === 'company') && (
                            <>
                          <button
                            onClick={() => setActiveTab('comparison')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'comparison'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Tax Summary
                          </button>
                          <button
                            onClick={() => setActiveTab('old')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'old'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            {entityType === 'firm' ? 'Business Tax' : 'Corporate Tax'}
                          </button>
                          </>
                          )}
                          <button
                            onClick={() => setActiveTab('capital')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'capital'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Capital Gains
                          </button>
                        </div>

                        {activeTab === 'comparison' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">
                                {entityType === 'firm' || entityType === 'company' ? 'Tax Summary' : 'Recommended'}
                              </div>
                              <div className="text-2xl font-bold text-[#FF6B2C] mb-2">
                                {result.recommendedRegime}
                              </div>
                              <div className="text-lg font-semibold text-green-600">
                                {(entityType === 'individual' || entityType === 'huf') && result.savings > 0 
                                  ? `Save ₹${result.savings.toLocaleString()}` 
                                  : entityType === 'firm' 
                                    ? 'Partnership Firm Tax Rate: 30%' 
                                    : entityType === 'company'
                                      ? 'Corporate Tax Rate: 25%/30%'
                                      : `Save ₹${result.savings.toLocaleString()}`}
                              </div>
                            </div>
                            
                            <div className={`grid gap-4 text-sm ${entityType === 'firm' || entityType === 'company' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="font-semibold text-gray-700 mb-2">
                                  {entityType === 'individual' ? 'Old Regime' :
                                   entityType === 'huf' ? 'HUF Tax Calculation' :
                                   entityType === 'firm' ? 'Partnership Tax Details' :
                                   'Corporate Tax Details'}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>Total Tax:</span>
                                    <span className="font-bold">₹{result.oldRegime.totalTax.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Net Income:</span>
                                    <span className="font-bold text-green-600">₹{result.oldRegime.netIncome.toLocaleString()}</span>
                                  </div>
                                  {entityType === 'firm' && (
                                    <div className="flex justify-between">
                                      <span>Tax Rate:</span>
                                      <span className="font-bold text-blue-600">30% + 4% Cess</span>
                                    </div>
                                  )}
                                  {entityType === 'company' && (
                                    <div className="flex justify-between">
                                      <span>Tax Rate:</span>
                                      <span className="font-bold text-blue-600">
                                        {(parseFloat(basicSalary) || 0) <= 40000000000 ? '25% + 4% Cess' : '30% + 4% Cess'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {(entityType === 'individual' || entityType === 'huf') && (
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="font-semibold text-gray-700 mb-2">New Regime</div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>Total Tax:</span>
                                    <span className="font-bold">₹{result.newRegime.totalTax.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Net Income:</span>
                                    <span className="font-bold text-green-600">₹{result.newRegime.netIncome.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              )}
                            </div>
                          </div>
                        )}

                        {activeTab === 'old' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">
                                {entityType === 'individual' ? 'Total Tax (Old Regime)' :
                                 entityType === 'huf' ? 'Total HUF Tax' :
                                 entityType === 'firm' ? 'Total Partnership Tax' :
                                 'Total Corporate Tax'}
                              </div>
                              <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                ₹{result.oldRegime.totalTax.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Effective Rate: {result.oldRegime.effectiveRate}%
                                {entityType === 'firm' && ' (30% + 4% Cess)'}
                                {entityType === 'company' && ` (${(parseFloat(basicSalary) || 0) <= 40000000000 ? '25%' : '30%'} + 4% Cess)`}
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>
                                    {entityType === 'firm' ? 'Business Income:' :
                                     entityType === 'company' ? 'Corporate Revenue:' :
                                     'Gross Income:'}
                                  </span>
                                  <span className="font-bold">₹{result.oldRegime.grossIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>
                                    {entityType === 'firm' ? 'Business Expenses & Remuneration:' :
                                     entityType === 'company' ? 'Operating Expenses & Depreciation:' :
                                     'Total Deductions:'}
                                  </span>
                                  <span className="font-bold text-blue-600">₹{result.oldRegime.totalDeductions.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>
                                    {entityType === 'firm' ? 'Taxable Business Income:' :
                                     entityType === 'company' ? 'Taxable Corporate Income:' :
                                     'Taxable Income:'}
                                  </span>
                                  <span className="font-bold">₹{result.oldRegime.taxableIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>
                                    {entityType === 'firm' ? 'Partnership Tax:' :
                                     entityType === 'company' ? 'Corporate Tax:' :
                                     'Income Tax:'}
                                  </span>
                                  <span className="font-bold">₹{result.oldRegime.incomeTax.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Cess (4%):</span>
                                  <span className="font-bold">₹{result.oldRegime.cess.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'new' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">Total Tax (New Regime)</div>
                              <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                ₹{result.newRegime.totalTax.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Effective Rate: {result.newRegime.effectiveRate}%
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Gross Income:</span>
                                  <span className="font-bold">₹{result.newRegime.grossIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Standard Deduction:</span>
                                  <span className="font-bold text-blue-600">₹{result.newRegime.totalDeductions.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Taxable Income:</span>
                                  <span className="font-bold">₹{result.newRegime.taxableIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Income Tax:</span>
                                  <span className="font-bold">₹{result.newRegime.incomeTax.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Cess (4%):</span>
                                  <span className="font-bold">₹{result.newRegime.cess.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'capital' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">Total Capital Gains Tax</div>
                              <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                ₹{result.capitalGainsBreakdown.totalCapitalGainsTax.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Same for both Old & New regime
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              {result.capitalGainsBreakdown.stcgEquity > 0 && (
                                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-red-800">STCG - Equity (≤12 months)</span>
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">15.6% tax</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.stcgEquity.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span className="font-bold text-red-600">₹{result.capitalGainsBreakdown.stcgEquityTax.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.ltcgEquity > 0 && (
                                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-green-800">LTCG - Equity (&gt;12 months)</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">₹1L exempt, then 10.4%</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.ltcgEquity.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Exemption:</span>
                                      <span className="text-green-600">₹{Math.min(result.capitalGainsBreakdown.ltcgEquity, 100000).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Taxable Amount:</span>
                                      <span className="font-medium">₹{Math.max(0, result.capitalGainsBreakdown.ltcgEquity - 100000).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span className="font-bold text-green-600">₹{result.capitalGainsBreakdown.ltcgEquityTax.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.stcgOther > 0 && (
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-purple-800">STCG - Other Investments</span>
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Added to income</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.stcgOther.toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs text-purple-600 mt-1">
                                      💡 Added to regular income and taxed at your income slab rate
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.ltcgOther > 0 && (
                                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-indigo-800">LTCG - Other Investments</span>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">20.8% with indexation</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.ltcgOther.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span className="font-bold text-indigo-600">₹{result.capitalGainsBreakdown.ltcgOtherTax.toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs text-indigo-600 mt-1">
                                      💡 Includes indexation benefit for inflation adjustment
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.totalCapitalGainsTax === 0 && (
                                <div className="text-center py-8">
                                  <div className="text-gray-500 text-lg">No capital gains declared</div>
                                  <div className="text-sm text-gray-400 mt-2">Enter your stock market gains in the form to see tax breakdown</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="text-center pt-4">
                          <button 
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Get Tax Planning Advice' : 'Create Account'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-lg">
                          Fill in your details to calculate and compare tax regimes
                        </p>
                      </div>
                    )}

                    {/* Tax Slabs Display */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                        Tax Slabs for {assessmentYear}
                      </h4>
                      
                      {(() => {
                        const config = getTaxConfig(assessmentYear);
                        const userAge = parseInt(age) || 0;
                        
                        return (
                          <div className="space-y-4">
                            {/* Tax Information based on entity type */}
                            {(entityType === 'individual' || entityType === 'huf') && (
                            <>
                            {/* Old Regime Slabs */}
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                              <h5 className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Old Regime
                              </h5>
                              <div className="space-y-2 text-sm">
                                {/* Basic Exemption */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                  <span className="text-gray-600">Basic Exemption:</span>
                                  <span className="font-medium text-red-600">
                                    ₹{(
                                      residentialStatus === 'nri' ? 0 :
                                      userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                      userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                      config.oldRegime.exemptionBelow60
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                {/* Tax Slabs */}
                                {config.oldRegime.slabs.map((slab, index) => {
                                  let basicExemption = config.oldRegime.exemptionBelow60;
                                  if (residentialStatus === 'nri') {
                                    basicExemption = 0;
                                  } else {
                                    basicExemption = userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                                    userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                                    config.oldRegime.exemptionBelow60;
                                  }
                                  const adjustedMin = Math.max(slab.min, basicExemption);
                                  
                                  return (
                                    <div key={index} className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">
                                        {slab.max === Infinity 
                                          ? `Above ₹${(adjustedMin/100000).toFixed(0)}L` 
                                          : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                      </span>
                                      <span className="font-medium text-red-600">{(slab.rate * 100).toFixed(0)}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* New Regime Slabs */}
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                              <h5 className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                New Regime
                              </h5>
                              <div className="space-y-2 text-sm">
                                {/* Basic Exemption */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                  <span className="text-gray-600">Basic Exemption:</span>
                                  <span className="font-medium text-green-600">
                                    ₹{(residentialStatus === 'nri' ? 0 : config.newRegime.exemption).toLocaleString()}
                                  </span>
                                </div>
                                {/* Tax Slabs */}
                                {config.newRegime.slabs.map((slab, index) => {
                                  const basicExemption = residentialStatus === 'nri' ? 0 : config.newRegime.exemption;
                                  const adjustedMin = Math.max(slab.min, basicExemption);
                                  
                                  return (
                                    <div key={index} className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">
                                        {slab.max === Infinity 
                                          ? `Above ₹${(adjustedMin/100000).toFixed(0)}L` 
                                          : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                      </span>
                                      <span className="font-medium text-green-600">{(slab.rate * 100).toFixed(0)}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                              <div className="text-sm space-y-2">
                                <div className="font-semibold text-yellow-800 mb-2 text-center">Rebates & Additional Info:</div>
                                
                                {/* Rebate Information */}
                                <div className="bg-green-100 rounded-lg p-2 border border-green-300">
                                  <div className="font-semibold text-green-800 mb-1 text-center">Section 87A Rebates:</div>
                                  <div className="space-y-1">
                                    <div className="text-green-700 text-center">
                                      <span className="font-medium">Old Regime:</span> ₹12,500 rebate if taxable income ≤ ₹5L
                                    </div>
                                    <div className="text-green-700 text-center">
                                      <span className="font-medium">New Regime:</span> ₹{config.rebateAmount.toLocaleString()} rebate if taxable income ≤ ₹{(config.rebateLimit/100000).toFixed(0)}L
                                    </div>
                                    <div className="text-green-600 text-xs italic text-center mt-1">
                                      Result: Zero tax if rebate covers full tax liability
                                    </div>
                                  </div>
                                </div>

                                {/* Other Info */}
                                <div className="grid grid-cols-1 gap-1 text-center">
                                  <div className="text-yellow-700">• Health & Education Cess: 4% on income tax</div>
                                  <div className="text-yellow-700">• Standard Deduction: ₹{config.standardDeduction.toLocaleString()} (New Regime)</div>
                                  <div className="text-yellow-700">• Surcharge: Applicable on income above ₹50L/₹1Cr</div>
                                </div>
                              </div>
                            </div>
                            </>
                            )}
                            
                            {/* Business Tax Information for Firm/Company */}
                            {(entityType === 'firm' || entityType === 'company') && (
                            <>
                            {/* Business Tax Structure */}
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                              <h5 className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                {entityType === 'firm' ? 'Partnership Tax Structure' : 'Corporate Tax Structure'}
                              </h5>
                              <div className="space-y-2 text-sm">
                                {entityType === 'firm' ? (
                                  <>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Tax Rate:</span>
                                      <span className="font-medium text-purple-600">30% Flat Rate</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Health & Education Cess:</span>
                                      <span className="font-medium text-purple-600">4% on Tax</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Total Effective Rate:</span>
                                      <span className="font-medium text-purple-600">31.2% (30% + 4% Cess)</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">No Basic Exemption:</span>
                                      <span className="font-medium text-red-600">Tax from ₹1</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Tax Rate (Turnover ≤₹400 Cr):</span>
                                      <span className="font-medium text-purple-600">25%</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Tax Rate (Turnover &gt;₹400 Cr):</span>
                                      <span className="font-medium text-purple-600">30%</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Health & Education Cess:</span>
                                      <span className="font-medium text-purple-600">4% on Tax</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">Your Current Rate:</span>
                                      <span className="font-medium text-purple-600">
                                        {(parseFloat(basicSalary) || 0) <= 40000000000 ? '26% (25% + 4% Cess)' : '31.2% (30% + 4% Cess)'}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Business Deductions */}
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                              <h5 className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                {entityType === 'firm' ? 'Partnership Deductions' : 'Corporate Deductions'}
                              </h5>
                              <div className="space-y-2 text-sm">
                                {entityType === 'firm' ? (
                                  <>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Partner Remuneration:</span>
                                      <span className="font-medium text-blue-600">As per Income Tax provisions</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Interest on Capital:</span>
                                      <span className="font-medium text-blue-600">Max 12% per annum</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Business Expenses:</span>
                                      <span className="font-medium text-blue-600">Fully Deductible</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">No Personal Deductions:</span>
                                      <span className="font-medium text-red-600">80C, 80D, etc. not applicable</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Depreciation:</span>
                                      <span className="font-medium text-blue-600">As per IT rates</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">CSR Expenses:</span>
                                      <span className="font-medium text-blue-600">2% of avg. profit (if applicable)</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                      <span className="text-gray-600">Operating Expenses:</span>
                                      <span className="font-medium text-blue-600">Fully Deductible</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">Minimum Alternate Tax (MAT):</span>
                                      <span className="font-medium text-orange-600">18.5% if applicable</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Additional Business Tax Info */}
                            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                              <div className="text-sm space-y-2">
                                <div className="font-semibold text-yellow-800 mb-2 text-center">
                                  {entityType === 'firm' ? 'Partnership Tax Compliance:' : 'Corporate Tax Compliance:'}
                                </div>
                                
                                <div className="grid grid-cols-1 gap-1 text-center">
                                  {entityType === 'firm' ? (
                                    <>
                                      <div className="text-yellow-700">• No regime choice - flat 30% rate applies</div>
                                      <div className="text-yellow-700">• Partners taxed separately on their share</div>
                                      <div className="text-yellow-700">• Advance tax payments required</div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="text-yellow-700">• Rate based on turnover threshold (₹400 Cr)</div>
                                      <div className="text-yellow-700">• MAT provisions may apply</div>
                                      <div className="text-yellow-700">• Dividend Distribution Tax abolished</div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            </>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* PDF Generation Section */}
                    <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">Download Detailed Tax Reports (Form 16 Style)</h4>
                      <p className="text-sm text-gray-600 text-center mb-6">
                        Get comprehensive tax calculation reports with complete breakdowns, deductions, and tax slabs - Similar to Form 16 format
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Old Regime PDF */}
                        {(entityType === 'individual' || entityType === 'huf') && (
                        <button
                          onClick={() => generatePDF('old')}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {entityType === 'huf' ? 'HUF Tax (Old)' : 'Old Regime'} PDF
                        </button>
                        )}

                        {/* New Regime PDF */}
                        <button
                          onClick={() => generatePDF('new')}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {entityType === 'individual' || entityType === 'huf' ? 'New Regime' : 
                           entityType === 'firm' ? 'Partnership Tax' : 'Corporate Tax'} PDF
                        </button>

                        {/* Capital Gains PDF */}
                        <button
                          onClick={() => generatePDF('capital')}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Capital Gains PDF
                        </button>
                      </div>

                      <div className="mt-4 text-xs text-gray-500 text-center">
                        PDFs include: Income breakdown, deduction details, tax slabs, effective rates, and professional tax computation format
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Planning Tips */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Tax Planning </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Tips & Strategies
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  Smart strategies to optimize your tax liability and maximize savings
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => router.push('/tax-planning')}
                    className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    View Complete Tax Planning Guide
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: '',
                    title: 'Section 80C Investments',
                    description: 'Invest up to ₹1.5L in PPF, ELSS, NSC, tax-saving FDs, and life insurance to save up to ₹46,800 in taxes.',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    icon: '',
                    title: 'Health Insurance (80D)',
                    description: 'Self/Family: ₹25K (₹50K if 60+), Parents: ₹50K additional. Total max ₹1L with proper planning.',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    icon: '',
                    title: 'Home Loan Benefits',
                    description: 'Claim up to ₹2L interest deduction under Section 24(b) and ₹1.5L principal repayment under 80C.',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    icon: '',
                    title: 'Education Loan (80E)',
                    description: 'Full interest deduction on education loans with no upper limit for self, spouse, or children.',
                    color: 'from-orange-400 to-orange-600'
                  },
                  {
                    icon: '',
                    title: 'NPS Additional (80CCD1B)',
                    description: 'Extra ₹50K deduction over and above 80C limit by investing in National Pension System.',
                    color: 'from-red-400 to-red-600'
                  },
                  {
                    icon: '',
                    title: 'Donations (80G)',
                    description: '50% deduction: PM Relief Fund, educational institutions. 100% deduction: PM CARES, Swachh Bharat Kosh, Clean Ganga Fund.',
                    color: 'from-teal-400 to-teal-600'
                  },
                  {
                    icon: '',
                    title: 'Section 87A Rebates',
                    description: 'New Regime: Rs.25K rebate for income ≤Rs.7L (effectively no tax up to Rs.12L). Old Regime: Rs.12.5K rebate for income ≤Rs.5L.',
                    color: 'from-pink-400 to-pink-600'
                  }
                ].map((item, index) => {
                  // Map each tip to its corresponding section ID in the tax planning page
                  const sectionMap: {[key: string]: string} = {
                    'Section 80C Investments': 'section-80c',
                    'Health Insurance (80D)': 'health-insurance',
                    'Home Loan Benefits': 'home-loan',
                    'Education Loan (80E)': 'education-loan',
                    'NPS Additional (80CCD1B)': 'nps-additional',
                    'Donations (80G)': 'donations',
                    'Section 87A Rebates': 'rebates'
                  };
                  
                  const sectionId = sectionMap[item.title];
                  
                  return (
                    <div 
                      key={index} 
                      onClick={() => sectionId && router.push(`/tax-planning?section=${sectionId}`)}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{item.icon}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-center text-sm mb-4">
                        {item.description}
                      </p>
                      
                      {sectionId && (
                        <div className="text-center">
                          <span className="inline-flex items-center gap-1 text-[#FF6B2C] text-xs font-medium group-hover:gap-2 transition-all duration-300">
                            Learn More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Optimize Your Tax Planning
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Get personalized tax planning advice and maximize your savings with expert guidance
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Get Tax Planning Advice' : 'Get Started Free'}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  🏙️ Metro vs Non-Metro Cities for HRA Exemption
                </h2>
                <button
                  onClick={() => setShowCityListModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Overview */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">📋 HRA Exemption Rules:</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• <strong>Metro Cities:</strong> 50% of Basic Salary exemption limit</div>
                    <div>• <strong>Non-Metro Cities:</strong> 40% of Basic Salary exemption limit</div>
                    <div>• HRA exemption = Minimum of (HRA received, 50%/40% of Basic, Rent - 10% of Basic)</div>
                  </div>
                </div>

                {/* City Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Metro Cities */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                      🏙️ Metro Cities (50% HRA exemption)
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 mb-2">Tier 1 Metro Cities:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Mumbai</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Delhi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Kolkata</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Chennai</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 mb-2">Other Major Metro Cities:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Bangalore</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Hyderabad</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Ahmedabad</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Pune</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Non-Metro Cities */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      🏘️ Non-Metro Cities (40% HRA exemption)
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="font-semibold text-green-700 mb-2">Definition:</h4>
                        <p className="text-sm text-green-600 mb-3">All cities in India except the 8 metro cities listed on the left</p>
                        
                        <h4 className="font-semibold text-green-700 mb-2">Popular Non-Metro Cities:</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Jaipur, Lucknow, Kanpur, Agra</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Indore, Bhopal, Nagpur, Surat</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Coimbatore, Kochi, Mysore, Trichy</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Chandigarh, Vadodara, Rajkot</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Visakhapatnam, Nashik, Guwahati</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Bhubaneswar, Dehradun, Shimla</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    💡 Important Notes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                    <div>
                      <div className="font-semibold mb-1">📍 How to Choose:</div>
                      <div>If your city is NOT in the metro list (left column), select &quot;Non-Metro City&quot; for accurate HRA calculation.</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🏢 Employer Policy:</div>
                      <div>Some employers may have different classifications. Check your HR policy for company-specific rules.</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">📅 Updates:</div>
                      <div>This list is based on current income tax rules and may be updated by the government periodically.</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🧮 Calculation:</div>
                      <div>The HRA exemption is calculated as the minimum of the three values mentioned above.</div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowCityListModal(false)}
                    className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Got it, Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}