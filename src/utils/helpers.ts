export function generateId(prefix = 'id'): string {
  const uniquePart =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `${prefix}-${uniquePart}`;
}

export function calculatePercentage(
  value: number,
  total: number,
): number {
  if (total === 0) return 0;

  return Number(((value / total) * 100).toFixed(1));
}

export function calculatePercentageChange(
  current: number,
  previous: number,
): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }

  return Number(
    (((current - previous) / Math.abs(previous)) * 100).toFixed(1),
  );
}

export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(Math.max(value, min), max);
}

export function debounce<T extends (...args: never[]) => void>(
  callback: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function sortBy<T>(
  items: T[],
  getValue: (item: T) => string | number,
  direction: 'asc' | 'desc' = 'asc',
): T[] {
  return [...items].sort((a, b) => {
    const valueA = getValue(a);
    const valueB = getValue(b);

    let comparison: number;

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    } else {
      comparison = String(valueA).localeCompare(String(valueB), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}

export function filterBySearch<T>(
  items: T[],
  searchTerm: string,
  getSearchableText: (item: T) => string,
): T[] {
  const query = searchTerm.trim().toLowerCase();

  if (!query) return items;

  return items.filter((item) =>
    getSearchableText(item).toLowerCase().includes(query),
  );
}

export function groupBy<T, K extends string | number>(
  items: T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (groups, item) => {
      const key = getKey(item);
      const existingGroup = groups[key];

      if (existingGroup) {
        existingGroup.push(item);
      } else {
        groups[key] = [item];
      }

      return groups;
    },
    {} as Record<K, T[]>,
  );
}

export function sumBy<T>(
  items: T[],
  getValue: (item: T) => number,
): number {
  return items.reduce((total, item) => total + getValue(item), 0);
}

export function getStockStatus(
  stock: number,
  reorderLevel: number,
): 'In stock' | 'Low stock' | 'Out of stock' {
  if (stock <= 0) return 'Out of stock';
  if (stock <= reorderLevel) return 'Low stock';

  return 'In stock';
}

export function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';

  return 'Good evening';
}

export function getDateRange(
  range: '7d' | '30d' | '90d' | '12m',
  referenceDate = new Date(),
): { startDate: Date; endDate: Date } {
  const endDate = new Date(referenceDate);
  const startDate = new Date(referenceDate);

  switch (range) {
    case '7d':
      startDate.setDate(startDate.getDate() - 6);
      break;

    case '30d':
      startDate.setDate(startDate.getDate() - 29);
      break;

    case '90d':
      startDate.setDate(startDate.getDate() - 89);
      break;

    case '12m':
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setDate(startDate.getDate() + 1);
      break;
  }

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}

export function isDateInRange(
  date: string | Date,
  startDate: Date,
  endDate: Date,
): boolean {
  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) return false;

  return (
    timestamp >= startDate.getTime() &&
    timestamp <= endDate.getTime()
  );
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
} {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / safePageSize);

  const currentPage =
    totalPages === 0 ? 1 : clamp(Math.floor(page), 1, totalPages);

  const startIndex = (currentPage - 1) * safePageSize;

  return {
    items: items.slice(startIndex, startIndex + safePageSize),
    currentPage,
    totalPages,
    totalItems,
  };
}

export function downloadCsv(
  filename: string,
  rows: Record<string, string | number | boolean | null>[],
): void {
  const firstRow = rows[0];

  if (!firstRow) return;

  const headers = Object.keys(firstRow);

  const escapeCsvValue = (
    value: string | number | boolean | null,
  ): string => {
    const text = String(value ?? '');

    if (/[",\n\r]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  const csvContent = [
    headers.map(escapeCsvValue).join(','),
    ...rows.map((row) =>
      headers
        .map((header) => escapeCsvValue(row[header] ?? null))
        .join(','),
    ),
  ].join('\n');

  const blob = new Blob(['\uFEFF', csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename.endsWith('.csv')
    ? filename
    : `${filename}.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}