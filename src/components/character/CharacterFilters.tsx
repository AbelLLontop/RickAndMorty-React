import { Search, RotateCcw, Filter, X, Zap, User, Microscope } from 'lucide-react';
import { useCharacterStore } from '@/store/useCharacterStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button, Select, ListBox, Input, Label, TextField } from '@heroui/react';
import { useState, ChangeEvent, useEffect, useTransition } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const CharacterFilters = () => {
    const { filters, setFilters, resetFilters, totalCount } = useCharacterStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState(filters.name);
    const [isPending, startTransition] = useTransition();

    // Sync local search text with global filters when filters.name changes (e.g., reset)
    useEffect(() => {
        setSearchText(filters.name || '');
    }, [filters.name]);

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchText !== filters.name) {
                startTransition(() => {
                    setFilters({ name: searchText });
                });
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchText, setFilters, filters.name]);

    const handleInputChange = (name: string, value: string) => {
        if (name === 'name') {
            setSearchText(value);
        } else {
            startTransition(() => {
                setFilters({ [name]: value });
            });
        }
    };

    const activeFilterCount = Object.entries(filters).filter(([key, value]) => key !== 'page' && key !== 'name' && value !== '').length;

    const filterOptions = {
        status: ['Alive', 'Dead', 'Unknown'],
        gender: ['Female', 'Male', 'Genderless', 'Unknown'],
        species: ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'Unknown']
    };

    return (
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 px-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Populations <span className="text-slate-200 font-normal">/</span> <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm align-middle">{totalCount || 0} Entities</span>
                    </h2>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <TextField className="flex-grow">
                        <div className="relative">
                            <Input
                                name="name"
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-4 py-3 shadow-sm text-sm"
                            />
                            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </TextField>
                    <Button
                        onPress={() => setIsMobileMenuOpen(true)}
                        className="aspect-square h-[48px] p-0 rounded-2xl bg-slate-900 text-white shadow-xl active:scale-90 transition-all relative overflow-visible"
                    >
                        <Filter size={18} />
                        {activeFilterCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{activeFilterCount}</span>
                        )}
                    </Button>
                </div>
            </div>

            {/* Desktop Filters */}
            <GlassCard hover={false} className="hidden md:block p-8 border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-4">
                        <TextField className="w-full">
                            <Label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 ml-1 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/10">
                                    <Search size={12} className="text-primary" />
                                </span>
                                Search Entity
                                {isPending && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full ml-auto" />}
                            </Label>
                            <div className="relative group">
                                <Input
                                    name="name"
                                    placeholder="Identify character..."
                                    value={searchText}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                                    className="w-full bg-slate-50/50 border-2 border-slate-100 focus:border-primary/30 rounded-2xl px-5 py-3.5 outline-none transition-all group-hover:bg-white pr-12 text-sm font-medium"
                                />
                                {searchText && (
                                    <button
                                        onClick={() => handleInputChange('name', '')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </TextField>
                    </div>

                    <div className="lg:col-span-2">
                        <Select
                            name="status"
                            placeholder="All Status"
                            selectedKey={filters.status || null}
                            onSelectionChange={(key) => handleInputChange('status', String(key || ''))}
                        >
                            <Label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 ml-1 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-amber-100">
                                    <Zap size={12} className="text-amber-500" />
                                </span>
                                Status
                            </Label>
                            <Select.Trigger className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-white hover:border-slate-200 transition-all text-sm font-bold">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-2 min-w-[180px] z-50">
                                <ListBox selectionMode="single" className="gap-1">
                                    {filterOptions.status.map(s => (
                                        <ListBox.Item key={s.toLowerCase()} id={s.toLowerCase()} textValue={s} className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all font-medium text-sm">
                                            {s}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="lg:col-span-2">
                        <Select
                            name="species"
                            placeholder="All Species"
                            selectedKey={filters.species || null}
                            onSelectionChange={(key) => handleInputChange('species', String(key || ''))}
                        >
                            <Label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 ml-1 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-emerald-100">
                                    <Microscope size={12} className="text-emerald-600" />
                                </span>
                                Species
                            </Label>
                            <Select.Trigger className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-white hover:border-slate-200 transition-all text-sm font-bold">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-2 min-w-[220px] max-h-[300px] overflow-auto z-50">
                                <ListBox selectionMode="single" className="gap-1">
                                    {filterOptions.species.map(s => (
                                        <ListBox.Item key={s.toLowerCase()} id={s.toLowerCase()} textValue={s} className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all font-medium text-sm">
                                            {s}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="lg:col-span-2">
                        <Select
                            name="gender"
                            placeholder="All Genders"
                            selectedKey={filters.gender || null}
                            onSelectionChange={(key) => handleInputChange('gender', String(key || ''))}
                        >
                            <Label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 ml-1 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-indigo-100">
                                    <User size={12} className="text-indigo-500" />
                                </span>
                                Gender
                            </Label>
                            <Select.Trigger className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-white hover:border-slate-200 transition-all text-sm font-bold">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-2 min-w-[180px] z-50">
                                <ListBox selectionMode="single" className="gap-1">
                                    {filterOptions.gender.map(g => (
                                        <ListBox.Item key={g.toLowerCase()} id={g.toLowerCase()} textValue={g} className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all font-medium text-sm">
                                            {g}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="lg:col-span-2">
                        <Button
                            variant="ghost"
                            onPress={resetFilters}
                            isDisabled={!activeFilterCount && !searchText}
                            className="w-full font-black uppercase text-[10px] tracking-widest h-[52px] border-2 border-slate-100 rounded-2xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={14} />
                            Reset
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* Active Filter Chips */}
            <AnimatePresence>
                {(activeFilterCount > 0 || searchText) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex flex-wrap gap-2 mt-4 px-2"
                    >
                        {searchText && (
                            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                <Search size={12} /> {searchText}
                                <button onClick={() => handleInputChange('name', '')} className="hover:text-primary transition-colors"><X size={12} /></button>
                            </div>
                        )}
                        {['status', 'species', 'gender'].map(key => {
                            const value = (filters as any)[key];
                            if (!value) return null;
                            const Icon = key === 'status' ? Zap : key === 'species' ? Microscope : User;
                            return (
                                <div key={key} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm transition-all hover:border-primary/30">
                                    <Icon size={12} className="text-primary" /> {value}
                                    <button onClick={() => handleInputChange(key, '')} className="hover:text-rose-500 transition-colors"><X size={12} /></button>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Filter Drawer (Overlay) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] md:hidden"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-[101] md:hidden bg-white rounded-t-[3rem] shadow-[0_-20px_80px_rgba(0,0,0,0.1)] p-8 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="font-black text-2xl text-slate-900 tracking-tight">Filters</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Refine search criteria</p>
                                </div>
                                <Button className="min-w-0 p-3 rounded-2xl bg-slate-50 text-slate-900 border-none hover:bg-slate-100" onPress={() => setIsMobileMenuOpen(false)}>
                                    <X size={20} />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-8">
                                <TextField className="w-full">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Universal Search</Label>
                                    <Input
                                        name="name"
                                        placeholder="Identify character..."
                                        value={searchText}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary/20 rounded-2xl px-5 py-4 outline-none transition-all text-sm font-medium"
                                    />
                                </TextField>

                                <div className="grid grid-cols-1 gap-6">
                                    <Select
                                        name="status"
                                        placeholder="All Status"
                                        selectedKey={filters.status || null}
                                        onSelectionChange={(key) => handleInputChange('status', String(key || ''))}
                                    >
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Vital Status</Label>
                                        <Select.Trigger className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer text-sm font-bold">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-white border-2 border-slate-50 rounded-2xl shadow-2xl p-2 z-[200]">
                                            <ListBox selectionMode="single">
                                                {filterOptions.status.map(s => (
                                                    <ListBox.Item key={s.toLowerCase()} id={s.toLowerCase()} textValue={s} className="p-4 rounded-xl hover:bg-slate-100 font-medium">{s}</ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>

                                    <Select
                                        name="species"
                                        placeholder="All Species"
                                        selectedKey={filters.species || null}
                                        onSelectionChange={(key) => handleInputChange('species', String(key || ''))}
                                    >
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Species</Label>
                                        <Select.Trigger className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer text-sm font-bold">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-white border-2 border-slate-50 rounded-2xl shadow-2xl p-2 z-[200] max-h-[300px] overflow-auto">
                                            <ListBox selectionMode="single">
                                                {filterOptions.species.map(s => (
                                                    <ListBox.Item key={s.toLowerCase()} id={s.toLowerCase()} textValue={s} className="p-4 rounded-xl hover:bg-slate-100 font-medium">{s}</ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>

                                    <Select
                                        name="gender"
                                        placeholder="All Genders"
                                        selectedKey={filters.gender || null}
                                        onSelectionChange={(key) => handleInputChange('gender', String(key || ''))}
                                    >
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Genetic Profile</Label>
                                        <Select.Trigger className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer text-sm font-bold">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-white border-2 border-slate-50 rounded-2xl shadow-2xl p-2 z-[200]">
                                            <ListBox selectionMode="single">
                                                {filterOptions.gender.map(g => (
                                                    <ListBox.Item key={g.toLowerCase()} id={g.toLowerCase()} textValue={g} className="p-4 rounded-xl hover:bg-slate-100 font-medium">{g}</ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        onPress={resetFilters}
                                        className="flex-1 font-black uppercase text-xs tracking-widest h-14 border-none bg-slate-100 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all"
                                    >
                                        Reset All
                                    </Button>
                                    <Button
                                        onPress={() => setIsMobileMenuOpen(false)}
                                        className="flex-[2] font-black uppercase text-xs tracking-widest h-14 border-none bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200 active:scale-95 transition-all"
                                    >
                                        Apply Filters
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
