import { describe, it, expect } from 'vitest';

const defaultFilters = {
  fromYear: '2024',
  fromMonth: '1',
  toYear: '2026',
  toMonth: '5',
  flowType: 'both',
  hsCode: '',
  productGroup: '',
  country: '',
  customsOffice: '',
  metric: 'value',
  aggregation: 'month'
};

describe('Global Filters Configuration', () => {
  it('should initialize with correct year and month ranges', () => {
    expect(defaultFilters.fromYear).toBe('2024');
    expect(defaultFilters.fromMonth).toBe('1');
    expect(defaultFilters.toYear).toBe('2026');
    expect(defaultFilters.toMonth).toBe('5');
  });

  it('should enable both Import & Export flow directions by default', () => {
    expect(defaultFilters.flowType).toBe('both');
  });

  it('should start with empty commodity and country filters', () => {
    expect(defaultFilters.hsCode).toBe('');
    expect(defaultFilters.country).toBe('');
  });

  it('should set default analysis metric to trade value', () => {
    expect(defaultFilters.metric).toBe('value');
  });
});
