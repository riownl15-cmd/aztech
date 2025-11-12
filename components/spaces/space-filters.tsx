'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export interface SpaceFilters {
  city: string;
  type: string;
  minPrice: number;
  maxPrice: number;
}

interface SpaceFiltersProps {
  filters: SpaceFilters;
  onFiltersChange: (filters: SpaceFilters) => void;
  cities: string[];
}

export default function SpaceFiltersComponent({ filters, onFiltersChange, cities }: SpaceFiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  const handleCityChange = (value: string) => {
    onFiltersChange({ ...filters, city: value });
  };

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceChangeEnd = () => {
    onFiltersChange({ ...filters, minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  const resetFilters = () => {
    onFiltersChange({ city: 'all', type: 'all', minPrice: 0, maxPrice: 200000 });
  };

  const hasActiveFilters = filters.city !== 'all' || filters.type !== 'all' || filters.minPrice > 0 || filters.maxPrice < 200000;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <Select value={filters.city} onValueChange={handleCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Space Type</label>
        <Select value={filters.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="hotdesk">Hot Desk</SelectItem>
            <SelectItem value="meeting_room">Meeting Room</SelectItem>
            <SelectItem value="private_office">Private Office</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">
          Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}/month
        </label>
        <Slider
          min={0}
          max={200000}
          step={5000}
          value={priceRange}
          onValueChange={handlePriceChange}
          onValueCommit={handlePriceChangeEnd}
          className="w-full"
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Filters</h3>
            {hasActiveFilters && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filter Spaces</SheetTitle>
              <SheetDescription>
                Find the perfect space for your needs
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
