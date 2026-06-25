import { describe, it, expect } from 'vitest';
import { formatValue, formatWeight, formatPercentage, getMonthName } from '../utils/formatters.js';

describe('Number and Currency Formatters', () => {
  it('should format billions correctly', () => {
    expect(formatValue(3600000000)).toBe('$3.6 B');
    expect(formatValue(-1500000000)).toBe('-$1.5 B');
  });

  it('should format millions correctly', () => {
    expect(formatValue(2500000)).toBe('$2.5 M');
    expect(formatValue(-2500000)).toBe('-$2.5 M');
  });

  it('should format thousands and smaller numbers with local commas', () => {
    expect(formatValue(1250)).toBe('$1,250');
    expect(formatValue(450)).toBe('$450');
    expect(formatValue(0)).toBe('$0');
  });
});

describe('Weight Formatters', () => {
  it('should format weight scales correctly', () => {
    expect(formatWeight(12.5)).toBe('12.5 tons');
    expect(formatWeight(3500)).toBe('3.5 K tons');
    expect(formatWeight(4500000)).toBe('4.5 M tons');
    expect(formatWeight(0)).toBe('0.0 tons');
  });
});

describe('Percentage Growth Formatters', () => {
  it('should append growth indicators', () => {
    expect(formatPercentage(45.72)).toBe('+45.7%');
    expect(formatPercentage(-12.5)).toBe('-12.5%');
    expect(formatPercentage(0)).toBe('0.0%');
  });
});

describe('Month name helper', () => {
  it('should translate numeric month to English name string', () => {
    expect(getMonthName(1)).toBe('January');
    expect(getMonthName('12')).toBe('December');
    expect(getMonthName(6)).toBe('June');
  });
});
